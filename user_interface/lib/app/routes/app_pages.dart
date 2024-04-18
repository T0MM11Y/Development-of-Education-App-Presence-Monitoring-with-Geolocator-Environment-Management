import 'package:get/get.dart';

import '../modules/Login/bindings/login_binding.dart';
import '../modules/Login/views/login_view.dart';
import '../modules/allpengumuman/bindings/allpengumuman_binding.dart';
import '../modules/allpengumuman/views/allpengumuman_view.dart';
import '../modules/dashboard/bindings/dashboard_binding.dart';
import '../modules/dashboard/views/dashboard_view.dart';
import '../modules/detailpengumuman/bindings/detailpengumuman_binding.dart';
import '../modules/detailpengumuman/views/detailpengumuman_view.dart';
import '../modules/ganti_password/bindings/ganti_password_binding.dart';
import '../modules/ganti_password/views/ganti_password_view.dart';
import '../modules/guru/bindings/guru_binding.dart';
import '../modules/guru/views/guru_view.dart';
import '../modules/historyAbsensi/bindings/history_absensi_binding.dart';
import '../modules/historyAbsensi/views/history_absensi_view.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';
import '../modules/kelas/bindings/kelas_binding.dart';
import '../modules/kelas/views/kelas_view.dart';
import '../modules/menu_profile/bindings/menu_profile_binding.dart';
import '../modules/menu_profile/views/menu_profile_view.dart';
import '../modules/profile/bindings/profile_binding.dart';
import '../modules/profile/views/profile_view.dart';
import '../modules/roster/bindings/roster_binding.dart';
import '../modules/roster/views/roster_view.dart';
import '../modules/tanyajawab/bindings/tanyajawab_binding.dart';
import '../modules/tanyajawab/views/tanyajawab_view.dart';

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
    GetPage(
      name: _Paths.KELAS,
      page: () => KelasView(),
      binding: KelasBinding(),
    ),
    GetPage(
      name: _Paths.ROSTER,
      page: () => RosterView(),
      binding: RosterBinding(),
    ),
    GetPage(
      name: _Paths.ALLPENGUMUMAN,
      page: () => const AllpengumumanView(),
      binding: AllpengumumanBinding(),
    ),
    GetPage(
      name: _Paths.DETAILPENGUMUMAN,
      page: () => const DetailpengumumanView(),
      binding: DetailpengumumanBinding(),
    ),
    GetPage(
      name: _Paths.GURU,
      page: () => GuruView(),
      binding: GuruBinding(),
    ),
    GetPage(
      name: _Paths.TANYAJAWAB,
      page: () =>  TanyajawabView(),
      binding: TanyajawabBinding(),
    ),
  ];
}
