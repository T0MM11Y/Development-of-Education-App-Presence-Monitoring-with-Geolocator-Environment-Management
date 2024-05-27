import 'package:get/get.dart';
import 'package:user_interface/configapi.dart';
import 'package:get_storage/get_storage.dart';

class TanyajawabController extends GetxController {
  final RxString filterValue = RxString('');
  final RxString searchValue = RxString('');

  final GetConnect getConnect = GetConnect();
  final Rx<List<Map<String, dynamic>>> tanyajawabList =
      Rx<List<Map<String, dynamic>>>([]);

  @override
  void onInit() {
    super.onInit();
    fetchTanyaJawab();
  }

  void searchTanyaJawab() {
    if (searchValue.value.isNotEmpty) {
      tanyajawabList.value = tanyajawabList.value.where((item) {
        final namaDepan = item['user']['Nama_Depan'].toLowerCase();
        final namaBelakang = item['user']['Nama_Belakang'].toLowerCase();
        final pertanyaan = item['pertanyaan'].toLowerCase();
        return namaDepan.contains(searchValue.value.toLowerCase()) ||
            namaBelakang.contains(searchValue.value.toLowerCase()) ||
            pertanyaan.contains(searchValue.value.toLowerCase());
      }).toList();
    } else {
      fetchTanyaJawab();
    }
  }

  Future<void> askQuestion(String question) async {
    final box = GetStorage();
    final userInfo = box.read('user');
    final userId = userInfo['ID'];

    final lastQuestionTime = box.read('lastQuestionTime');
    if (lastQuestionTime != null &&
        DateTime.now().difference(DateTime.parse(lastQuestionTime)).inHours <
            2) {
      throw Exception(
          'Anda hanya bisa mengirim pertanyaan setiap 2 jam sekali');
    }

    final response = await getConnect.post(
      '${ConfigAPI.baseUrl}api/tanyajawab',
      {
        'user_id': userId,
        'pertanyaan': question,
      },
    );

    if (response.status.code! >= 200 && response.status.code! < 300) {
      Get.snackbar('Berhasil', 'Pertanyaan berhasil dikirim');
      box.write('lastQuestionTime', DateTime.now().toIso8601String());
      fetchTanyaJawab();
    } else {
      Get.snackbar('Gagal', 'Gagal mengirim pertanyaan');
      throw Exception('Failed to ask question');
    }
  }

  Future<void> fetchTanyaJawab() async {
    final box = GetStorage();
    final userInfo = box.read('user');
    final userId = userInfo['ID'];

    final response = await getConnect.get(
      '${ConfigAPI.baseUrl}api/tanyajawab',
    );
    if (response.status.code! >= 200 && response.status.code! < 300) {
      List<dynamic> data = response.body as List<dynamic>;
      for (var item in data) {
        if (item['user'] != null &&
            item['user']['Urlphoto'] != null &&
            item['user']['Urlphoto'].startsWith('http://localhost:5000/')) {
          item['user']['Urlphoto'] = item['user']['Urlphoto']
              .replaceFirst('http://localhost:5000/', ConfigAPI.baseUrl);
        }
      }
      // Sort the data based on 'tanggal_tanya'
      data.sort((a, b) => DateTime.parse(b['tanggal_tanya'])
          .compareTo(DateTime.parse(a['tanggal_tanya'])));

      // Find the last question from the current user and move it to the start of the list
      final userLastQuestionIndex =
          data.indexWhere((item) => item['user']['ID'] == userId);
      dynamic userLastQuestion;
      if (userLastQuestionIndex != -1) {
        userLastQuestion = data.removeAt(userLastQuestionIndex);
      }

      // Shuffle the rest of the data
      data.shuffle();

      // Insert the last question from the current user at the start of the list
      if (userLastQuestion != null) {
        data.insert(0, userLastQuestion);
      }

      if (filterValue.value.isNotEmpty) {
        final now = DateTime.now();
        data = data.where((item) {
          final tanggalTanya = DateTime.parse(item['tanggal_tanya']).toLocal();
          if (filterValue.value == 'Hari ini') {
            return tanggalTanya.day == now.day &&
                tanggalTanya.month == now.month &&
                tanggalTanya.year == now.year;
          } else if (filterValue.value == 'Minggu ini') {
            return tanggalTanya.isAfter(now.subtract(Duration(days: 7)));
          } else if (filterValue.value == 'Bulan ini') {
            return tanggalTanya.month == now.month &&
                tanggalTanya.year == now.year;
          } else if (filterValue.value == 'Tahun ini') {
            return tanggalTanya.year == now.year;
          } else if (filterValue.value == 'Semua') {
            return true;
          } else {
            throw Exception('Failed to load tanyajawab');
          }
        }).toList();
      }
      tanyajawabList.value =
          data.map((item) => item as Map<String, dynamic>).toList();
      print(tanyajawabList);
    } else {
      throw Exception('Failed to load tanyajawab');
    }
  }
}
