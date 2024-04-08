import 'package:flutter/material.dart';

class CustomTextFormField extends StatelessWidget {
  final String labelText;
  final IconData prefixIcon;
  final String initialValue;
  final bool readOnly;

  CustomTextFormField({
    required this.labelText,
    required this.prefixIcon,
    required this.initialValue,
    this.readOnly = true,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 40.0), // Add horizontal margins
      child: Row(
        children: [
          Icon(
            prefixIcon, // Place the icon outside the TextFormField
            color: Color.fromARGB(255, 102, 181, 241),
            size: 30.0, // Increase the size
          ),
          SizedBox(
              width:
                  10.0), // Add some space between the icon and the TextFormField
          Expanded(
            child: TextFormField(
              initialValue: initialValue,
              readOnly: readOnly,
              style: TextStyle(fontSize: 21, fontFamily: 'incosolata '),
              decoration: InputDecoration(
                labelText: labelText,
                border: OutlineInputBorder(
                  borderRadius:
                      BorderRadius.circular(0.0), // Make the field rectangular
                ),
                fillColor: Color.fromARGB(255, 236, 242, 248),
                filled: true,
                contentPadding:
                    EdgeInsets.only(left: 10.0, right: 10.0), // Add padding
              ),
            ),
          ),
        ],
      ),
    );
  }
}
