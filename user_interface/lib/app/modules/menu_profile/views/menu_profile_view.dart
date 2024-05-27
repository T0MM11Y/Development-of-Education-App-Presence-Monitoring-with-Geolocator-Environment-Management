// FILE: MENU_PROFILE_VIEW.DART
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:user_interface/app/material/bottomnav.dart';
import 'package:user_interface/app/modules/dashboard/controllers/dashboard_controller.dart';
import 'package:user_interface/app/routes/app_pages.dart';
import '../controllers/menu_profile_controller.dart';

class MenuProfileView extends GetView<MenuProfileController> {
  final DashboardController dashboardController = Get.find<
      DashboardController>(); // Use Get.find to find the injected DashboardController

  MenuProfileView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        return await Get.dialog<bool>(
              Dialog(
                backgroundColor: Colors.transparent,
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: Offset(0, 3),
                      ),
                    ],
                  ),
                  padding: EdgeInsets.all(20),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        Icons.exit_to_app,
                        size: 50,
                        color: Colors.red,
                      ),
                      Text(
                        'Logout',
                        style: TextStyle(
                            fontSize: 24, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(height: 20),
                      Text(
                        'Apakah Anda yakin ingin logout?',
                        style: TextStyle(fontSize: 18),
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.red,
                            ),
                            child: Text('Ya',
                                style: TextStyle(color: Colors.white)),
                            onPressed: () => Get.back(result: true),
                          ),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.green,
                            ),
                            child: Text('Tidak',
                                style: TextStyle(color: Colors.white)),
                            onPressed: () => Get.back(result: false),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              barrierDismissible: false,
            ) ??
            false; // return false if dialog is dismissed
      },
      child: Scaffold(
        body: SingleChildScrollView(
          // Add SingleChildScrollView here
          child: Align(
            alignment:
                Alignment.topCenter, // Menempatkan konten di paling atas tengah
            child: Column(
              mainAxisSize:
                  MainAxisSize.min, // Membuat Column mengambil ukuran minimal
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(height: 70),
                Obx(() => CircleAvatar(
                      backgroundImage: controller.imageUrl.value.isNotEmpty
                          ? NetworkImage(controller.imageUrl.value)
                          : null,
                      radius: 65,
                      child: controller.imageUrl.value.isEmpty
                          ? Text(
                              '${controller.user['Nama_Depan'][0]}${controller.user['Nama_Belakang'][0]}',
                              style: TextStyle(fontSize: 28),
                            )
                          : null,
                    )),
                const SizedBox(height: 10),
                Text(
                  '${controller.user['Nama_Depan']} ${controller.user['Nama_Belakang']}',
                  style: TextStyle(fontSize: 24),
                ),
                Text(
                  "Student",
                  style: TextStyle(fontSize: 16),
                ),
                const SizedBox(height: 20),
                Container(
                  padding: const EdgeInsets.only(
                      left: 25, right: 25, top: 5, bottom: 10),
                  child: Column(
                    children: [
                      Divider(
                          color: Color.fromARGB(
                              255, 219, 214, 214)), // Add divider here
                      // Add divider here
                      ListTile(
                        leading: CircleAvatar(
                          backgroundColor:
                              Colors.blue, // Change your icon color here
                          child: IconTheme(
                            data: IconThemeData(
                              size: 30, // Change your icon size here
                            ),
                            child: Icon(Icons.person_outlined,
                                color: Colors.white),
                          ),
                        ),
                        title: Padding(
                          padding: const EdgeInsets.only(
                              left: 8.0), // Add padding here
                          child: Text(
                            'Update Profile',
                            style: TextStyle(
                                fontSize: 18), // Change your text size here
                          ),
                        ),
                        trailing: Icon(
                            Icons.arrow_forward_ios), // Add arrow icon here
                        onTap: () {
                          Get.toNamed('/profile');
                        },
                      ),
                      Divider(
                          color: Color.fromARGB(
                              255, 219, 214, 214)), // Add divider here
                      // Add divider here
                      ListTile(
                        leading: CircleAvatar(
                          backgroundColor:
                              Colors.blue, // Change your icon color here
                          child: IconTheme(
                            data: IconThemeData(
                              size: 30, // Change your icon size here
                            ),
                            child: Icon(Icons.lock, color: Colors.white),
                          ),
                        ),
                        title: Padding(
                          padding: const EdgeInsets.only(
                              left: 8.0), // Add padding here
                          child: Text(
                            'Change Password',
                            style: TextStyle(
                                fontSize: 18), // Change your text size here
                          ),
                        ),
                        trailing: Icon(
                            Icons.arrow_forward_ios), // Add arrow icon here
                        onTap: () {
                          Get.toNamed("/ganti-password");
                        },
                      ),
                      Divider(
                          color: Color.fromARGB(
                              255, 219, 214, 214)), // Add divider here
                      ListTile(
                        leading: CircleAvatar(
                          backgroundColor:
                              Colors.red, // Change your icon color here
                          child: IconTheme(
                            data: IconThemeData(
                              size: 30, // Change your icon size here
                            ),
                            child: Icon(Icons.logout, color: Colors.white),
                          ),
                        ),
                        title: Padding(
                          padding: const EdgeInsets.only(
                              left: 8.0), // Add padding here
                          child: Text(
                            'Sign Out',
                            style: TextStyle(
                                fontSize: 18,
                                color:
                                    Colors.red), // Change your text size here
                          ),
                        ),
                        trailing: Icon(
                            Icons.arrow_forward_ios), // Add arrow icon here
                        onTap: () {
                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return Dialog(
                                backgroundColor: Colors.transparent,
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(20),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.grey.withOpacity(0.5),
                                        spreadRadius: 5,
                                        blurRadius: 7,
                                        offset: Offset(0, 3),
                                      ),
                                    ],
                                  ),
                                  padding: EdgeInsets.all(20),
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Icon(
                                        Icons.exit_to_app,
                                        size: 50,
                                        color: Colors.red,
                                      ),
                                      Text(
                                        'Logout',
                                        style: TextStyle(
                                            fontSize: 24,
                                            fontWeight: FontWeight.bold),
                                      ),
                                      SizedBox(height: 20),
                                      Text(
                                        'Are you sure you want to logout?',
                                        style: TextStyle(fontSize: 18),
                                        textAlign: TextAlign.center,
                                      ),
                                      SizedBox(height: 20),
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        children: [
                                          ElevatedButton(
                                            style: ElevatedButton.styleFrom(
                                              backgroundColor: Colors.red,
                                            ),
                                            child: Text('Ya',
                                                style: TextStyle(
                                                    color: Colors.white)),
                                            onPressed: () =>
                                                Get.back(result: true),
                                          ),
                                          ElevatedButton(
                                            style: ElevatedButton.styleFrom(
                                              backgroundColor: Colors.green,
                                            ),
                                            child: Text('Tidak',
                                                style: TextStyle(
                                                    color: Colors.white)),
                                            onPressed: () =>
                                                Get.back(result: false),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          );
                        },
                      ),
                      Divider(
                          color: Color.fromARGB(
                              255, 219, 214, 214)), // Add divider here
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        bottomNavigationBar: CustomBottomNavigationBar(
          // Use CustomBottomNavigationBar
          initialActiveIndex: 2, // Set the initial active index to Profile
          onTap: (int i) async {
            switch (i) {
              case 0: // Home
                Get.offNamed(Routes.DASHBOARD);
                break;
              case 1: // Absensi
                bool? shouldAbsen = await Get.dialog<bool>(
                      Dialog(
                        backgroundColor: Colors.transparent,
                        child: Container(
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.grey.withOpacity(0.5),
                                spreadRadius: 5,
                                blurRadius: 7,
                                offset: Offset(0, 3),
                              ),
                            ],
                          ),
                          padding: EdgeInsets.all(20),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                'Konfirmasi Absensi',
                                style: TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.blueGrey),
                              ),
                              SizedBox(height: 20),
                              Text(
                                'Absensi sekarang?',
                                style:
                                    TextStyle(fontSize: 18, color: Colors.grey),
                              ),
                              SizedBox(height: 20),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      foregroundColor: Colors.white,
                                      backgroundColor: Colors.blue,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                    ),
                                    child: Text('Ya'),
                                    onPressed: () => Get.back(result: true),
                                  ),
                                  OutlinedButton(
                                    style: OutlinedButton.styleFrom(
                                      foregroundColor: Colors.blue,
                                      backgroundColor: Colors.white,
                                      side: BorderSide(color: Colors.blue),
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                    ),
                                    child: Text('Tidak'),
                                    onPressed: () => Get.back(result: false),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                      barrierDismissible: false,
                    ) ??
                    false; // return false if dialog is dismissed
                if (shouldAbsen == true) {
                  dashboardController.createAbsensi();
                }
                break;
              case 2: // Profile
                Get.offNamed(Routes.MENU_PROFILE);
                break;
            }
            print('click index=$i');
          },
        ),
      ),
    );
  }
}
