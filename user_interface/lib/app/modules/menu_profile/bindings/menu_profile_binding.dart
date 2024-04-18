import 'package:get/get.dart';
import 'package:user_interface/app/modules/dashboard/controllers/dashboard_controller.dart';
import 'package:user_interface/app/modules/profile/controllers/profile_controller.dart';

import '../controllers/menu_profile_controller.dart';

class MenuProfileBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<MenuProfileController>(
      () => MenuProfileController(),
    );
    Get.lazyPut<DashboardController>(
      () => DashboardController(),
    );
    Get.lazyPut<ProfileController>(
      () => ProfileController(),
    );
  }
}
