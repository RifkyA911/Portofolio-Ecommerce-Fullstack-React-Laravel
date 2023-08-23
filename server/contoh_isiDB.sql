-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2023 at 10:17 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Dumping data for table `admins`
--
-- PASSWORD ADMIN : 123456789
INSERT INTO `admins` (`id`, `username`, `email`, `pw`, `role`, `pict`, `created_at`, `updated_at`) VALUES
(1, 'super duper admin', 'superduper.admin@gmail.com', '$2y$10$DzVgyrl2BndjR4vYilGK.OfmEPvKYLCENoglRmhF3vFetsSOEPhN.', 0, NULL, '2023-08-23 08:17:26', '2023-08-23 08:17:26'),
(2, 'admin 1', 'admin.satu@gmail.com', '$2y$10$ucApZW4Gwv9JS42Cy54CA.Z0N35Ett41EI1yGbQK/h.S5Oziey4Ia', 1, NULL, '2023-08-23 08:19:54', '2023-08-23 08:19:54');

-- --------------------------------------------------------


-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `price`, `stock`, `discount`, `pict`, `description`, `created_at`, `updated_at`) VALUES
(1, 'topi merah', 'topi', 20000, 5, NULL, NULL, NULL, '2023-08-23 08:00:59', '2023-08-23 09:00:00');

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `adm_id`, `products_id`, `total_price`, `checked_out`, `sent`, `done`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '[\'1\'=>\'3\']', 60000, '2023-08-20 19:07:32', NULL, NULL, '2023-08-23 08:04:39', '2023-08-23 08:04:40');

--
-- Dumping data for table `users`
--
-- PASSWORD USER : bogeng
INSERT INTO `users` (`id`, `email`, `username`, `password`, `address`, `verified`, `pict`, `created_at`, `updated_at`) VALUES
(1, 'bogeng@gmail.com', 'bogeng', '$2y$10$dO4VrAPj.HDo4ZSKZwEckeLOYwKqp/uJD8ZgMIzXHIZBVwuzkb7/6', 'malang', NULL, 'bogeng.jpg', '2023-08-23 00:55:00', '2023-08-23 00:55:00');
