-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2022 at 05:08 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testvmo`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name_products` varchar(100) NOT NULL,
  `pic_products` varchar(255) NOT NULL,
  `price_products` float NOT NULL,
  `stock_products` int(10) NOT NULL,
  `sell_products` int(10) NOT NULL,
  `date_products` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `bbf_products` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name_products`, `pic_products`, `price_products`, `stock_products`, `sell_products`, `date_products`, `bbf_products`) VALUES
(1, 'milk', 'https://www.healthmedelivery.com/wp-content/uploads/2021/02/16271d639def2742577dde164f2a6cec.jpg', 12, 0, 1, '2022-05-08 14:44:21', '2022-07-13'),
(2, 'tea', 'https://beercastleny.com/wp-content/uploads/2017/11/Arizona-Sweet-Tea-Can-23-fl-oz-1-ct.jpg', 20, 17, 7, '2022-05-08 15:06:56', '2022-07-13'),
(3, 'coffee', 'https://static.wixstatic.com/media/74e890_67af9aabe67a4741b0ba1f00afe210a9~mv2.png/v1/fill/w_2251,h_2250,al_c/74e890_67af9aabe67a4741b0ba1f00afe210a9~mv2.png', 25, 16, 12, '2022-05-08 15:01:12', '2022-08-24'),
(4, 'milk tea', 'https://www.seingayhar.com/image/cache/catalog/Product/och-1000x1000.jpg', 20, 18, 2, '2022-05-08 15:08:03', '2022-08-24'),
(5, 'snack', 'https://cf.shopee.co.th/file/932feecf81df6eee9c7a004ac1dae58f', 20, 20, 0, '2022-05-08 14:32:33', '2022-09-22'),
(6, 'chocolate', 'https://d12man5gwydfvl.cloudfront.net/wp-content/uploads/2021/02/HappyFresh-Ritter-Sport-Alpine-Milk-Chocolate.jpg', 35, 20, 3, '2022-05-08 14:44:01', '2022-11-08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
