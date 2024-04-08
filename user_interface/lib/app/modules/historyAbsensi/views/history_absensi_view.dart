import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../controllers/history_absensi_controller.dart';

class HistoryAbsensiView extends GetView<HistoryAbsensiController> {
  const HistoryAbsensiView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('List Of Presence'),
        centerTitle: true,
      ),
      body: const Center(
        child: Text(
          'HistoryAbsensiView is working',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
