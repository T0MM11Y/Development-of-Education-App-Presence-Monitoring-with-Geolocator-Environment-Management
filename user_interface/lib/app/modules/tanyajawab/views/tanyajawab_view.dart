import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import '../controllers/tanyajawab_controller.dart';
import 'package:timeago/timeago.dart' as timeago;

class TanyajawabView extends GetView<TanyajawabController> {
  const TanyajawabView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: const Color.fromARGB(255, 255, 255, 255),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              height: 120,
              width: 150,
              child: Image(image: AssetImage('assets/images/AppBar.png')),
            ),
            Text(
              'Q n A',
              style: TextStyle(
                fontSize: 19,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: Column(
        // Wrap the entire body content in a Column
        children: [
          Padding(
              padding: EdgeInsets.only(
                top: 20.0,
                left: 20.0,
                right: 20.0,
                bottom: 2.0,
              ),
              child: StreamBuilder(
                stream: Stream.periodic(Duration(seconds: 1), (i) => i),
                builder: (context, snapshot) {
                  final box = GetStorage();
                  final lastQuestionTime = box.read('lastQuestionTime');
                  String buttonText = 'Buat Pertanyaan';
                  bool buttonEnabled = true;
                  if (lastQuestionTime != null) {
                    final timePassed = DateTime.now()
                        .difference(DateTime.parse(lastQuestionTime));
                    if (timePassed.inHours < 2) {
                      final timeLeft = Duration(hours: 2) - timePassed;
                      buttonText =
                          'Buat Pertanyaan (dalam ${timeLeft.inMinutes} menit)';
                      buttonEnabled = false;
                    }
                  }
                  return ElevatedButton(
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(
                          Color.fromARGB(255, 164, 223, 238)),
                      foregroundColor:
                          MaterialStateProperty.all<Color>(Colors.white),
                      minimumSize: MaterialStateProperty.all<Size>(
                          Size(double.infinity, 40)),
                      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(7.0),
                        ),
                      ),
                    ),
                    onPressed: buttonEnabled
                        ? () {
                            showDialog(
                              context: context,
                              builder: (context) {
                                String question = '';
                                return Theme(
                                  data: Theme.of(context).copyWith(
                                      dialogBackgroundColor:
                                          Color.fromARGB(255, 255, 255, 255)),
                                  child: AlertDialog(
                                    title: Text(
                                      'Buat Pertanyaan',
                                      style: TextStyle(
                                        color: const Color.fromARGB(
                                            255, 75, 76, 77),
                                        fontSize: 24.0,
                                        fontFamily: 'Arial',
                                      ),
                                    ),
                                    content: TextField(
                                      onChanged: (value) {
                                        question = value;
                                      },
                                      decoration: InputDecoration(
                                        hintText:
                                            "Masukkan pertanyaan Anda di sini",
                                        hintStyle: TextStyle(
                                          color: Colors.grey,
                                          fontSize: 18.0,
                                          fontFamily: 'Arial',
                                        ),
                                        filled: true,
                                        fillColor: Colors.white,
                                        border: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(15.0),
                                          borderSide: BorderSide.none,
                                        ),
                                        contentPadding: EdgeInsets.symmetric(
                                            horizontal: 16.0, vertical: 12.0),
                                      ),
                                    ),
                                    actions: <Widget>[
                                      TextButton(
                                        child: Container(
                                          decoration: BoxDecoration(
                                            color: Colors.red,
                                            borderRadius:
                                                BorderRadius.circular(5.0),
                                          ),
                                          padding: EdgeInsets.symmetric(
                                              horizontal: 16.0, vertical: 5.0),
                                          child: Text(
                                            'Batal',
                                            style: TextStyle(
                                              color: Color.fromARGB(
                                                  255, 255, 255, 255),
                                              fontSize: 19.0,
                                              fontFamily: 'Arial',
                                            ),
                                          ),
                                        ),
                                        onPressed: () {
                                          Navigator.of(context).pop();
                                        },
                                      ),
                                      TextButton(
                                        child: Container(
                                          decoration: BoxDecoration(
                                            color: Colors.blue,
                                            borderRadius:
                                                BorderRadius.circular(5.0),
                                          ),
                                          padding: EdgeInsets.symmetric(
                                              horizontal: 16.0, vertical: 5.0),
                                          child: Text(
                                            'Kirim',
                                            style: TextStyle(
                                              color: Color.fromARGB(
                                                  255, 255, 255, 255),
                                              fontSize: 19.0,
                                              fontFamily: 'Arial',
                                            ),
                                          ),
                                        ),
                                        onPressed: () async {
                                          if (question.trim().isEmpty) {
                                            showDialog(
                                              context: context,
                                              builder: (context) {
                                                return AlertDialog(
                                                  title: Text('Error'),
                                                  content: Text(
                                                      'Isi dulu pertanyaannya'),
                                                  actions: <Widget>[
                                                    TextButton(
                                                      child: Text('OK'),
                                                      onPressed: () {
                                                        Navigator.of(context)
                                                            .pop();
                                                      },
                                                    ),
                                                  ],
                                                );
                                              },
                                            );
                                          } else {
                                            try {
                                              await controller
                                                  .askQuestion(question);
                                              Navigator.of(context).pop();
                                            } catch (e) {
                                              showDialog(
                                                context: context,
                                                builder: (context) {
                                                  return AlertDialog(
                                                    title: Text('Error'),
                                                    content: Text(e.toString()),
                                                    actions: <Widget>[
                                                      TextButton(
                                                        child: Text('OK'),
                                                        onPressed: () {
                                                          Navigator.of(context)
                                                              .pop();
                                                        },
                                                      ),
                                                    ],
                                                  );
                                                },
                                              );
                                            }
                                          }
                                        },
                                      ),
                                    ],
                                  ),
                                );
                              },
                            );
                          }
                        : null,
                    child: Text(buttonText),
                  );
                },
              )),
          Padding(
            padding: EdgeInsets.only(
              top: 1.0,
              left: 20.0,
              right: 20.0,
              bottom: 5.0,
            ),
            child: Row(
              children: <Widget>[
                Expanded(
                  flex: 2,
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      border: Border.all(
                        color: Colors.grey,
                        width: 1.0,
                      ),
                    ),
                    child: Container(
                      height: 30.0,
                      child: Row(
                        children: [
                          SizedBox(
                            width: 5.0,
                          ),
                          Icon(
                            Icons.calendar_month_rounded,
                            color: Color.fromARGB(255, 231, 141, 111),
                            size: 20.0,
                          ),
                          SizedBox(
                            width: 4.0,
                          ),
                          Obx(
                            () => PopupMenuButton<String>(
                              child: Text(
                                controller.filterValue.value.isEmpty
                                    ? 'Filter'
                                    : controller.filterValue.value,
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16.0,
                                ),
                              ),
                              itemBuilder: (BuildContext context) =>
                                  <PopupMenuEntry<String>>[
                                const PopupMenuItem<String>(
                                  value: 'Hari ini',
                                  child: Text('Hari ini'),
                                ),
                                const PopupMenuItem<String>(
                                  value: 'Minggu ini',
                                  child: Text('Minggu ini'),
                                ),
                                const PopupMenuItem<String>(
                                  value: 'Bulan ini',
                                  child: Text('Bulan ini'),
                                ),
                                const PopupMenuItem<String>(
                                  value: 'Tahun ini',
                                  child: Text('Tahun ini'),
                                ),
                                const PopupMenuItem<String>(
                                  value: 'Semua',
                                  child: Text('Semua'),
                                ),
                              ],
                              onSelected: (String value) {
                                controller.filterValue.value = value;
                                controller.fetchTanyaJawab();
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  width: 10.0,
                ),
                Expanded(
                  flex: 4,
                  child: Container(
                    height: 30.0,
                    decoration: BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                          color: const Color.fromARGB(255, 223, 219, 219)
                              .withOpacity(0.5),
                          spreadRadius: 5,
                          blurRadius: 7,
                          offset: Offset(0, 3),
                        ),
                      ],
                    ),
                    child: TextField(
                      onChanged: (value) {
                        controller.searchValue.value = value;
                        controller.searchTanyaJawab();
                      },
                      decoration: InputDecoration(
                        labelText: 'Search',
                        labelStyle: TextStyle(
                          color: const Color.fromARGB(255, 105, 155, 196),
                        ),
                        prefixIcon: Icon(
                          Icons.search,
                          color: const Color.fromARGB(255, 105, 155, 196),
                        ),
                        border: OutlineInputBorder(),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(
                            color: const Color.fromARGB(255, 105, 155, 196),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 5.0),
          Expanded(
            // Use Expanded for the ListView to take remaining space
            child: Obx(
              () {
                if (controller.tanyajawabList.value.isEmpty) {
                  if (controller.searchValue.value.isNotEmpty) {
                    return Center(
                        child: Text('Tidak ada hasil yang ditemukan'));
                  } else if (controller.filterValue.value.isNotEmpty) {
                    return Center(
                        child: Text(
                            'Tidak ada pertanyaan dalam jangka waktu ini'));
                  } else {
                    return Center(child: CircularProgressIndicator());
                  }
                }
                return ListView.builder(
                  itemCount: controller.tanyajawabList.value.length,
                  itemBuilder: (context, index) {
                    final data = controller.tanyajawabList.value[index];
                    final String namaDepan = data['user']['Nama_Depan'];
                    final String namaBelakang = data['user']['Nama_Belakang'];
                    final String urlPhoto = data['user']['Urlphoto'];
                    final String pertanyaan = data['pertanyaan'];
                    final String tanggalTanya = data['tanggal_tanya'];
                    final String jawaban = data['jawaban'];
                    final DateTime tanggalTanyaDateTime =
                        DateTime.parse(tanggalTanya);
                    final String tanggalTanyaReadable =
                        timeago.format(tanggalTanyaDateTime);
                    return Column(
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 10.0),
                          child: Container(
                            margin: EdgeInsets.only(
                                top: 2.0, left: 9.0, right: 9.0),
                            child: Card(
                              child: Column(
                                children: <Widget>[
                                  Padding(
                                    padding: EdgeInsets.all(19.0),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: <Widget>[
                                        Row(
                                          children: <Widget>[
                                            CircleAvatar(
                                              backgroundImage:
                                                  NetworkImage(urlPhoto),
                                              backgroundColor: Colors.blue,
                                              radius: 21.0,
                                            ),
                                            SizedBox(width: 10.0),
                                            Text(
                                              '$namaDepan $namaBelakang',
                                              style: TextStyle(
                                                fontSize: 16.0,
                                                color: const Color.fromARGB(
                                                    255, 68, 66, 66),
                                              ),
                                            ),
                                          ],
                                        ),
                                        SizedBox(height: 8.0),
                                        Text(
                                          pertanyaan,
                                          style: TextStyle(
                                            fontSize: 17.0,
                                          ),
                                        ),
                                        SizedBox(height: 10.0),
                                        Row(
                                          children: <Widget>[
                                            Icon(
                                              Icons.access_time,
                                              color: Color.fromARGB(
                                                  255, 55, 134, 224),
                                              size: 14.0,
                                            ),
                                            SizedBox(width: 5.0),
                                            Text(
                                              tanggalTanyaReadable,
                                              style: TextStyle(
                                                fontSize: 14.0,
                                                color: Color.fromARGB(
                                                    255, 224, 146, 55),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                  if (jawaban != null &&
                                      jawaban.trim().isNotEmpty)
                                    ExpansionTile(
                                      backgroundColor: Colors.grey[200], // Background color of the ExpansionTile
                                      iconColor: Colors.blue, // Color of the expand/collapse icon
                                      collapsedIconColor: Colors.red, // Color of the icon when the tile is collapsed
                                      title: Text(
                                        'Lihat Balasan',
                                        style: TextStyle(
                                          color: Color.fromARGB(255, 55, 134, 224),
                                          fontSize: 17.0,
                                          fontWeight: FontWeight.bold, // Make the title bold
                                        ),
                                      ),
                                      children: <Widget>[
                                        Container(
                                          color: Colors.white, // Background color of the expanded area
                                          padding: EdgeInsets.all(16.0),
                                          child: Html(
                                            data: jawaban,
                                            style: {
                                              "body": Style(
                                                fontSize: FontSize(16.0),
                                              ),
                                            },
                                          ),
                                        ),
                                      ],
                                    ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
