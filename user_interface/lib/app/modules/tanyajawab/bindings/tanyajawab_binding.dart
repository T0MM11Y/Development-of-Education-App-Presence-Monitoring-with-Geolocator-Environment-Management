import 'package:get/get.dart';

import '../controllers/tanyajawab_controller.dart';

class TanyajawabBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<TanyajawabController>(
      () => TanyajawabController(),
    );
  }
}
