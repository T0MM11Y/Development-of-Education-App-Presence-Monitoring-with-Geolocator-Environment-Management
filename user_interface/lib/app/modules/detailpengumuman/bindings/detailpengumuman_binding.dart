import 'package:get/get.dart';
import 'package:user_interface/app/modules/allpengumuman/controllers/allpengumuman_controller.dart';

import '../controllers/detailpengumuman_controller.dart';

class DetailpengumumanBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<DetailpengumumanController>(
      () => DetailpengumumanController(),
    );
    Get.lazyPut<AllpengumumanController>(
      () => AllpengumumanController(),
    );
  }
}
