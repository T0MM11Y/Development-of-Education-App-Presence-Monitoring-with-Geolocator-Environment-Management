import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:intl/intl.dart';
import '../controllers/kelas_controller.dart';

class KelasView extends GetView<KelasController> {
  final GetStorage storage = GetStorage();

  KelasView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    Map<String, dynamic> user = storage.read('user');

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
              'Myclass',
              style: TextStyle(
                fontSize: 19,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20.0),
        child: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Expanded(
                  flex: 3,
                  child: Container(
                    height: 39.0, // Added height
                    padding: EdgeInsets.symmetric(horizontal: 20),
                    decoration: BoxDecoration(
                      color: Colors.white, // Changed color to white
                      boxShadow: [
                        // Added boxShadow for a subtle 3D effect
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.5),
                          spreadRadius: 1,
                          blurRadius: 5,
                          offset: Offset(0, 3),
                        ),
                      ],
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      children: <Widget>[
                        Icon(Icons.search,
                            color: Colors.grey), // Changed icon color to grey
                        SizedBox(width: 25),
                        Expanded(
                          child: TextField(
                            controller: controller.searchController,
                            decoration: InputDecoration(
                              border: InputBorder.none,
                              hintText: 'Find Students Here',
                              hintStyle: TextStyle(
                                  color: Colors
                                      .grey), // Changed hint text color to grey
                            ),
                            onChanged: (value) {
                              controller.searchUser(value);
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(width: 20),
                Expanded(
                  flex: 1,
                  child: Container(
                    height: 39.0, // Added height
                    padding: EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: Color.fromARGB(255, 236, 231, 231),
                      border: Border.all(
                          color: const Color.fromARGB(255, 128, 126, 126)),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: Text(
                        user['kelas']['nama_kelas'],
                        style: TextStyle(fontSize: 15),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Obx(() {
              if (controller.kelasData['users'] == null) {
                // Show a loading indicator while waiting for the data
                return Center();
              } else if (controller.filteredUsers.length == 0) {
                // Show a message if no students match the search query
                return Center(
                  child: Text("Tidak ada siswa yang relevan dengan pencarian"),
                );
              } else {
                // Show the ListView if the data is not null
                return ListView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: controller.filteredUsers.length,
                  itemBuilder: (context, index) {
                    var student = controller.filteredUsers[index];
                    return Card(
                      margin: EdgeInsets.only(bottom: 10),
                      color: Color.fromARGB(255, 255, 255, 255),
                      elevation: 1.0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12.0),
                        side: BorderSide(
                          color: Color.fromARGB(255, 160, 158, 158),
                          width: 1.0,
                        ),
                      ),
                      child: Padding(
                        padding: EdgeInsets.all(10.0), // Add padding
                        child: Row(
                          children: <Widget>[
                            CircleAvatar(
                              backgroundImage: student['Urlphoto'].isNotEmpty
                                  ? NetworkImage(student['Urlphoto'])
                                  : null,
                              radius: 30,
                              child: student['Urlphoto'].isEmpty
                                  ? Text(
                                      '${student['Nama_Depan'][0]}${student['Nama_Belakang'][0]}',
                                      style: TextStyle(fontSize: 20),
                                    )
                                  : null,
                            ),
                            SizedBox(width: 21),
                            Expanded(
                              flex:
                                  3, // Increase flex to make this column wider
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: <Widget>[
                                  Text(
                                    '${student['Nama_Depan']} ${student['Nama_Belakang']}',
                                    style: TextStyle(
                                        fontSize: 18,
                                        fontFamily: 'regular',
                                        color:
                                            Color.fromARGB(255, 77, 70, 136)),
                                  ),
                                  Text(
                                    '${student['NISN']}',
                                    style: TextStyle(
                                        fontSize: 18, fontFamily: 'regular'),
                                  ),
                                  RichText(
                                    text: TextSpan(
                                      text: 'Kelas: ',
                                      style: DefaultTextStyle.of(context).style,
                                      children: <TextSpan>[
                                        TextSpan(
                                            text:
                                                '${controller.kelasData['nama_kelas']}',
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold)),
                                      ],
                                    ),
                                  ),
                                  Text(
                                    '${student['Jenis_Kelamin']}',
                                    style: TextStyle(
                                        fontSize: 18, fontFamily: 'regular'),
                                  ),
                                ],
                              ),
                            ),
                            Expanded(
                              flex:
                                  2, // Decrease flex to make this column narrower
                              child: Column(
                                children: <Widget>[
                                  Row(
                                    children: <Widget>[
                                      if (student['status'] == 'Hadir' ||
                                          student['status'] == 'Terlambat')
                                        Icon(
                                          student['status'] == 'Hadir'
                                              ? Icons.check_circle_outline
                                              : Icons.warning,
                                          color: student['status'] == 'Hadir'
                                              ? Colors.green
                                              : Colors.red,
                                        ),
                                      if (student['status'] == 'Hadir' ||
                                          student['status'] == 'Terlambat')
                                        SizedBox(
                                            width:
                                                5), // Add some spacing between the icon and the text
                                      Flexible(
                                        child: Text(
                                          '${student['status']}',
                                          style: TextStyle(
                                            fontSize: 20,
                                            fontFamily: 'regular',
                                            color: student['status'] == 'Hadir'
                                                ? Colors.green
                                                : student['status'] ==
                                                        'Terlambat'
                                                    ? Colors.red
                                                    : Colors.black,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                  Align(
                                    alignment: Alignment.centerLeft,
                                    child: Text(
                                      student['absensiTime'] != null &&
                                              student['absensiTime']
                                                      .toString()
                                                      .length >=
                                                  16
                                          ? '${DateFormat.jm().format(DateTime.parse("1970-01-01 ${student['absensiTime'].toString().substring(11, 16)}:00"))}'
                                          : '',
                                      style: TextStyle(
                                          fontSize: 20, fontFamily: 'regular'),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
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
