import 'package:get/get.dart';
import 'package:user_interface/app/modules/historyAbsensi/controllers/history_absensi_controller.dart';

import '../controllers/dashboard_controller.dart';

class DashboardBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<DashboardController>(
      () => DashboardController(),
    );
  Get.lazyPut<HistoryAbsensiController>( // Initialize this
      () => HistoryAbsensiController(),
    );
  }
}
