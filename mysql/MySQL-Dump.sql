CREATE DATABASE IF NOT EXISTS `test-bank` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `test-bank`;

--
-- Tabelenstruktur für die Tabelle `users
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int(11) NOT NULL DEFAULT '0',
    `name` varchar(128) NOT NULL DEFAULT '',
    `email` varchar(128) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
);

--
-- Testdaten für die Tabelle `users
--
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Benito-Miguel Schwankhart','benito@miguel.de'),
                           (2,'Nikolaj Ivanov','nikolaj@ivanov.de'),
                           (3,'Ardit Fazliu','ardit@fazliu.de'),
                           (4,'Christian Schoeller','crypto_chris@schoeller.de'),
                           (5,'Christopher Segatz','papa@segatz.de');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;