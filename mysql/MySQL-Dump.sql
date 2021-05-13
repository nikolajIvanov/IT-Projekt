CREATE DATABASE IF NOT EXISTS `Team UP` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Team UP`;

--
-- Tabelenstruktur für die Tabelle `users
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `timeStamp` TIMESTAMP NOT NULL DEFAULT '',
    `googleId` varchar(128) NOT NULL DEFAULT '',
    `bild` blob NOT NULL DEFAULT '',
    `name` varchar(128) NOT NULL DEFAULT '',
    `geburtsdatum` DATE NOT NULL DEFAULT '',
    `email` varchar(128) NOT NULL DEFAULT '',
    `beschreibung` varchar(128) NOT NULL DEFAULT '',
    `lerntypId` int(11) NOT NULL DEFAULT '',
    FOREIGN KEY (lerntypId) REFERENCES lerntyp (id)
 );



DROP TABLE IF EXISTS `lerntyp`;
CREATE TABLE `lerntyp` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `typ` varchar(128) NOT NULL DEFAULT ''
);

DROP TABLE IF EXISTS `modul`;
CREATE TABLE `modul` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `bezeichnung` varchar(128) NOT NULL DEFAULT ''
);

DROP TABLE IF EXISTS `userInModul`;
CREATE TABLE `userInModul` (
    `userId` int(11) NOT NULL PRIMARY KEY ,
    `modulId` int(11) NOT NULL PRIMARY KEY ,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (modulId) REFERENCES modul (id)

);
--
-- Testdaten für die Tabelle `users
--
-- LOCK TABLES `users` WRITE;
-- /*!40000 ALTER TABLE `users` DISABLE KEYS */;
-- INSERT INTO `users` VALUES (1,'Benito-Miguel Schwankhart','benito@miguel.de'),
--                           (2,'Nikolaj Ivanov','nikolaj@ivanov.de'),
--                           (3,'Ardit Fazliu','ardit@fazliu.de'),
--                           (4,'Christian Schoeller','crypto_chris@schoeller.de'),
--                           (5,'Christopher Segatz','papa@segatz.de');
-- /*!40000 ALTER TABLE `users` ENABLE KEYS */;
-- UNLOCK TABLES;