import 'package:get/get.dart';
import 'package:user_interface/configapi.dart';

class GuruController extends GetxController {
  final GetConnect getConnect = GetConnect();
  var guruList =
      <Map<String, dynamic>>[].obs; // Observable list to store the guru data
  var imageUrl = ''.obs; // Observable string to store the image URL
  var filteredGuruList = <Map<String, dynamic>>[].obs;

  @override
  void onInit() {
    super.onInit();
    fetchGuru();
  }

  void searchGuru(String query) {
    if (query.isEmpty) {
      filteredGuruList.value = guruList;
    } else {
      filteredGuruList.value = guruList.where((guru) {
        var guruName = '${guru['Nama_Depan']} ${guru['Nama_Belakang']}';
        return guruName.toLowerCase().contains(query.toLowerCase());
      }).toList();
    }
  }
  Future<void> fetchGuru() async {
    final response = await getConnect.get(
      '${ConfigAPI.baseUrl}api/pengajar',
    );
    if (response.status.code! >= 200 && response.status.code! < 300) {
      print(response.body);
      List<dynamic> data = response.body as List<dynamic>;
      guruList.value = data.map((item) {
        var guru = item as Map<String, dynamic>;
        if (guru['Urlphoto'].startsWith('http://localhost:5000/')) {
          guru['Urlphoto'] = guru['Urlphoto']
              .replaceFirst('http://localhost:5000/', ConfigAPI.baseUrl);
        }
        return guru;
      }).toList(); 
      filteredGuruList.value = guruList.value; 
    } else {
      throw Exception('Failed to load guru');
    }
  }
}
