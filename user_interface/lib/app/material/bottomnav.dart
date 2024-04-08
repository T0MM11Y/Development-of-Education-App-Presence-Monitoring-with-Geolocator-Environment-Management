// File: bottom_navigation_bar.dart
import 'package:flutter/material.dart';
import 'package:convex_bottom_bar/convex_bottom_bar.dart';

typedef OnTapCallback = Future<void> Function(int index);

class CustomBottomNavigationBar extends StatelessWidget {
  final OnTapCallback onTap;
  final int initialActiveIndex;

  CustomBottomNavigationBar({required this.onTap, this.initialActiveIndex = 2});

  @override
  Widget build(BuildContext context) {
    return ConvexAppBar(
      style: TabStyle.fixedCircle,
      items: [
        TabItem(icon: Icons.home, title: 'Home'),
        TabItem(icon: Icons.fingerprint, title: 'Absensi'),
        TabItem(icon: Icons.people, title: 'Profile'),
      ],
      initialActiveIndex: initialActiveIndex,
      onTap: onTap,
    );
  }
}