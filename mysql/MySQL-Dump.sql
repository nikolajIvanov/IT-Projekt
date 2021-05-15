CREATE DATABASE IF NOT EXISTS `TeamUP` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `TeamUP`;

--
-- Tabelenstruktur für die Tabelle `users
--
DROP TABLE IF EXISTS `userInModul`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `modul`;
DROP TABLE IF EXISTS `lerntyp`;


CREATE TABLE `lerntyp` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `typ` varchar(128) NOT NULL DEFAULT ''
);


CREATE TABLE `modul` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `bezeichnung` varchar(128) NOT NULL DEFAULT ''
);


CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `timeStamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `authId` varchar(128) NOT NULL DEFAULT '',
    `bild` varchar(128) NOT NULL DEFAULT '',
    `name` varchar(128) NOT NULL DEFAULT '',
    `geburtsdatum` DATE NOT NULL DEFAULT '01.01.1900',
    `email` varchar(128) NOT NULL DEFAULT '',
    `beschreibung` varchar(128) NOT NULL DEFAULT '',
    `lerntypId` int(11) NOT NULL DEFAULT 999,
     FOREIGN KEY (lerntypId) REFERENCES lerntyp (id)
 );


CREATE TABLE `userInModul` (
    `userId` int(11) NOT NULL,
    `modulId` int(11) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (modulId) REFERENCES modul (id),
    PRIMARY KEY (userId, modulId)

);