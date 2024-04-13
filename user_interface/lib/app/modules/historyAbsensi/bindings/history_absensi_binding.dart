import 'package:get/get.dart';

import '../controllers/history_absensi_controller.dart';

class HistoryAbsensiBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<HistoryAbsensiController>(
      () => HistoryAbsensiController(),
    );

  }
}
