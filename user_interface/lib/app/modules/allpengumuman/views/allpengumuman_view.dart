import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:html/parser.dart' as htmlParser;
import 'package:html/dom.dart' as dom;
import '../controllers/allpengumuman_controller.dart';
import 'package:timeago/timeago.dart' as timeago;

class AllpengumumanView extends GetView<AllpengumumanController> {
  const AllpengumumanView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    timeago.setLocaleMessages('id', timeago.IdMessages());
    final TextEditingController searchController = TextEditingController();

    String parseHtmlString(String htmlString) {
      dom.Document document = htmlParser.parse(htmlString);
      String parsedString = document.body!.text;
      return parsedString;
    }

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
              'Pengumuman',
              style: TextStyle(
                fontSize: 19,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: Container(
                    height: 35.0,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(25.0),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.3),
                          spreadRadius: 2,
                          blurRadius: 5,
                          offset: Offset(0, 3),
                        ),
                      ],
                    ),
                    child: TextField(
                      controller: searchController,
                      onChanged: (value) {
                        controller.searchTerm.value = value;
                        controller.fetchPengumuman();
                      },
                      decoration: InputDecoration(
                        labelText: 'Masukkan kata kunci',
                        labelStyle: TextStyle(
                          color: Colors.grey,
                        ),
                        filled: true,
                        fillColor: Colors.white,
                        suffixIcon: Icon(
                          Icons.search,
                          color: Colors.grey,
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10.0),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 10),
                Container(
                  height: 50.0,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(25.0),
                  ),
                  child: Obx(() => DropdownButton<String>(
                        value: controller.selectedFilter.value, // Add this line
                        hint: Text(
                          'Filter',
                          style: TextStyle(
                            color: Colors.grey,
                          ),
                        ),
                        items: <String>[
                          'Hari ini',
                          'Minggu ini',
                          'Bulan ini',
                          'Tahun ini',
                          'Semua Waktu'
                        ].map((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(
                              value,
                              style: TextStyle(
                                color: Colors.black,
                              ),
                            ),
                          );
                        }).toList(),
                        onChanged: (value) {
                          if (value != null) {
                            controller.selectedFilter.value = value;
                            controller.fetchPengumuman();
                          }
                        },
                        dropdownColor: Colors.white,
                        icon: Icon(
                          Icons.date_range,
                          color: Colors.grey,
                        ),
                      )),
                ),
              ],
            ),
            SizedBox(height: 10),
            Obx(() {
              if (controller.pengumumanList.isEmpty) {
                return Center(
                    child: Text('Tidak ada pengumuman yang ditemukan'));
              } else {
                return ListView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: controller.pengumumanList.length,
                  itemBuilder: (context, index) {
                    // Parse the date string into a DateTime object
                    DateTime createdAt = DateTime.parse(
                        controller.pengumumanList[index]['Created_At']);
                    // Format the DateTime object into a more readable format
                    String formattedDate =
                        DateFormat('EEEE, dd MMM yyyy', 'id').format(createdAt);
                    // Calculate the time difference
                    String timeAgo = timeago.format(createdAt, locale: 'id');

                    String parsedIsi = parseHtmlString(
                        controller.pengumumanList[index]['isi']);
                    String truncatedIsi = parsedIsi.length > 130
                        ? parsedIsi.substring(0, 130) + '...'
                        : parsedIsi;
                    return Card(
                      color: Colors.white,
                      elevation: 2,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        children: <Widget>[
                          Stack(
                            children: <Widget>[
                              ClipRRect(
                                borderRadius: BorderRadius.vertical(
                                    top: Radius.circular(10)),
                                child: Image.network(
                                  controller.pengumumanList[index]['urlphoto'],
                                  width: double.infinity,
                                  height: 155.0,
                                  fit: BoxFit.cover,
                                ),
                              ),
                              Positioned(
                                bottom: 10,
                                right: 10,
                                child: Container(
                                  padding: EdgeInsets.symmetric(
                                      horizontal: 10, vertical: 5),
                                  color: Colors.black54,
                                  child: Row(
                                    children: <Widget>[
                                      Icon(Icons.calendar_today,
                                          color: Colors.white),
                                      SizedBox(width: 5),
                                      Text(
                                        formattedDate,
                                        style: TextStyle(
                                          fontSize: 17,
                                          color: Colors.white,
                                          shadows: <Shadow>[
                                            Shadow(
                                              offset: Offset(1.0, 1.0),
                                              blurRadius: 3.0,
                                              color: Color.fromRGBO(0, 0, 0, 1),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Text(
                                  controller.pengumumanList[index]['judul'],
                                  style: TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    fontFamily: 'Roboto',
                                  ),
                                ),
                                SizedBox(height: 10),
                                Text(
                                  truncatedIsi,
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontFamily: 'Roboto',
                                  ),
                                ),
                                SizedBox(height: 10),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: <Widget>[
                                    Row(
                                      children: <Widget>[
                                        Icon(Icons.access_time,
                                            color: Colors.grey),
                                        SizedBox(width: 5),
                                        Text(
                                          timeAgo,
                                          style: TextStyle(
                                            fontSize: 14,
                                            color: Colors.grey,
                                            fontFamily: 'Roboto',
                                          ),
                                        ),
                                      ],
                                    ),
                                    ElevatedButton.icon(
                                      icon: Icon(Icons.swipe_right,
                                          color: Colors.white),
                                      onPressed: () {
                                        var id = controller
                                            .pengumumanList[index]['id'];
                                        if (id != null) {
                                          controller
                                              .getPengumumanById(id.toString());
                                        } else {
                                          print('Invalid id: $id');
                                        }
                                      },
                                      label: Text(
                                        'Lanjutkan',
                                        style: TextStyle(
                                          fontSize: 15,
                                          color: Colors.white,
                                          fontFamily: 'Roboto',
                                        ),
                                      ),
                                      style: ButtonStyle(
                                        backgroundColor:
                                            MaterialStateProperty.all<Color>(
                                                Color.fromARGB(
                                                    255, 81, 138, 224)),
                                        padding: MaterialStateProperty.all<
                                                EdgeInsets>(
                                            EdgeInsets.symmetric(
                                                horizontal: 20, vertical: 10)),
                                        shape: MaterialStateProperty.all<
                                            RoundedRectangleBorder>(
                                          RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(12.0),
                                              side: BorderSide(
                                                  color: Color.fromARGB(
                                                      255, 251, 254, 255))),
                                        ),
                                        elevation:
                                            MaterialStateProperty.all<double>(
                                                2), // Add shadow
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                );
              }
            }),
          ],
        ),
      ),
    );
  }
}
