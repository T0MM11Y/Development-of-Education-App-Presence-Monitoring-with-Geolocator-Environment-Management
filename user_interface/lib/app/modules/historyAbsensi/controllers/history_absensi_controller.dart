// ignore_for_file: invalid_use_of_protected_member

import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:user_interface/configapi.dart';
import 'package:intl/intl.dart';
import 'dart:convert';

class HistoryAbsensiController extends GetxController {
  final GetStorage storage = GetStorage();
  final userName = ''.obs;
  final userImage = ''.obs;
  final userKelas = ''.obs;
  final userNim = ''.obs;
  var status = '-'.obs;
  var waktu = '-'.obs;
  final GetConnect getConnect = GetConnect();
  var absensiHistory = [].obs;
  var filteredAbsensiHistory = [].obs;

  @override
  void onInit() {
    super.onInit();
    Map<String, dynamic> user = storage.read('user');
    filteredAbsensiHistory.value = absensiHistory.value;

    userNim.value = user['NISN'].toString();
    userKelas.value = user['kelas']['nama_kelas'];
    userName.value = '${user['Nama_Depan']} ${user['Nama_Belakang']}';
    userImage.value = user['Urlphoto'];
    if (userImage.value.startsWith('http://localhost:5000/')) {
      userImage.value = userImage.value
          .replaceFirst('http://localhost:5000/', ConfigAPI.baseUrl);
    }

    checkAbsensi();
    getAbsensiHistory();
  }

  void filterStatus(String status) {
    if (status == 'All') {
      filteredAbsensiHistory.value = absensiHistory.value;
    } else {
      filteredAbsensiHistory.value = absensiHistory
          .where((absensi) => absensi['status'] == status)
          .toList();
    }
  }

  Future<void> getAbsensiHistory() async {
    Map<String, dynamic> user = GetStorage().read('user');
    final response = await getConnect.get(
      '${ConfigAPI.baseUrl}api/absensi/history/${user['ID']}',
    );
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
    if (response.status.code! >= 200 && response.status.code! < 300) {
      if (response.bodyString != null) {
// Dismiss loading dialog
        if (Get.isDialogOpen!) {
          await Future.delayed(Duration(seconds: 2)); // Add delay
          Get.back();
        }
        Map<String, dynamic> responseBody = json.decode(response.bodyString!);
        if (responseBody['data'] != null && responseBody['data'].isNotEmpty) {
          absensiHistory.value = responseBody['data'];
          filteredAbsensiHistory.value = absensiHistory.value; // Add this line
        }
      }
    } else {
      print('Failed to get absensi history');
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
}
