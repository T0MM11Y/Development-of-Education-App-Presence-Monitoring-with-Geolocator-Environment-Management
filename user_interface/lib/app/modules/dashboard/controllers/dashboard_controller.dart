import 'dart:convert';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import '../../../../configapi.dart';
import 'package:intl/intl.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';

class DashboardController extends GetxController {
  var status = '-'.obs;
  var waktu = '-'.obs;
  var imageUrl = ''.obs;
  final GetConnect getConnect = GetConnect();
  Map<String, dynamic> user = {};

  @override
  void onInit() {
    super.onInit();

    // Access and print user info
    final storage = GetStorage();
    user = storage.read('user');
    print('User info: $user');
    imageUrl.value = user['Urlphoto'];
    if (imageUrl.value.startsWith('http://localhost:5000/')) {
      imageUrl.value = imageUrl.value
          .replaceFirst('http://localhost:5000/', ConfigAPI.baseUrl);
    }

    // Call checkAbsensi here
    checkAbsensi();
  }

  Future<void> logout() async {
    bool? shouldLogout = await Get.defaultDialog<bool>(
      title: 'Konfirmasi Logout',
      middleText: 'Apakah Anda yakin ingin logout?',
      textConfirm: 'Ya',
      textCancel: 'Tidak',
      confirmTextColor: Colors.white,
      onConfirm: () => Get.back(result: true),
      onCancel: () => Get.back(result: false),
    );

    if (shouldLogout == true) {
      final response =
          await getConnect.post('${ConfigAPI.baseUrl}api/logout', {});
      if (response.status.code! >= 200 && response.status.code! < 300) {
        // Handle successful logout
        GetStorage().remove('user');
        Get.offAllNamed('/login');
      } else {
        // Handle logout error
        Get.snackbar('Error', 'Failed to logout');
      }
    }
  }

  Future<void> checkAbsensi() async {
    Map<String, dynamic> user = GetStorage().read('user');
    final response = await getConnect.get(
      '${ConfigAPI.baseUrl}api/absensi/user/${user['ID']}',
      query: {
        'user_id': [user['ID'].toString()],
        'tanggal': [DateFormat('yyyy-MM-dd – hh:mm a').format(DateTime.now())],
      },
    );
    if (response.status.code! >= 200 && response.status.code! < 300) {
      if (response.bodyString != null) {
        Map<String, dynamic> responseBody = json.decode(response.bodyString!);
        if (responseBody['data'] != null && responseBody['data'].isNotEmpty) {
          // The user has already checked in today
          status.value = responseBody['data']['status'];

          // Parse the date string
          DateTime dateTime = DateTime.parse(responseBody['data']['tanggal']);

          // Convert to local time (Indonesia Western Standard Time)
          dateTime = dateTime.add(
              Duration(hours: 7)); // Change this to your local timezone offset
          // Format the time to hour and minute
          String formattedTime = DateFormat('hh:mm a').format(dateTime);
          waktu.value = formattedTime;
        }
      }
    } else {
      // Handle error
      waktu.value = '-';

      print('Failed to check absensi');
    }
  }

  Future<void> createAbsensi() async {
    // Show loading dialog
    Get.dialog(
      Dialog(
        backgroundColor: Colors.transparent,
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.3),
              borderRadius: BorderRadius.circular(10),
            ),
            width: 50,
            height: 110,
            child: Image.asset(
              'assets/images/loading.gif',
              fit: BoxFit.cover,
            ),
          ),
        ),
      ),
      barrierDismissible: false,
    );
    PermissionStatus permissionStatus = await Permission.location.request();
    // Check if permission is granted
    if (permissionStatus.isGranted) {
      Position position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high);
      Map<String, dynamic> user = GetStorage().read('user');

      final response = await getConnect.post(
        '${ConfigAPI.baseUrl}api/absensi',
        {
          'latitude': position.latitude,
          'longitude': position.longitude,
          'user_id': user[
              'ID'], // Make sure the key matches the one expected by the server
          'status': 'Hadir', // Set status to "hadir"
        },
      );

// Dismiss loading dialog
      if (Get.isDialogOpen!) {
        await Future.delayed(Duration(seconds: 2)); // Add delay
        Get.back();
      }
      if (response.status.code! >= 200 && response.status.code! < 300) {
        Get.snackbar(
          'Success',
          'Berhasil absen, absen berhasil dibuat',
          backgroundColor: Colors.green,
          colorText: Colors.white,
        );
        if (response.bodyString != null) {
          Map<String, dynamic> responseBody = json.decode(response.bodyString!);
          status.value = responseBody['data']['status'];

          // Parse the date string
          DateTime dateTime = DateTime.parse(responseBody['data']['tanggal']);
          // Convert to local time (Indonesia Western Standard Time)
          dateTime = dateTime.add(
              Duration(hours: 7)); // Change this to your local timezone offset
          // Format the time to hour and minute
          String formattedTime = DateFormat('HH:mm').format(dateTime);
          waktu.value = formattedTime;

          // Check if the user is late
          if (dateTime.hour > 8) {
            status.value = 'Terlambat';
          }
        }
        print(response.body);
      } else {
        if (response.bodyString != null) {
          Map<String, dynamic> responseBody = json.decode(response.bodyString!);
          if (responseBody['message'] != null) {
            Get.snackbar(
              'Error',
              responseBody['message'],
              backgroundColor: Colors.red,
              colorText: Colors.white,
            );
          } else {
            Get.snackbar(
              'Error',
              'Gagal membuat absensi',
              backgroundColor: Colors.red,
              colorText: Colors.white,
            );
          }
        } else {
          Get.snackbar(
            'Error',
            'Galat saat membuat absensi',
            backgroundColor: Colors.red,
            colorText: Colors.white,
          );
        }
        //print error
        print(response.body);
        //print latitude dan longitude
        print('Latitude: ${position.latitude}');
        print('Longitude: ${position.longitude}');
      }
    } else {
      // Handle when permission is not granted
      Get.snackbar(
        'Permission Denied',
        'You must grant location permission to create absensi',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    }
  }
}
