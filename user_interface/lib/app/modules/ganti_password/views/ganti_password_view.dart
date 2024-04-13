import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/ganti_password_controller.dart';

class GantiPasswordView extends StatefulWidget {
  const GantiPasswordView({Key? key}) : super(key: key);

  @override
  _GantiPasswordViewState createState() => _GantiPasswordViewState();
}

class _GantiPasswordViewState extends State<GantiPasswordView> {
  final GantiPasswordController controller = Get.find();
  bool _obscureTextOld = true;
  bool _obscureTextNew = true;
  bool _obscureTextConfirm = true;

  void _togglePasswordVisibilityOld() {
    setState(() {
      _obscureTextOld = !_obscureTextOld;
    });
  }

  void _togglePasswordVisibilityNew() {
    setState(() {
      _obscureTextNew = !_obscureTextNew;
    });
  }

  void _togglePasswordVisibilityConfirm() {
    setState(() {
      _obscureTextConfirm = !_obscureTextConfirm;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Change Password'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding:
              const EdgeInsets.only(left: 40, right: 40, top: 46, bottom: 20),
          child: Column(
            children: <Widget>[
              SizedBox(
                  height:
                      1), // Add some space between the AppBar and the TextField(s
              TextField(
                controller: controller.oldPasswordController,
                obscureText: _obscureTextOld,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Old Password',
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscureTextOld ? Icons.visibility : Icons.visibility_off,
                    ),
                    onPressed: _togglePasswordVisibilityOld,
                  ),
                ),
              ),
              SizedBox(height: 30),
              TextField(
                controller: controller.newPasswordController,
                obscureText: _obscureTextNew,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'New Password',
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscureTextNew ? Icons.visibility : Icons.visibility_off,
                    ),
                    onPressed: _togglePasswordVisibilityNew,
                  ),
                ),
              ),
              SizedBox(height: 10),
              TextField(
                controller: controller.confirmPasswordController,
                obscureText: _obscureTextConfirm,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Confirm Password',
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscureTextConfirm
                          ? Icons.visibility
                          : Icons.visibility_off,
                    ),
                    onPressed: _togglePasswordVisibilityConfirm,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(23.0),
                child: Container(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Colors.blue[700],
                      onPrimary: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        side: BorderSide(color: Colors.blue[500]!),
                      ),
                    ),
                    onPressed: () {
                      controller.changePassword();
                    },
                    child: Text(
                      "Change Password".toUpperCase(),
                      style: TextStyle(fontSize: 14),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
