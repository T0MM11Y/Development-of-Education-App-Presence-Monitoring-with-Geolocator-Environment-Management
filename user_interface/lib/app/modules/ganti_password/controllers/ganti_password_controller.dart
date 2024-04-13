// GantiPasswordController.dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:user_interface/configapi.dart';
import 'package:get_storage/get_storage.dart';

class GantiPasswordController extends GetxController {
  TextEditingController oldPasswordController = TextEditingController();
  TextEditingController newPasswordController = TextEditingController();
  TextEditingController confirmPasswordController = TextEditingController();
  var user;

  @override
  void onInit() {
    super.onInit();

    // Read the user data from local storage
    final storage = GetStorage();
    user = storage.read('user');
  }
  Future<void> changePassword() async {
    String oldPassword = oldPasswordController.text;
    String newPassword = newPasswordController.text;
    String confirmPassword = confirmPasswordController.text;
  
    if (oldPassword.isEmpty || newPassword.isEmpty || confirmPassword.isEmpty) {
      Get.snackbar(
        "Error", 
        "Semua field harus diisi",
        colorText: Colors.white,
        backgroundColor: Colors.red,
      );
      return;
    }
  
    if (newPassword != confirmPassword) {
      Get.snackbar(
        "Error", 
        "Password baru dan konfirmasi password tidak cocok",
        colorText: Colors.white,
        backgroundColor: Colors.red,
      );
      return;
    }
  
    var request = http.MultipartRequest(
      'PUT',
      Uri.parse('${ConfigAPI.baseUrl}api/siswa/${user['ID']}/password'),
    );
  
    request.fields.addAll({
      'old_password': oldPassword,
      'new_password': newPassword,
      'confirm_password': confirmPassword,
    });
  
    var response = await request.send();
  
    if (response.statusCode == 200) {
      Get.snackbar(
        "Sukses", 
        "Password berhasil diubah",
        colorText: Colors.white,
        backgroundColor: Colors.green,
      );
  
      // Remove user data from local storage
      final storage = GetStorage();
      storage.erase();
      storage.remove('jwt');
      storage.remove('user');
  
      // Redirect to login page
      Get.offAllNamed('/login');
    } else {
      var responseText = await response.stream.bytesToString();
      var message = jsonDecode(responseText)['message'];
      Get.snackbar(
        "Error", 
        message,
        colorText: Colors.white,
        backgroundColor: Colors.red,
      );
    }
  }
}