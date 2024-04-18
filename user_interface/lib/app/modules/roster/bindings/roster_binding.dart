import 'package:get/get.dart';

import '../controllers/roster_controller.dart';

class RosterBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<RosterController>(
      () => RosterController(),
    );
  }
}
