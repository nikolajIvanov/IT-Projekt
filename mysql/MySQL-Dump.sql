CREATE DATABASE IF NOT EXISTS `test-bank` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `test-bank`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int(11) NOT NULL DEFAULT '0',
    `name` varchar(128) NOT NULL DEFAULT '',
    `email` varchar(128) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
)