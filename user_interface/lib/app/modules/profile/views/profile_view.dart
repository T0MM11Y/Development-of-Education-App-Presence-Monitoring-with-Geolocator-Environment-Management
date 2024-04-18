import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../controllers/profile_controller.dart';
import 'package:user_interface/app/modules/dashboard/controllers/dashboard_controller.dart';
import 'package:user_interface/app/material/bottomnav.dart';
import 'package:user_interface/app/routes/app_pages.dart';

class ProfileView extends GetView<ProfileController> {
  const ProfileView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final GetStorage storage = GetStorage();

    Map<String, dynamic> user = storage.read('user');

    DashboardController dashboardController =
        Get.find<DashboardController>(); // Get instance of DashboardController
    return Scaffold(
      appBar: 
      AppBar(
        centerTitle: true,
       
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.only(top: 1),
          child: Column(
            children: [
              Text(
                '${user['Nama_Depan']} ${user['Nama_Belakang']}', // Display NISN and Name
                style: TextStyle(
                  fontSize: 24,
                  fontFamily: 'Incosolata',
                  fontWeight: FontWeight.w400,
                ),
              ),
              SizedBox(height: 12),
              Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: const Color.fromARGB(255, 103, 181, 245),
                    width: 1.5,
                  ),
                  shape: BoxShape.circle,
                ),
                child: Stack(
                  children: <Widget>[
                    Obx(() => CircleAvatar(
                          backgroundImage: controller.imageUrl.value.isNotEmpty
                              ? (controller.imageUrl.value.startsWith('http')
                                  ? NetworkImage(controller.imageUrl.value)
                                  : FileImage(File(controller.imageUrl.value))
                                      as ImageProvider<Object>)
                              : null,
                          radius: 55,
                          child: controller.imageUrl.value.isEmpty
                              ? Text(
                                  '${user['Nama_Depan'][0]}${user['Nama_Belakang'][0]}',
                                  style: TextStyle(fontSize: 29),
                                )
                              : null,
                        )),
                    Positioned(
                      right: 0,
                      bottom: 0,
                      child: IconButton(
                        icon: Icon(
                          Icons.camera_alt,
                          color:
                              Colors.blue, // Change the color of the icon here
                        ),
                        onPressed: () async {
                          final ImagePicker _picker = ImagePicker();
                          final XFile? image = await _picker.pickImage(
                              source: ImageSource.gallery);

                          if (image != null) {
                            controller.updateProfilePicture(image.path);
                            user['Urlphoto'] = image.path;
                            storage.write('user', user);
                          }
                        },
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 15),
              Container(
                margin: EdgeInsets.symmetric(
                    horizontal: 40.0), // Add horizontal margins
                child: Row(
                  children: [
                    Icon(
                      Icons
                          .confirmation_number, // Place the icon outside the TextFormField
                      color: Color.fromARGB(255, 102, 181, 241),
                      size: 30.0, // Increase the size
                    ),
                    SizedBox(
                        width:
                            10.0), // Add some space between the icon and the TextFormField
                    Expanded(
                      child: TextFormField(
                        readOnly: true,
                        initialValue: user['NISN'].toString(),
                        style:
                            TextStyle(fontSize: 21, fontFamily: 'incosolata '),
                        decoration: InputDecoration(
                          labelText: 'NISN',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(
                                0.0), // Make the field rectangular
                          ),
                          fillColor: Color.fromARGB(255, 219, 220, 221),
                          filled: true,
                          contentPadding: EdgeInsets.only(
                              left: 10.0, right: 10.0), // Add padding
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 15),
              Row(
                children: [
                  Expanded(
                    flex: 2, // Make this field take twice as much space
                    child: Container(
                      margin: EdgeInsets.only(left: 39.0, right: 10.0),
                      child: Row(
                        children: [
                          Icon(
                            Icons.person_outline, // Change the icon
                            color: Color.fromARGB(255, 102, 181, 241),
                            size: 30.0, // Apply color to the icon
                          ),
                          SizedBox(
                            width:
                                10.0, // Add some space between the icon and the TextFormField
                          ),
                          Expanded(
                            child: TextFormField(
                              controller: controller.namaDepanController,
                              style: TextStyle(fontSize: 18),
                              decoration: InputDecoration(
                                labelText: 'Nama Depan',
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(0.0),
                                ),
                                fillColor: Color.fromARGB(255, 236, 242, 248),
                                filled: true,
                                contentPadding:
                                    EdgeInsets.only(left: 10.0, right: 10.0),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 1, // Make this field take half as much space
                    child: Container(
                      margin: EdgeInsets.only(left: 0, right: 39.0),
                      child: TextFormField(
                        controller: controller.namaBelakangController,
                        style: TextStyle(fontSize: 18),
                        decoration: InputDecoration(
                          labelText: 'Nama Belakang',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(0.0),
                          ),
                          fillColor: Color.fromARGB(255, 236, 242, 248),
                          filled: true,
                          contentPadding:
                              EdgeInsets.only(left: 10.0, right: 10.0),
                        ),
                      ),
                    ),
                  ),
                ],
              ),

              SizedBox(height: 12.0), // Add space between the fields
              Container(
                margin: EdgeInsets.symmetric(
                    horizontal: 40.0), // Add horizontal margins
                child: Row(
                  children: [
                    Icon(
                      Icons.class_, // Change the icon
                      color: Color.fromARGB(255, 102, 181, 241),
                      size: 30.0, // Apply color to the icon
                    ),
                    SizedBox(
                        width:
                            10.0), // Add some space between the icon and the TextFormField
                    Expanded(
                      child: TextFormField(
                        initialValue: user['kelas']['nama_kelas'],
                        style: TextStyle(fontSize: 21),
                        readOnly: true,
                        decoration: InputDecoration(
                          labelText: 'Kelas',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(0.0),
                          ),
                          fillColor: Color.fromARGB(255, 219, 220, 221),
                          filled: true,
                          contentPadding:
                              EdgeInsets.only(left: 10.0, right: 10.0),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 12.0), // Add space between the fields
              Container(
                margin: EdgeInsets.symmetric(
                    horizontal: 40.0), // Add horizontal margins
                child: Row(
                  children: [
                    Icon(
                      Icons.abc_outlined, // Change the icon
                      color: Color.fromARGB(255, 102, 181, 241),
                      size: 30.0, // Apply color to the icon
                    ),
                    SizedBox(
                        width:
                            10.0), // Add some space between the icon and the TextFormField
                    Expanded(
                      child: TextFormField(
                        controller: controller.agamaController,
                        style: TextStyle(fontSize: 21),
                        decoration: InputDecoration(
                          labelText: 'Agama',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(0.0),
                          ),
                          fillColor: Color.fromARGB(255, 236, 242, 248),
                          filled: true,
                          contentPadding:
                              EdgeInsets.only(left: 10.0, right: 10.0),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              SizedBox(height: 12.0), // Add space between the fields
              Container(
                margin: EdgeInsets.symmetric(
                    horizontal: 40.0), // Add horizontal margins
                child: Row(
                  children: [
                    Icon(
                      Icons.email, // Change the icon
                      color: Color.fromARGB(255, 102, 181, 241),
                      size: 30.0, // Apply color to the icon
                    ),
                    SizedBox(
                        width:
                            10.0), // Add some space between the icon and the TextFormField
                    Expanded(
                      child: TextFormField(
                        controller: controller.emailController,
                        style: TextStyle(fontSize: 21),
                        decoration: InputDecoration(
                          labelText: 'Email',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(0.0),
                          ),
                          fillColor: Color.fromARGB(255, 236, 242, 248),
                          filled: true,
                          contentPadding:
                              EdgeInsets.only(left: 10.0, right: 10.0),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              SizedBox(height: 12.0), // Add space between the fields
              Container(
                margin: EdgeInsets.symmetric(
                    horizontal: 40.0), // Add horizontal margins
                child: Row(
                  children: [
                    Icon(
                      Icons.home, // Change the icon
                      color: Color.fromARGB(255, 102, 181, 241),
                      size: 30.0, // Apply color to the icon
                    ),
                    SizedBox(
                        width:
                            10.0), // Add some space between the icon and the TextFormField
                    Expanded(
                      child: TextFormField(
                        controller: controller.alamatController,
                        style: TextStyle(fontSize: 21),
                        decoration: InputDecoration(
                          labelText: 'Alamat',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(0.0),
                          ),
                          fillColor: Color.fromARGB(255, 236, 242, 248),
                          filled: true,
                          contentPadding:
                              EdgeInsets.only(left: 10.0, right: 10.0),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              SizedBox(height: 12.0), // Add space between the fields
              Container(
                margin: EdgeInsets.symmetric(horizontal: 40.0),
                child: Row(
                  children: [
                    Icon(
                      Icons.calendar_today,
                      color: Color.fromARGB(255, 102, 181, 241),
                      size: 30.0,
                    ),
                    SizedBox(width: 10.0),
                    Expanded(
                      child: TextFormField(
                        controller: controller.tanggallahirController,
                        style: TextStyle(fontSize: 21),
                        decoration: InputDecoration(
                          labelText: 'Tanggal Lahir',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(0.0),
                          ),
                          fillColor: Color.fromARGB(255, 236, 242, 248),
                          filled: true,
                          contentPadding:
                              EdgeInsets.only(left: 10.0, right: 10.0),
                        ),
                        onTap: () async {
                          FocusScope.of(context).requestFocus(new FocusNode());
                          final DateTime? picked = await showDatePicker(
                            context: context,
                            initialDate: DateTime.now(),
                            firstDate: DateTime(1900),
                            lastDate: DateTime.now(),
                          );
                          if (picked != null) {
                            controller.tanggallahirController.text =
                                DateFormat('yyyy-MM-dd').format(picked);
                          }
                        },
                      ),
                    ),
                  ],
                ),
              ),

              SizedBox(height: 12.0), // Add space between the fields
              Container(
                margin: EdgeInsets.symmetric(
                    horizontal: 40.0), // Add horizontal margins
                child: Row(
                  children: [
                    Icon(
                      Icons.people, // Change the icon
                      color: Color.fromARGB(255, 102, 181, 241),
                      size: 30.0, // Apply color to the icon
                    ),
                    SizedBox(
                        width:
                            10.0), // Add some space between the icon and the TextFormField
                    Expanded(
                      child: DropdownButtonFormField<String>(
                        value: user['Jenis_Kelamin'].toString().toLowerCase(),
                        style: TextStyle(fontSize: 21),
                        decoration: InputDecoration(
                          labelText: 'Jenis Kelamin',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(0.0),
                          ),
                          fillColor: Color.fromARGB(255, 236, 242, 248),
                          filled: true,
                          contentPadding:
                              EdgeInsets.only(left: 10.0, right: 10.0),
                        ),
                        items: <String>['laki-laki', 'perempuan', 'lainnya']
                            .map((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(
                              value,
                              style: TextStyle(
                                  color:
                                      Colors.black), // Set text color to black
                            ),
                          );
                        }).toList(),
                        onChanged: (String? newValue) {
                          controller.jeniskelaminController.text = newValue!;
                        },
                      ),
                    ),
                  ],
                ),
              ),

              SizedBox(height: 16.0),
              ElevatedButton(
                onPressed: () async {
                  bool? shouldUpdate = await Get.defaultDialog<bool>(
                    title: 'Konfirmasi',
                    middleText: 'Apakah Anda ingin memperbarui profil?',
                    textConfirm: 'Ya',
                    textCancel: 'Tidak',
                    confirmTextColor: Colors.white,
                    onConfirm: () => Get.back(result: true),
                    onCancel: () => Get.back(result: false),
                  );

                  if (shouldUpdate == true) {
                    controller.updateProfile();
                  }
                },
                child: Text(
                  'Edit Profile',
                  style: TextStyle(fontSize: 20.0, color: Colors.white),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 95, 187, 241),
                  padding: EdgeInsets.symmetric
                  (horizontal: 50, vertical: 2),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: CustomBottomNavigationBar(
        initialActiveIndex: 2, // Set the initial active index to 2 for Profile
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
                dashboardController
                    .createAbsensi(); // Use dashboardController to call createAbsensi
              }
              break;
            case 2: // Profile
              Get.offNamed(Routes.MENU_PROFILE);
              break;
          }
          print('click index=$i');
        },
      ),
    );
  }
}
