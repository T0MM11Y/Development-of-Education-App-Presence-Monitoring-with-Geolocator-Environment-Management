import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/history_absensi_controller.dart';
import 'package:intl/intl.dart';

class HistoryAbsensiView extends GetView<HistoryAbsensiController> {
  const HistoryAbsensiView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            CircleAvatar(
              backgroundColor: Colors.white,
              backgroundImage: controller.userImage.value.isNotEmpty
                  ? NetworkImage(controller.userImage.value)
                  : null,
              child: controller.userImage.value.isEmpty
                  ? Text('${controller.userName.value[0]}',
                      style: TextStyle(fontSize: 42.0))
                  : null,
            ),
            SizedBox(width: 18.0),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Welcome back to School',
                    style: TextStyle(
                        color: const Color.fromARGB(255, 58, 57, 57),
                        fontSize: 15.0)),
                Text('Student',
                    style: TextStyle(
                        color: const Color.fromARGB(255, 59, 58, 58),
                        fontSize: 20.0)),
              ],
            ),
          ],
        ),
        centerTitle: false,
      ),
      body: Stack(
        children: [
          Column(
            children: [
              Container(
                margin: const EdgeInsets.only(
                    left: 20.0, right: 20.0, top: 20.0, bottom: 5.0),
                padding: const EdgeInsets.all(20.0),
                decoration: BoxDecoration(
                  color: Colors.blueAccent,
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(controller.userName.value,
                        style: TextStyle(color: Colors.white, fontSize: 24.0)),
                    Row(
                      children: [
                        Text(
                            '${controller.userNim.value} (${controller.userKelas.value})',
                            style:
                                TextStyle(color: Colors.white, fontSize: 21.0)),
                        Spacer(),
                        Tooltip(
                          message: 'Filter Status',
                          child: IconButton(
                            icon: Icon(Icons.filter_list, color: Colors.white),
                            onPressed: () {
                              showModalBottomSheet(
                                  context: context,
                                  builder: (BuildContext context) {
                                    return Container(
                                      child: Wrap(
                                        children: <Widget>[
                                          ListTile(
                                            leading: Icon(Icons.access_time),
                                            title: Text('Terlambat'),
                                            onTap: () {
                                              // Handle your filter logic here
                                              controller
                                                  .filterStatus('Terlambat');
                                              Navigator.of(context).pop();
                                            },
                                          ),
                                          ListTile(
                                            leading: Icon(Icons.check_circle),
                                            title: Text('Hadir'),
                                            onTap: () {
                                              // Handle your filter logic here
                                              controller.filterStatus('Hadir');
                                              Navigator.of(context).pop();
                                            },
                                          ),
                                          ListTile(
                                            leading: Icon(Icons.close),
                                            title: Text('Absen'),
                                            onTap: () {
                                              // Handle your filter logic here
                                              controller.filterStatus('Absen');
                                              Navigator.of(context).pop();
                                            },
                                          ),
                                          ListTile(
                                            leading: Icon(Icons.all_inclusive),
                                            title: Text('All'),
                                            onTap: () {
                                              // Handle your filter logic here
                                              controller.filterStatus('All');
                                              Navigator.of(context).pop();
                                            },
                                          )
                                        ],
                                      ),
                                    );
                                  });
                            },
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 20.0),
                    Container(
                      padding: const EdgeInsets.only(
                          left: 40.0, right: 40.0, top: 15.0, bottom: 15.0),
                      decoration: BoxDecoration(
                        color: Color.fromARGB(255, 240, 240, 240),
                        borderRadius: BorderRadius.circular(7.0),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Waktu Absen',
                                  style: TextStyle(fontSize: 16.0)),
                              Obx(() => Text(controller.waktu.value,
                                  style: TextStyle(fontSize: 19.0))),
                            ],
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Status', style: TextStyle(fontSize: 16.0)),
                              Obx(() => Row(
                                children: [
                                  Text(
                                    controller.status.value,
                                    style: TextStyle(
                                      fontSize: 19.0,
                                      color: controller.status.value == 'Terlambat'
                                          ? Colors.red
                                          : controller.status.value == 'Hadir'
                                              ? Colors.green
                                              : null,
                                    ),
                                  ),
                                  SizedBox(width: 8.0), // Add some spacing between the text and the icon
                                  Icon(
                                    controller.status.value == 'Terlambat'
                                        ? Icons.access_time
                                        : controller.status.value == 'Hadir'
                                            ? Icons.check_circle
                                            : Icons.close,
                                    color: controller.status.value == 'Terlambat'
                                        ? Colors.red
                                        : controller.status.value == 'Hadir'
                                            ? Colors.green
                                            : null,
                                  ),
                                ],
                              )),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              // Add this inside your Stack widget
              Obx(() => Expanded(
                      child: ListView.builder(
                    itemCount: controller.filteredAbsensiHistory.length,
                    itemBuilder: (context, index) {
                      final absensi = controller.filteredAbsensiHistory[index];

                      // Parse the date string
                      DateTime dateTime = DateTime.parse(absensi['tanggal']);

                      // Format the date and time
                      String formattedDate =
                          DateFormat('yyyy-MM-dd').format(dateTime);
                      String formattedTime =
                          DateFormat('hh:mm a').format(dateTime);

                      return Container(
                        margin:
                            EdgeInsets.only(left: 25.0, right: 25.0, top: 10.0),
                        padding: EdgeInsets.only(
                            left: 5.0, right: 5.0, top: 10.0, bottom: 10.0),
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: Color.fromARGB(
                                255, 189, 186, 186), // Set border color
                            width: 1.0, // Set border width
                          ),
                        ),
                        child: Row(
                          children: [
                            Expanded(
                              child: Column(
                                children: [
                                  Text("Waktu ",
                                      style: TextStyle(
                                          fontSize: 20,
                                          )),
                                  SizedBox(
                                      height:
                                          5.0), // Add space between the texts
                                  Text(formattedTime,
                                      style: TextStyle(fontSize: 20)),
                                ],
                              ),
                            ),
                            Expanded(
                              child: Column(
                                children: [
                                  Text("Status",
                                      style: TextStyle(
                                          fontSize: 20,
                                          )),
                                  SizedBox(
                                      height:
                                          5.0), // Add space between the texts
                                  Text(absensi['status'],
                                      style: TextStyle(
                                        fontSize: 20,
                                        color: absensi['status'] == 'Terlambat'
                                            ? Colors.red
                                            : absensi['status'] == 'Hadir'
                                                ? Colors.green
                                                : Colors.black,
                                      )),
                                ],
                              ),
                            ),
                            Expanded(
                              child: Column(
                                children: [
                                  Text("Tanggal",
                                      style: TextStyle(
                                          fontSize: 20,
                                      )),
                                  SizedBox(
                                      height:
                                          5.0), // Add space between the texts
                                  Text(formattedDate,
                                      style: TextStyle(fontSize: 20)),
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ))),
            ],
          ),
        ],
      ),
    );
  }
}
