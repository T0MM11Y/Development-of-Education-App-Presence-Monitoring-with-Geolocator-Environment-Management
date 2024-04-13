import 'package:get/get.dart';

import '../modules/Login/bindings/login_binding.dart';
import '../modules/Login/views/login_view.dart';
import '../modules/dashboard/bindings/dashboard_binding.dart';
import '../modules/dashboard/views/dashboard_view.dart';
import '../modules/ganti_password/bindings/ganti_password_binding.dart';
import '../modules/ganti_password/views/ganti_password_view.dart';
import '../modules/historyAbsensi/bindings/history_absensi_binding.dart';
import '../modules/historyAbsensi/views/history_absensi_view.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';
import '../modules/menu_profile/bindings/menu_profile_binding.dart';
import '../modules/menu_profile/views/menu_profile_view.dart';
import '../modules/profile/bindings/profile_binding.dart';
import '../modules/profile/views/profile_view.dart';

part 'app_routes.dart';

class AppPages {
  AppPages._();

  static const INITIAL = Routes.LOGIN;

  static final routes = [
    GetPage(
      name: _Paths.HOME,
      page: () => const HomeView(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: _Paths.LOGIN,
      page: () => const LoginView(),
      binding: LoginBinding(),
    ),
    GetPage(
      name: _Paths.DASHBOARD,
      page: () => DashboardView(),
      binding: DashboardBinding(),
    ),
    GetPage(
      name: _Paths.PROFILE,
      page: () => ProfileView(),
      binding: ProfileBinding(),
    ),
    GetPage(
      name: _Paths.HISTORY_ABSENSI,
      page: () => HistoryAbsensiView(),
      binding: HistoryAbsensiBinding(),
    ),
    GetPage(
      name: _Paths.MENU_PROFILE,
      page: () => MenuProfileView(),
      binding: MenuProfileBinding(),
    ),
    GetPage(
      name: _Paths.GANTI_PASSWORD,
      page: () => const GantiPasswordView(),
      binding: GantiPasswordBinding(),
    ),
  ];
}
