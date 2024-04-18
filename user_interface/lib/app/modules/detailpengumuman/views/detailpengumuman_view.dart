import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:timeago/timeago.dart' as timeago;
import '../controllers/detailpengumuman_controller.dart';
import 'package:flutter_html/flutter_html.dart';

class DetailpengumumanView extends GetView<DetailpengumumanController> {
  const DetailpengumumanView({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: const Color.fromARGB(255, 255, 255, 255),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              height: 120,
              width: 150,
              child: Image(image: AssetImage('assets/images/AppBar.png')),
            ),
            Text(
              'Detail',
              style: TextStyle(
                fontSize: 19,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: Obx(() {
        if (controller.pengumuman.isNotEmpty) {
          var createdAt =
              DateTime.parse(controller.pengumuman['data']['Created_At']);
          var timeAgo = timeago.format(createdAt, locale: 'id');

          return SingleChildScrollView(
            child: Column(
              children: [
                if (controller.pengumuman['data']['urlphoto'] != null)
                  Container(
                    height: 220,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(1), // Add border radius
                      boxShadow: [ // Add box shadow
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.5),
                          spreadRadius: 5,
                          blurRadius: 7,
                          offset: Offset(0, 3),
                        ),
                      ],
                      image: DecorationImage(
                        image: NetworkImage(
                          Uri.encodeFull(controller.pengumuman['data']['urlphoto']),
                        ),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                if (controller.pengumuman['data']['judul'] != null)
                  Padding(
                    padding: const EdgeInsets.only(left: 10.0), // Add left margin here
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Flexible(
                          child: Column(
                            children: [
                              Text(
                                controller.pengumuman['data']['judul'],
                                style: TextStyle(
                                  fontSize: 27, // Increase the font size
                                  color: Color.fromARGB(255, 89, 89, 131), // Change the font color
                                  fontFamily: 'Roboto', // Change the font family
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                Row(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.only(left: 10.0, right: 5.0),
                      child: Icon(
                        Icons.access_time,
                        color: Colors.indigo,
                        size: 20.0, // A
                      ),
                    ),

                    // Changed color to a darker shade of blue
                    SizedBox(width: 6), // Space between icon and text
                    Text.rich(
                      TextSpan(
                          text: timeAgo,
                          style: TextStyle(
                              color: Colors
                                  .deepOrange, // Changed color to a vibrant orange
                              fontSize: 16)),
                    ),
                  ],
                ),
                if (controller.pengumuman['data']['isi'] != null)
                  Padding(
                    padding: const EdgeInsets.all(5.0),
                    child: Html(
                      data: controller.pengumuman['data']['isi'],
                      style: {
                        "body": Style(fontSize: FontSize(20.0)),
                      },
                    ),
                  ),
              ],
            ),
          );
        } else {
          return Center(child: CircularProgressIndicator());
        }
      }),
    );
  }
}
