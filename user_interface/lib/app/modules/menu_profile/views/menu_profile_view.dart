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
        return await Get.defaultDialog<bool>(
              title: 'Konfirmasi',
              middleText: 'Apakah Anda ingin keluar?',
              textConfirm: 'Ya',
              textCancel: 'Tidak',
              confirmTextColor: Colors.white,
              onConfirm: () => Get.back(result: true),
              onCancel: () => Get.back(result: false),
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
                              return AlertDialog(
                                title: Text('Logout'),
                                content:
                                    Text('Are you sure you want to logout?'),
                                actions: <Widget>[
                                  TextButton(
                                    child: Text('Cancel'),
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                  ),
                                  TextButton(
                                    child: Text('Yes'),
                                    onPressed: () {
                                      controller.logout();
                                      Navigator.of(context).pop();
                                    },
                                  ),
                                ],
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
                bool? shouldAbsen = await Get.defaultDialog<bool>(
                  title: 'Konfirmasi Absensi',
                  middleText: 'Absensi sekarang?',
                  textConfirm: 'Ya',
                  textCancel: 'Tidak',
                  confirmTextColor: Colors.white,
                  onConfirm: () => Get.back(result: true),
                  onCancel: () => Get.back(result: false),
                );
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
