// ignore_for_file: invalid_use_of_protected_member, duplicate_ignore

import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:intl/intl.dart';
import 'dart:convert';

import '../../../../configapi.dart';

class KelasController extends GetxController {
  final GetConnect getConnect = GetConnect();
  var kelasData = {}.obs;
  var imageUrl = ''.obs;
  var filteredUsers = [].obs;
  final searchController = TextEditingController();

  @override
  void onInit() {
    super.onInit();

    // Access and print user info
    final storage = GetStorage();
    Map<String, dynamic> user = storage.read('user');

    print('User info: $user');

    // Fetch class data
    fetchKelasData(user['kelas_id']);
  }

  Future<Map<String, String>> checkAbsensi(int userId) async {
    final response = await getConnect.get(
      '${ConfigAPI.baseUrl}api/absensi/user/$userId/hariini',
      query: {
        'user_id': [userId.toString()],
        'tanggal': [DateFormat('yyyy-MM-dd').format(DateTime.now())],
      },
    );
    Map<String, String> result = {'status': '🕒 Belum', 'absensiTime': ''};
    if (response.status.code! >= 200 && response.status.code! < 300) {
      if (response.bodyString != null) {
        Map<String, dynamic> responseBody = json.decode(response.bodyString!);
        if (responseBody['data'] != null && responseBody['data'].isNotEmpty) {
          // The user has already checked in today
          result['status'] = responseBody['data'][0]['status'];
          result['absensiTime'] = responseBody['data'][0]['tanggal'];
        }
      }
    } else {
      print('Failed to check absensi for user $userId');
    }
    return result;
  }

  void searchUser(String query) {
    if (query.isEmpty) {
      // ignore: invalid_use_of_protected_member
      filteredUsers.value = kelasData.value['users'];
    } else {
      filteredUsers.value = kelasData.value['users'].where((user) {
        return user['Nama_Depan'].toLowerCase().contains(query.toLowerCase()) ||
            user['Nama_Belakang'].toLowerCase().contains(query.toLowerCase()) ||
            user['NISN'].toString().contains(query); // Change this line
      }).toList();
    }
  }

  void fetchKelasData(int kelasId) async {
    final response =
        await getConnect.get('${ConfigAPI.baseUrl}api/kelas/$kelasId');
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
            height: 100,
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
        Map<String, dynamic> responseBody = json.decode(response.bodyString!);
        kelasData.value = responseBody;
        for (var user in responseBody['users']) {
          user['Urlphoto'] =
              user['Urlphoto'].startsWith('http://localhost:5000/')
                  ? user['Urlphoto']
                      .replaceFirst('http://localhost:5000/', ConfigAPI.baseUrl)
                  : user['Urlphoto'];
          Map<String, String> absensiData = await checkAbsensi(user['ID']);
          user['status'] = absensiData['status'];
          user['absensiTime'] = absensiData['absensiTime'];
        }
        if (Get.isDialogOpen!) {
          await Future.delayed(Duration(seconds: 2)); // Add delay
          Get.back();
        }
        filteredUsers.value = responseBody['users'];
      }
    } else {
      print('Failed to fetch class data');
    }
  }
}
