import 'package:get/get.dart';

import '../controllers/guru_controller.dart';

class GuruBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<GuruController>(
      () => GuruController(),
    );
  }
}
