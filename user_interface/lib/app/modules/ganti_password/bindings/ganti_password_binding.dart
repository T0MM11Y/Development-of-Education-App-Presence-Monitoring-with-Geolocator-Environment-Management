import 'package:get/get.dart';

import '../controllers/ganti_password_controller.dart';

class GantiPasswordBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<GantiPasswordController>(
      () => GantiPasswordController(),
    );
  }
}
