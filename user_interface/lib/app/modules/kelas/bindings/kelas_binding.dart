import 'package:get/get.dart';

import '../controllers/kelas_controller.dart';

class KelasBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<KelasController>(
      () => KelasController(),
    );
  }
}
