// FILE: MENU_PROFILE_CONTROLLER.DART
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:user_interface/configapi.dart';

class MenuProfileController extends GetxController {
  final imageUrl = ''.obs;
  var user;
  GetConnect getConnect = GetConnect();

  @override
  void onInit() {
    super.onInit();
    final storage = GetStorage();
    user = storage.read('user');
    imageUrl.value = user['Urlphoto'];
  }

  Future<void> logout() async {
    try {
      var response =
          await getConnect.post('${ConfigAPI.baseUrl}api/logout', {});
      if (response.statusCode != null &&
          response.statusCode! >= 200 &&
          response.statusCode! < 300) {
        final storage = GetStorage();
        storage.erase();
        storage.remove('jwt');
        storage.remove('user');
        Get.snackbar(
          'Success',
          'Logout successful',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
        Get.offAllNamed('/login');
      } else {
        print('Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
        throw Exception('Failed to logout.');
      }
    } catch (e) {
      print('Error: $e');
      Get.snackbar(
        'Error',
        'Failed to logout',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    }
  }
}
