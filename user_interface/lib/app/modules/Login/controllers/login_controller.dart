import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:user_interface/app/routes/app_pages.dart';
import '../../../../configapi.dart';

class LoginController extends GetxController with StateMixin {
  GetConnect getConnect = GetConnect();

  // Add fields for nisn and password
  final nisn = ''.obs;
  final password = ''.obs;

  @override
  void onInit() {
    super.onInit();
  }

  void showLoadingDialog(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return Dialog(
          backgroundColor: Colors.transparent,
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.3),
                borderRadius: BorderRadius.circular(10),
              ),
              width: 50,
              height: 100,
              child: Image.asset(
                'assets/images/loading.gif',
                fit: BoxFit.cover, // make the GIF fill the container
              ),
            ),
          ),
        );
      },
    );
  }

  Future<void> login(BuildContext context) async {
    try {
      final response = await getConnect.post('${ConfigAPI.baseUrl}api/login', {
        'nisn': nisn.value,
        'password': password.value,
      });
      print(response.body);

      if (response.status.code != null) {
        if (response.status.code! >= 200 && response.status.code! < 300) {
          // Show loading dialog
          showLoadingDialog(context);

          // Wait for 1 second
          await Future.delayed(Duration(seconds: 3));

          // Dismiss the dialog
          Navigator.of(context).pop();

          // Handle successful login
          change(response.body, status: RxStatus.success());
          Get.snackbar(
            'Success',
            'Login Berhasil',
            backgroundColor: Colors.green,
            colorText: Colors.white,
          );
          // Save JWT to GetStorage
          final storage = GetStorage();
          storage.write('jwt', response.body['jwt']);

          storage.write('user', response.body['user']);

          // Navigate to dashboard
          Get.offNamed(Routes.DASHBOARD);
        } else if (response.status.code! == 400) {
          // Handle incorrect password or empty fields
          if (response.body['message'] ==
              'NISN and password must be provided') {
            change(null,
                status: RxStatus.error('NISN and password must be provided'));
            Get.snackbar(
              'Error',
              'NISN dan password harus diisi',
              backgroundColor: Colors.red,
              colorText: Colors.white,
            );
          } else if (response.body['message'] == 'Incorrect password') {
            change(null, status: RxStatus.error('Incorrect password'));
            Get.snackbar(
              'Error',
              'password salah',
              backgroundColor: Colors.red,
              colorText: Colors.white,
            );
          }
        } else if (response.status.code! == 404) {
          // Handle user not found
          change(null, status: RxStatus.error('User not found'));
          Get.snackbar(
            'Error',
            'User tidak ditemukan',
            backgroundColor: Colors.red,
            colorText: Colors.white,
          );
        } else if (response.status.code! == 500) {
          // Handle JWT signing error
          change(null, status: RxStatus.error('Could not login'));
          Get.snackbar(
            'Error',
            'Gagal saat login',
            backgroundColor: Colors.red,
            colorText: Colors.white,
          );
        } else {
          // Handle other errors
          change(null, status: RxStatus.error('Failed to login'));
          Get.snackbar('Error', 'gagal saat login');
        }
      } else {
        // Handle no status code
        change(null, status: RxStatus.error('No status code received'));
        Get.snackbar('Error', 'tidak ada kode status diterima');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {
    super.onClose();
  }
}
