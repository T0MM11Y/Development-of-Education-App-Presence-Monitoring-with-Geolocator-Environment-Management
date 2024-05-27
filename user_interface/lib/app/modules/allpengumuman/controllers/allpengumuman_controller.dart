// AllpengumumanController.dart
import 'package:get/get.dart';
import 'package:user_interface/configapi.dart';

class AllpengumumanController extends GetxController {
  final GetConnect getConnect = GetConnect();
  var searchTerm = ''.obs;
  var selectedFilter = 'Semua Waktu'.obs;
  var pengumumanList = <dynamic>[].obs;

  @override
  void onInit() {
    super.onInit();
    fetchPengumuman();
  }

  Future<void> getPengumumanById(String id) async {
    final response = await getConnect.get(
      '${ConfigAPI.baseUrl}api/pengumuman/$id',
    );
    if (response.status.code! >= 200 && response.status.code! < 300) {
      // Navigate to the "DETAILPENGUMUMAN" route and pass the data as an argument
      Get.toNamed('detailpengumuman', arguments: response.body);
      print(response.body);
    } else {
      throw Exception('Failed to load pengumuman');
    }
  }

  Future<void> fetchPengumuman() async {
    final response = await getConnect.get(
      '${ConfigAPI.baseUrl}api/pengumuman',
    );
    if (response.status.code! >= 200 && response.status.code! < 300) {
      List<dynamic> data = response.body['data'] as List<dynamic>;
      // Only filter the data if searchTerm is not empty
      if (searchTerm.value.isNotEmpty) {
        data = data.where((item) {
          return item['judul']
              .toLowerCase()
              .contains(searchTerm.value.toLowerCase());
        }).toList();
      }
      // Filter the data based on selectedFilter
      DateTime now = DateTime.now();
      if (selectedFilter.value == 'Hari ini') {
        data = data.where((item) {
          DateTime createdAt = DateTime.parse(item['Created_At']);
          return createdAt.day == now.day &&
              createdAt.month == now.month &&
              createdAt.year == now.year;
        }).toList();
      } else if (selectedFilter.value == 'Minggu ini') {
        DateTime aWeekAgo = now.subtract(Duration(days: 7));
        data = data.where((item) {
          DateTime createdAt = DateTime.parse(item['Created_At']);
          return createdAt.isAfter(aWeekAgo);
        }).toList();
      } else if (selectedFilter.value == 'Bulan ini') {
        data = data.where((item) {
          DateTime createdAt = DateTime.parse(item['Created_At']);
          return createdAt.month == now.month && createdAt.year == now.year;
        }).toList();
      } else if (selectedFilter.value == 'Tahun ini') {
        data = data.where((item) {
          DateTime createdAt = DateTime.parse(item['Created_At']);
          return createdAt.year == now.year;
        }).toList();
      }
      for (var item in data) {
        if (item['urlphoto'].startsWith('http://localhost:5000/')) {
          item['urlphoto'] = item['urlphoto']
              .replaceFirst('http://localhost:5000/', ConfigAPI.baseUrl);
        }
        if (item['isi'].length > 100) {
          item['isi'] = item['isi'].substring(0, 100) + '...';
        }
      }
      pengumumanList.value = data;
      update();
    } else {
      throw Exception('Failed to load pengumuman');
    }
  }
}
