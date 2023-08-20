CREATE TABLE `admins` (
  `id` integer PRIMARY KEY,
  `username` varchar(255),
  `email` varchar(255),
  `pw` varchar(255),
  `role` integer COMMENT 'idk yet :v',
  `pict` varchar(255)
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `email` varchar(255),
  `username` varchar(255),
  `pw` varchar(255),
  `address` varchar(255),
  `pict` varchar(255)
);

CREATE TABLE `products` (
  `product_id` integer PRIMARY KEY,
  `name` varchar(255),
  `category` varchar(255),
  `price` varchar(255),
  `stock` integer,
  `discount` varchar(255),
  `picture` varchar(255)
);

CREATE TABLE `transaction` (
  `trans_id` integer PRIMARY KEY,
  `user_id` integer,
  `adm_id` integer,
  `product_ids` varchar(255) COMMENT 'Could be more than 1 id, the shape of assoc array with product id as key and number as value',
  `total_price` varchar(255),
  `checked_out` timestamp COMMENT 'default value : null; if done change value to timestamp',
  `sent` timestamp COMMENT 'same rule as checked_out',
  `done` timestamp COMMENT 'same rule as checked_out'
);

CREATE TABLE `basket` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `adm_id` integer,
  `product_id` integer COMMENT 'just 1 product per row',
  `count` integer COMMENT 'amount of product'
);

ALTER TABLE `transaction` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `transaction` ADD FOREIGN KEY (`adm_id`) REFERENCES `admins` (`id`);

ALTER TABLE `transaction` ADD FOREIGN KEY (`product_ids`) REFERENCES `products` (`product_id`);

ALTER TABLE `basket` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `basket` ADD FOREIGN KEY (`adm_id`) REFERENCES `admins` (`id`);

ALTER TABLE `basket` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
