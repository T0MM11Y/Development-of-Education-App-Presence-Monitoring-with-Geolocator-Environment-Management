import 'package:get/get.dart';
import 'package:user_interface/configapi.dart';

class DetailpengumumanController extends GetxController {
  var pengumuman = {}.obs;

  @override
  void onInit() {
    super.onInit();
    pengumuman.value = Get.arguments;

    if (pengumuman['data']['urlphoto'].startsWith('http://localhost:5000/')) {
      pengumuman['data']['urlphoto'] = pengumuman['data']['urlphoto'].replaceFirst('http://localhost:5000/', ConfigAPI.baseUrl);
    }
  }
}