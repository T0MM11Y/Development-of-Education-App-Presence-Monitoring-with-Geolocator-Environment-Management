import 'package:get/get.dart';

import '../controllers/allpengumuman_controller.dart';

class AllpengumumanBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AllpengumumanController>(
      () => AllpengumumanController(),
    );
  }
}
