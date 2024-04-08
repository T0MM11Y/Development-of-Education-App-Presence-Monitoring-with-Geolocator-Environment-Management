import 'package:get/get.dart';
import 'package:user_interface/app/modules/dashboard/controllers/dashboard_controller.dart';

import '../controllers/profile_controller.dart';

class ProfileBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ProfileController>(
      () => ProfileController(),
    );
    Get.lazyPut<DashboardController>(
      () => DashboardController(),
    );
  }
}
