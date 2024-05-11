-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Bulan Mei 2024 pada 06.45
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parmaksianschool`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `absensis`
--

CREATE TABLE `absensis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `tanggal` longtext DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `status` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `absensis`
--

INSERT INTO `absensis` (`id`, `user_id`, `tanggal`, `latitude`, `longitude`, `status`) VALUES
(1, 1, '2024-05-09T23:59:00+07:00', 0, 0, 'Absen');

-- --------------------------------------------------------

--
-- Struktur dari tabel `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` longtext DEFAULT NULL,
  `password` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(1, 'admin', 0x2432612431302472523937306a6c74564c373555315a5a576b576f5375316559337668377567305736636d4b4741412f4f2f627a6b31493233763665);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_kelas` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id`, `nama_kelas`) VALUES
(1, 'X IPA 1'),
(2, 'X IPS 1'),
(3, 'XI IPA 1'),
(4, 'XI IPS 1'),
(5, 'XII IPA 1'),
(6, 'XII IPS 1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengajars`
--

CREATE TABLE `pengajars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `NIP` bigint(20) DEFAULT NULL,
  `nama_depan` longtext DEFAULT NULL,
  `nama_belakang` longtext DEFAULT NULL,
  `bidang` longtext DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `alamat` longtext DEFAULT NULL,
  `agama` longtext DEFAULT NULL,
  `tanggal_lahir` longtext DEFAULT NULL,
  `jenis_kelamin` longtext DEFAULT NULL,
  `urlphoto` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengajars`
--

INSERT INTO `pengajars` (`id`, `NIP`, `nama_depan`, `nama_belakang`, `bidang`, `email`, `alamat`, `agama`, `tanggal_lahir`, `jenis_kelamin`, `urlphoto`) VALUES
(1, 87654321, 'guru', 'guru', 'Matematika', 'guru@gmail.com', 'guru', 'Kristen Protestan', '1993-11-23', 'Lainnya', 'http://localhost:5000/api/pengajar/uploads/pengajar/notion_10.png'),
(2, 12321232, 'guru2', 'guru2', 'Matematika', 'guru2@gmail.con', 'guru2', 'Islam', '2024-05-08', 'Perempuan', 'http://localhost:5000/api/pengajar/uploads/pengajar/memo_4.png'),
(3, 2321232, 'guru3', 'guru3', 'Bahasa Indonesia', 'guru3@gmail.com', 'guru3', 'Kristen Protestan', '1992-12-31', 'Laki-Laki', 'http://localhost:5000/api/pengajar/uploads/pengajar/memo_1.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengumumen`
--

CREATE TABLE `pengumumen` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(100) NOT NULL,
  `urlphoto` longtext DEFAULT NULL,
  `isi` longtext DEFAULT NULL,
  `created_at` longtext DEFAULT NULL,
  `updated_at` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengumumen`
--

INSERT INTO `pengumumen` (`id`, `judul`, `urlphoto`, `isi`, `created_at`, `updated_at`) VALUES
(1, 'kjk', 'http://localhost:5000/api/pengumuman/uploads/pengumuman/Sabun Cuci Piring.jfif', '<p>nnmm</p>', '2024-05-10T00:04:26+07:00', '2024-05-10T00:04:26+07:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `rosters`
--

CREATE TABLE `rosters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `mata_pelajaran` longtext NOT NULL,
  `waktu_mulai` longtext NOT NULL,
  `waktu_selesai` longtext NOT NULL,
  `kelas_id` bigint(20) UNSIGNED DEFAULT NULL,
  `hari` longtext NOT NULL,
  `pengajar_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `rosters`
--

INSERT INTO `rosters` (`id`, `mata_pelajaran`, `waktu_mulai`, `waktu_selesai`, `kelas_id`, `hari`, `pengajar_id`) VALUES
(1, 'Matematika', '23:48', '14:45', 2, 'Jumat', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tanya_jawabs`
--

CREATE TABLE `tanya_jawabs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pertanyaan` longtext DEFAULT NULL,
  `jawaban` longtext DEFAULT NULL,
  `tanggal_tanya` longtext DEFAULT NULL,
  `tanggal_jawab` longtext DEFAULT NULL,
  `admin_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tanya_jawabs`
--

INSERT INTO `tanya_jawabs` (`id`, `pertanyaan`, `jawaban`, `tanggal_tanya`, `tanggal_jawab`, `admin_id`, `user_id`) VALUES
(1, 'Apa Lauk?', '<p>jj</p>', '2024-05-10T00:05:28+07:00', '2024-05-10T00:05:55+07:00', 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nisn` bigint(20) DEFAULT NULL,
  `nama_depan` longtext DEFAULT NULL,
  `nama_belakang` longtext DEFAULT NULL,
  `kelas_id` bigint(20) UNSIGNED DEFAULT NULL,
  `agama` longtext DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `alamat` longtext DEFAULT NULL,
  `tanggal_lahir` longtext DEFAULT NULL,
  `jenis_kelamin` longtext DEFAULT NULL,
  `urlphoto` longtext DEFAULT NULL,
  `password` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nisn`, `nama_depan`, `nama_belakang`, `kelas_id`, `agama`, `email`, `alamat`, `tanggal_lahir`, `jenis_kelamin`, `urlphoto`, `password`) VALUES
(1, 12345678, 'siswa', 'siswa', 1, 'Kristen Protestan', 'siswa@gmail.com', 'siswa', '2000-12-24', 'Lainnya', 'http://localhost:5000/api/siswa/uploads/siswa/toon_9.png', 0x24326124313424394b506d4d4f693844617a58345153545457517a6d2e4f506b6d42466e376e38326f6a58346d4330503566504d5a4778366e507657),
(2, 72443776, 'AHMAD HUSIN', 'SITORUS', 4, 'Islam', 'ahmad@gmail.com', 'TANGGA BATU II', '2007-03-28', 'Laki-Laki', 'http://localhost:5000/api/siswa/uploads/siswa/sdlc.png', 0x243261243134244553334e31687243644b506d6e6764796539437748754e2e4e476b38416261724f503555724a636761774a3068457043434972584f);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `absensis`
--
ALTER TABLE `absensis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_absensis` (`user_id`);

--
-- Indeks untuk tabel `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pengajars`
--
ALTER TABLE `pengajars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uni_pengajars_n_ip` (`NIP`),
  ADD UNIQUE KEY `uni_pengajars_email` (`email`);

--
-- Indeks untuk tabel `pengumumen`
--
ALTER TABLE `pengumumen`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `rosters`
--
ALTER TABLE `rosters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pengajars_rosters` (`pengajar_id`),
  ADD KEY `fk_kelas_rosters` (`kelas_id`);

--
-- Indeks untuk tabel `tanya_jawabs`
--
ALTER TABLE `tanya_jawabs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_tanya_jawabs` (`user_id`),
  ADD KEY `fk_admins_tanya_jawab` (`admin_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uni_users_nisn` (`nisn`),
  ADD UNIQUE KEY `uni_users_email` (`email`),
  ADD KEY `fk_kelas_users` (`kelas_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `absensis`
--
ALTER TABLE `absensis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `pengajars`
--
ALTER TABLE `pengajars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `pengumumen`
--
ALTER TABLE `pengumumen`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `rosters`
--
ALTER TABLE `rosters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `tanya_jawabs`
--
ALTER TABLE `tanya_jawabs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `absensis`
--
ALTER TABLE `absensis`
  ADD CONSTRAINT `fk_users_absensis` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `rosters`
--
ALTER TABLE `rosters`
  ADD CONSTRAINT `fk_kelas_rosters` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`),
  ADD CONSTRAINT `fk_pengajars_rosters` FOREIGN KEY (`pengajar_id`) REFERENCES `pengajars` (`id`);

--
-- Ketidakleluasaan untuk tabel `tanya_jawabs`
--
ALTER TABLE `tanya_jawabs`
  ADD CONSTRAINT `fk_admins_tanya_jawab` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`),
  ADD CONSTRAINT `fk_users_tanya_jawabs` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_kelas_users` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
