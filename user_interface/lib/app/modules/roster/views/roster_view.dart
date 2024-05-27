import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../controllers/roster_controller.dart';
import 'dart:math';
import 'package:get_storage/get_storage.dart';

class RosterView extends GetView<RosterController> {
  RosterView({Key? key}) : super(key: key);

  final colors = [
    Colors.lightBlue,
    Colors.deepOrangeAccent,
    Colors.amberAccent
  ];
  final random = Random();

  Color getColor(int index) {
    return colors[index % colors.length];
  }

  Widget _buildTab(String day) {
    return Tab(
      child: Stack(
        children: [
          Center(child: Text(day)),
          Positioned(
            bottom: 1,
            left: 0,
            right: 0,
            child:
                Center(child: Icon(Icons.circle, size: 8, color: Colors.blue)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    DateTime now = DateTime.now();
    String formattedTime = DateFormat('kk:mm').format(now);
    String formattedDay = DateFormat('EEEE', 'id_ID').format(now);

    return FutureBuilder<List<dynamic>>(
      future: controller.fetchRostersByKelasId(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return Center(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.3),
                  borderRadius: BorderRadius.circular(10),
                ),
                width: 200, // adjust this value to change the width of the GIF
                height:
                    170, // adjust this value to change the height of the GIF
                child: Image.asset(
                  'assets/images/loading.gif',
                  fit: BoxFit.cover, // make the GIF fill the container
                ),
              ),
            ),
          );
        } else if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        } else {
          List<dynamic> rosters = snapshot.data!;
          return DefaultTabController(
            length: 6,
            child: Scaffold(
              appBar: AppBar(
                elevation: 0,
                backgroundColor: const Color.fromARGB(255, 255, 255, 255),
                title: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      height: 130,
                      width: 150,
                      child:
                          Image(image: AssetImage('assets/images/AppBar.png')),
                    ),
                    Text(
                      'MyRoster',
                      style: TextStyle(
                        fontSize: 19,
                      ),
                    ),
                  ],
                ),
                centerTitle: true,
                bottom: TabBar(
                  tabs: [
                    _buildTab('Sen'),
                    _buildTab('Sel'),
                    _buildTab('Rab'),
                    _buildTab('Kam'),
                    _buildTab('Jum'),
                    _buildTab('Sab'),
                  ],
                ),
              ),
              body: Column(
                children: [
                  SizedBox(height: 10),
                  StreamBuilder(
                    stream: Stream.periodic(
                        Duration(seconds: 1), (i) => DateTime.now()),
                    builder: (context, snapshot) {
                      String formattedTime = DateFormat('kk:mm:ss a')
                          .format(snapshot.data ?? DateTime.now());
                      return Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          SizedBox(height: 1),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Icon(
                                Icons.access_time,
                                color: Color.fromARGB(255, 96, 143, 182),
                              ),
                              Text(
                                " Time Now: $formattedTime",
                                style: TextStyle(
                                  fontSize: 20,
                                  color: Color.fromARGB(255, 96, 143, 182),
                                  fontFamily: 'Incosolata',
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 1),
                          Column(
                            children: <Widget>[
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Icon(
                                    Icons.calendar_today,
                                    color: Color.fromARGB(255, 218, 170, 82),
                                  ),
                                  Text(
                                    " Day Now: $formattedDay",
                                    style: TextStyle(
                                      fontSize: 20,
                                      color: Color.fromARGB(255, 218, 170, 82),
                                    ),
                                  ),
                                ],
                              ),
                              Divider(
                                color: Colors.grey,
                                height: 20,
                                thickness: 1,
                                indent: 20,
                                endIndent: 20,
                              ),
                            ],
                          )
                        ],
                      );
                    },
                  ),
                  Expanded(
                    child: TabBarView(
                      children: [
                        _buildTabContent(rosters, 'Senin'),
                        _buildTabContent(rosters, 'Selasa'),
                        _buildTabContent(rosters, 'Rabu'),
                        _buildTabContent(rosters, 'Kamis'),
                        _buildTabContent(rosters, 'Jumat'),
                        _buildTabContent(rosters, 'Sabtu'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        }
      },
    );
  }

  Widget _buildTabContent(List<dynamic> rosters, String day) {
    List<dynamic> rostersForDay =
        rosters.where((roster) => roster['hari'] == day).toList();

    rostersForDay.sort((a, b) => a['waktu_mulai'].compareTo(b['waktu_mulai']));

    final box = GetStorage();
    final userInfo = box.read('user');
    final namaKelas = userInfo['kelas']['nama_kelas'];

    if (rostersForDay.isEmpty) {
      return Center(child: Text("Roster belum diset"));
    }
    return Padding(
      padding: const EdgeInsets.only(
          top: 25.0, left: 25.0, right: 25.0, bottom: 20.0),
      child: ListView.builder(
        itemCount: rostersForDay.length,
        itemBuilder: (context, index) {
          var roster = rostersForDay[index];
          var waktuMulai = DateFormat.jm().format(DateFormat("HH:mm")
              .parse(roster['waktu_mulai'])); // Parse the time string
          return Row(
            children: [
              Expanded(
                flex: 1,
                child: Container(
                  padding: const EdgeInsets.all(8.0),
                  margin: const EdgeInsets.only(bottom: 8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(waktuMulai,
                          style: TextStyle(
                              fontSize: 18,
                              color: Color.fromARGB(255, 105, 105, 105),
                              fontWeight:
                                  FontWeight.bold)), // Use waktuMulai here
                    ],
                  ),
                ),
              ),
              Expanded(
                flex: 3,
                child: Container(
                  padding: const EdgeInsets.all(10.0),
                  margin: const EdgeInsets.only(bottom: 11.0),
                  decoration: BoxDecoration(
                    color: getColor(index),
                    border: Border.all(color: Colors.blue),
                    borderRadius: BorderRadius.circular(18),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(roster['mata_pelajaran'],
                          style: TextStyle(
                              fontSize: 19,
                              color: Colors.white,
                              fontWeight: FontWeight.bold)),
                      Text(
                          '${roster['Pengajar']['Nama_Depan']} ${roster['Pengajar']['Nama_Belakang']}',
                          style: TextStyle(fontSize: 17, color: Colors.white)),
                      Text(namaKelas,
                          style: TextStyle(
                              fontSize: 17,
                              color: Colors.white)), // Use namaKelas here
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
