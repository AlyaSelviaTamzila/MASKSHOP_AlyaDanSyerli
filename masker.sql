-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 23 Mar 2020 pada 07.29
-- Versi server: 10.1.36-MariaDB
-- Versi PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `masker`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `accounts`
--

CREATE TABLE `accounts` (
  `id` int(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`) VALUES
(1, 'alya', 'alya'),
(2, 'syerli', 'syerli');

-- --------------------------------------------------------

--
-- Struktur dari tabel `maskshop`
--

CREATE TABLE `maskshop` (
  `id` int(11) NOT NULL,
  `nama_masker` varchar(255) NOT NULL,
  `jenis_masker` varchar(255) NOT NULL,
  `harga` int(255) NOT NULL,
  `stock` int(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `maskshop`
--

INSERT INTO `maskshop` (`id`, `nama_masker`, `jenis_masker`, `harga`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'Garnier Mask', 'Sheet Mask', 18000, 4, '2020-03-02 07:34:26', '0000-00-00 00:00:00'),
(2, 'Hanasui Egg Whte', 'Peel Off Mask', 10500, 10, '2020-03-02 06:20:50', '0000-00-00 00:00:00'),
(3, 'Sariayu Putih Langsat', 'Peel Off Mask', 31500, 9, '2020-03-02 06:20:50', '0000-00-00 00:00:00'),
(4, 'Ariul 7 Days Mask', 'Sheet Mask', 19000, 8, '2020-03-02 06:20:50', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `username` varchar(225) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'acis', 'acis', '2020-03-02 06:50:42', '0000-00-00 00:00:00'),
(2, 'elly', 'elly', '2020-03-02 06:51:01', '0000-00-00 00:00:00'),
(3, 'lili', 'lili', '2020-03-06 14:26:55', '0000-00-00 00:00:00'),
(4, 'lili', 'lili', '2020-03-06 14:27:47', '0000-00-00 00:00:00'),
(5, 'lala', 'lala', '2020-03-06 14:31:11', '0000-00-00 00:00:00'),
(6, 'yeye', 'yeye', '2020-03-06 14:41:20', '0000-00-00 00:00:00'),
(7, 'yeye', 'yeye', '2020-03-06 14:43:17', '0000-00-00 00:00:00'),
(8, 'yeye', 'yeye', '2020-03-06 14:43:33', '0000-00-00 00:00:00'),
(9, 'yeye', 'yeye', '2020-03-06 14:45:30', '0000-00-00 00:00:00'),
(10, 'yeye', 'yeye', '2020-03-06 14:46:04', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_mask`
--

CREATE TABLE `user_mask` (
  `id` int(250) NOT NULL,
  `user_id` int(255) NOT NULL,
  `mask_id` int(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user_mask`
--

INSERT INTO `user_mask` (`id`, `user_id`, `mask_id`, `created_at`) VALUES
(1, 1, 1, '2020-03-02 07:34:26');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `maskshop`
--
ALTER TABLE `maskshop`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_mask`
--
ALTER TABLE `user_mask`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `maskshop`
--
ALTER TABLE `maskshop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `user_mask`
--
ALTER TABLE `user_mask`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
