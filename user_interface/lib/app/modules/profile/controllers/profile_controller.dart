import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:user_interface/app/routes/app_pages.dart';
import 'package:user_interface/configapi.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';

class ProfileController extends GetxController {
  final namaDepanController = TextEditingController();
  final namaBelakangController = TextEditingController();
  final emailController = TextEditingController();
  final agamaController = TextEditingController();
  final alamatController = TextEditingController();
  final tanggallahirController = TextEditingController();
  final jeniskelaminController = TextEditingController();
  final nisnController = TextEditingController();
  final kelasController = TextEditingController();

  RxString imageUrl = ''.obs;
  var user;
  var profilePictureFile = ''.obs;
  GetConnect getConnect = GetConnect();

  @override
  void onInit() {
    super.onInit();

    // Access and print user info
    final storage = GetStorage();

    user = storage.read('user');
    print('User info: $user');

    // Only update imageUrl if it's not a local file path
    if (!imageUrl.value.startsWith('file://')) {
      imageUrl.value = user['Urlphoto'];
      if (imageUrl.value.startsWith('http://localhost:5000/')) {
        imageUrl.value = imageUrl.value
            .replaceFirst('http://localhost:5000/', ConfigAPI.baseUrl);
      }
    }

    namaDepanController.text = user['Nama_Depan'];
    namaBelakangController.text = user['Nama_Belakang'];
    emailController.text = user['Email'];
    agamaController.text = user['Agama'];
    alamatController.text = user['Alamat'];
    tanggallahirController.text = user['Tanggal_Lahir'];
    jeniskelaminController.text = user['Jenis_Kelamin'];
    kelasController.text = user['kelas']['nama_kelas']; // Set the class name
  }

  void updateProfilePicture(String imagePath) {
    profilePictureFile.value = imagePath;
    imageUrl.value = imagePath;
  
  }

  void updateProfile() async {
    try {
      var request = http.MultipartRequest(
        'PUT',
        Uri.parse('${ConfigAPI.baseUrl}api/siswa/${user['ID']}'),
      );

      if (profilePictureFile.value.isNotEmpty) {
        // Compress the image
        final bytes = await FlutterImageCompress.compressWithFile(
          profilePictureFile.value,
          minWidth: 600,
          minHeight: 600,
          quality: 88,
        );

        // Create a MultipartFile using the compressed image
        final multipartFile = http.MultipartFile.fromBytes(
          'file',
          bytes as List<int>,
          contentType: MediaType('image', 'jpeg'),
          filename: profilePictureFile.value.split("/").last, // get filename
        );

        request.files.add(multipartFile);
      }
      request.fields.addAll({
        'Nama_Depan': namaDepanController.text,
        'Nama_Belakang': namaBelakangController.text,
        'Email': emailController.text,
        'Agama': agamaController.text,
        'Alamat': alamatController.text,
        'Tanggal_Lahir': tanggallahirController.text,
        'Jenis_Kelamin': jeniskelaminController.text,
        'KelasID': user['kelas_id'].toString(),
      });
      var response = await request.send();
      var responseBody = await response.stream.bytesToString();

      if (response.statusCode >= 200 && response.statusCode < 300) {
        var responseData = jsonDecode(responseBody);
        if (responseData['ID'] != null) {
          // Update user data in GetStorage
          final storage = GetStorage();
          user =
              responseData; // Assuming responseData contains the updated user data

        
          // Manually update the 'kelas' field in the user object
          user['kelas'] = storage.read('user')['kelas'];
          storage.write('user', user);
          //kelasdidalam user

          Get.snackbar(
            'Success',
            'Profile updated successfully',
            backgroundColor: Colors.green,
            colorText: Colors.white,
          );
          print('Response data: $responseData');
            Get.offAllNamed(Routes.DASHBOARD);

        } else if (responseData['message'] != null) {
          // Show error alert
          Get.snackbar(
            'Error',
            responseData['message'],
            backgroundColor: Colors.red,
            colorText: Colors.white,
          );
        }
      } else {
        print('Status code: ${response.statusCode}');
        print('Response body: $responseBody');
        print('Response body: ${response.reasonPhrase};');
        throw Exception('Failed to update profile.');
      }
    } catch (e) {
      print('Error: $e');
      Get.snackbar(
        'Error',
        'Failed to update profile',
        backgroundColor: Colors.red,
        colorText: Colors.white,
      );
    }
  }
}
