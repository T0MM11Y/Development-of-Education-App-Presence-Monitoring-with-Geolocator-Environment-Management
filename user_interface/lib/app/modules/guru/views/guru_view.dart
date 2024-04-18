import 'package:flutter/material.dart';
import 'package:get/get_state_manager/get_state_manager.dart';
import 'package:user_interface/app/modules/guru/controllers/guru_controller.dart';

class GuruView extends GetView<GuruController> {
  GuruView({Key? key}) : super(key: key);
  List<Color> colors = [
    const Color.fromARGB(255, 243, 156, 18), // Sunflower
    const Color.fromARGB(255, 231, 76, 60), // Alizarin
    const Color.fromARGB(255, 46, 204, 113), // Emerald
    const Color.fromARGB(255, 52, 152, 219), // Peter River
  ];
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
              height: 130,
              width: 160,
              child: Image(image: AssetImage('assets/images/AppBar.png')),
            ),
            Text(
              'Guru',
              style: TextStyle(
                fontSize: 18,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.only(left: 28, right: 28, top: 30, bottom: 25),
        child: Column(
          children: <Widget>[
            Row(
              children: [
                Expanded(
                  child: Container(
                    height: 33.0,
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
                      decoration: InputDecoration(
                        labelText: 'Cari Guru Disini',
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
                      onChanged: (value) {
                        controller.searchGuru(value);
                      },
                    ),
                  ),
                ),
                SizedBox(width: 10),
              ],
            ),
            SizedBox(height: 20),

            FutureBuilder(
              future: controller.fetchGuru(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                      child:
                          CircularProgressIndicator()); // Show a loading spinner while waiting for fetchGuru to complete
                } else if (snapshot.hasError) {
                  return Text(
                      'Error: ${snapshot.error}'); // Show an error message if fetchGuru fails
                } else {
                  return Obx(() => GridView.count(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        crossAxisCount: 2,
                        childAspectRatio: 1.0,
                        mainAxisSpacing: 9.00,
                        crossAxisSpacing: 9.5,
                        children: List.generate(
                            controller.filteredGuruList.length, (index) {
                          var guru = controller.filteredGuruList[index];
                          return IntrinsicHeight(
                            child: InkWell(
                              onTap: () {
                                showDialog(
                                  context: context,
                                  builder: (context) {
                                    return AlertDialog(
                                      backgroundColor: Color.fromRGBO(
                                          246,
                                          253,
                                          255,
                                          1), // Menambahkan warna latar belakang

                                      title: Text(
                                        'Detail Guru',
                                        style: TextStyle(
                                          color: Color.fromARGB(
                                              255, 111, 172, 187),
                                          fontSize: 22,
                                        ),
                                      ),
                                      content: SingleChildScrollView(
                                        child: ListBody(
                                          children: <Widget>[
                                            Center(
                                              child: CircleAvatar(
                                                radius: 50,
                                                backgroundImage: NetworkImage(
                                                    guru['Urlphoto']),
                                              ),
                                            ),
                                            SizedBox(height: 20),
                                            Text(
                                              'NIP: ${guru['NIP']}',
                                              style: TextStyle(
                                                  fontSize: 17,
                                                  color: Colors.grey[700]),
                                            ),
                                            Divider(color: Colors.grey),
                                            Text(
                                              'Nama: ${guru['Nama_Depan']} ${guru['Nama_Belakang']}',
                                              style: TextStyle(
                                                  fontSize: 17,
                                                  color: Colors.grey[700]),
                                            ),
                                            Divider(color: Colors.grey),
                                            Text(
                                              'Bidang: ${guru['Bidang']}',
                                              style: TextStyle(
                                                fontSize: 17,
                                                color: colors[index % 4],
                                              ),
                                            ),
                                            Divider(color: Colors.grey),
                                            Text(
                                              'Email: ${guru['Email']}',
                                              style: TextStyle(
                                                  fontSize: 17,
                                                  color: Colors.grey[700]),
                                            ),
                                            Divider(color: Colors.grey),
                                            Text(
                                              'Address: ${guru['Alamat']}',
                                              style: TextStyle(
                                                  fontSize: 17,
                                                  color: Colors.grey[700]),
                                            ),
                                            Divider(color: Colors.grey),
                                            Text(
                                              'Date: ${guru['Tanggal_Lahir']}',
                                              style: TextStyle(
                                                  fontSize: 17,
                                                  color: Colors.grey[700]),
                                            ),
                                            Divider(color: Colors.grey),
                                            Row(
                                              children: <Widget>[
                                                Text(
                                                  'Gender: ${guru['Jenis_Kelamin']}',
                                                  style: TextStyle(
                                                      fontSize: 17,
                                                      color: Colors.grey[700]),
                                                ),
                                                Icon(
                                                  guru['Jenis_Kelamin'] ==
                                                          'Laki-Laki'
                                                      ? Icons.male
                                                      : Icons.female,
                                                  color:
                                                      guru['Jenis_Kelamin'] ==
                                                              'Laki-Laki'
                                                          ? Colors.blue
                                                          : Colors.pink,
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                      actions: <Widget>[
                                        TextButton(
                                          child: Text(
                                            'Close',
                                            style:
                                                TextStyle(color: Colors.blue),
                                          ),
                                          onPressed: () {
                                            Navigator.of(context).pop();
                                          },
                                        ),
                                      ],
                                    );
                                  },
                                );
                              },
                              child: Card(
                                color: Color.fromARGB(255, 250, 254, 255),
                                elevation: 1, // Increase the elevation
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                      15.0), // Increase the border radius
                                ),
                                child: Padding(
                                  // Add padding here
                                  padding: const EdgeInsets.only(
                                      top: 10, left: 20, right: 20, bottom: 10),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: <Widget>[
                                      SizedBox(
                                        height: 60, // Add height for the image
                                        child: Stack(
                                          children: [
                                            Padding(
                                              padding: EdgeInsets.only(
                                                  left: 28,
                                                  top:
                                                      1), // Adjust this value as needed
                                              child: Container(
                                                height: 56,
                                                width: 57,
                                                decoration: BoxDecoration(
                                                  color: colors[index %
                                                      4], // Use the same color array that you used for the field text
                                                  shape: BoxShape.circle,
                                                ),
                                              ),
                                            ),
                                            Center(
                                              child: CircleAvatar(
                                                radius: 31,
                                                backgroundImage: NetworkImage(guru[
                                                    'Urlphoto']), // Use the Urlphoto from the guru data
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      SizedBox(height: 10),
                                      Text(
                                        '${guru['Nama_Depan']} ${guru['Nama_Belakang']}', // Use the Nama_Depan and Nama_Belakang from the guru data
                                        textAlign:
                                            TextAlign.center, // Center the text
                                        style: TextStyle(fontSize: 15),
                                      ),
                                      Text(
                                        guru[
                                            'Bidang'], // Use the Bidang from the guru data
                                        textAlign:
                                            TextAlign.center, // Center the text
                                        style: TextStyle(
                                          fontSize: 15,
                                          color: colors[index % 4],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          );
                        }),
                      ));
                }
              },
            ),
            // Add more widgets here as per your requirement
          ],
        ),
      ),
    );
  }
}
