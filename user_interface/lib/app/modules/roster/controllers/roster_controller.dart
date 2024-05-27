// FILE:ROSTER_CONTROLLER.DART
import 'package:get/get.dart';
import 'dart:convert';
import 'package:user_interface/configapi.dart';
import 'package:get_storage/get_storage.dart';

class RosterController extends GetxController {
  final GetConnect getConnect = GetConnect();

  Future<List<dynamic>> fetchRostersByKelasId() async {
    Map<String, dynamic> user = GetStorage().read('user');
    String id = user['kelas_id'].toString();

    final response = await getConnect.get(
      '${ConfigAPI.baseUrl}api/roster/kelas/$id',
      query: {
        'user_id': [user['ID'].toString()],
      },
    );

    if (response.status.code! >= 200 && response.status.code! < 300) {
      if (response.bodyString != null) {
        List<dynamic> responseBody = json.decode(response.bodyString!);
        return responseBody;
      }
    } else {
      throw Exception('Failed to load rosters');
    }

    return []; // Return an empty list if there's no data
  }
}
