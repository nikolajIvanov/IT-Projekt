CREATE DATABASE IF NOT EXISTS `TeamUP` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `TeamUP`;

DROP TABLE IF EXISTS `userInLerngruppe`;
DROP TABLE IF EXISTS `lerngruppeInModul`;
DROP TABLE IF EXISTS `userInModul`;
DROP TABLE IF EXISTS `userInRoom`;
DROP TABLE IF EXISTS `message`;
DROP TABLE IF EXISTS `room`;
DROP TABLE IF EXISTS `gruppeAdmitted`;
DROP TABLE IF EXISTS `lerntyp`;
DROP TABLE IF EXISTS `lerngruppe`;
DROP TABLE IF EXISTS `modulInStudiengang`;
DROP TABLE IF EXISTS `modul`;
DROP TABLE IF EXISTS `studiengang`;
DROP TABLE IF EXISTS `userAdmitted`;
DROP TABLE IF EXISTS `users`;



CREATE TABLE `modul` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `studienart` varchar(128) NOT NULL DEFAULT '',
    `wahl/pflicht` varchar(128) NOT NULL DEFAULT '',
    `edv-nr` int(11) NOT NULL ,
    `bezeichnung` varchar(128) NOT NULL DEFAULT ''
);

CREATE TABLE `lerntyp` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `bild` MEDIUMBLOB NOT NULL ,
    `typ` varchar(128) NOT NULL DEFAULT '',
    `beschreibung` varchar(3000) NOT NULL DEFAULT ''
);

--
-- Tabellenstruktur für die Tabelle `users
--
CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `timeStamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `authId` varchar(128) NOT NULL DEFAULT '',
    /*Niko schaut sich Blob an für Bild*/
    `bild` LONGBLOB NOT NULL ,
    `name` varchar(128) NOT NULL DEFAULT '',
    `vorname` varchar(128) NOT NULL DEFAULT '',
    `geburtsdatum` DATE NOT NULL,
    `email` varchar(128) NOT NULL DEFAULT '',
    `beschreibung` varchar(128) NOT NULL DEFAULT '',
    `lerntyp` int(11) NOT NULL DEFAULT 999,
    `gender` varchar(128) NOT NULL DEFAULT '',
    `semester` int(11) NOT NULL ,
    `studiengang` varchar(128) NOT NULL DEFAULT '',
    `frequenz` varchar(128) NOT NULL DEFAULT '',
    `lernort` varchar(128) NOT NULL DEFAULT '',
    FOREIGN KEY (lerntyp) REFERENCES lerntyp (id)
 );

CREATE TABLE `userInModul` (
    `userId` int(11) NOT NULL,
    `modulId` int(11) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (modulId) REFERENCES modul (id),
    PRIMARY KEY (userId, modulId)
);



CREATE TABLE `lerngruppe` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `timeStamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `bild` LONGBLOB NOT NULL,
    `name` varchar(128) NOT NULL DEFAULT '',
    `lerntyp` int(11) NOT NULL DEFAULT 999,
    `admin` int(11) NOT NULL,
    `beschreibung` varchar(128) NOT NULL DEFAULT '',
    `frequenz` varchar(128) NOT NULL DEFAULT '',
    `lernort` varchar(128) NOT NULL DEFAULT '',
    FOREIGN KEY (admin) REFERENCES users (id),
    FOREIGN KEY (lerntyp) REFERENCES lerntyp (id)
);

CREATE TABLE `room` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `TIMESTAMP` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `groupId` int(11),
    FOREIGN KEY (groupId) REFERENCES lerngruppe (id)
);

CREATE TABLE `userInLerngruppe` (
    `userId`       int(11) NOT NULL,
    `lerngruppeId` int(11) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (lerngruppeId) REFERENCES lerngruppe (id),
    PRIMARY KEY (userId, lerngruppeId)
);

CREATE TABLE `lerngruppeInModul` (
    `lerngruppeId`  int(11) NOT NULL,
    `modulId`       int(11) NOT NULL,
    FOREIGN KEY (lerngruppeId) REFERENCES lerngruppe (id),
    FOREIGN KEY (modulId) REFERENCES modul (id),
    PRIMARY KEY (lerngruppeId, modulId)
);

CREATE TABLE `studiengang` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `studiengang` varchar(128) NOT NULL DEFAULT ''
);

CREATE TABLE `modulInStudiengang` (
    `studiengangId`  int(11) NOT NULL,
    `modulId`       int(11) NOT NULL,
    FOREIGN KEY (studiengangId) REFERENCES studiengang (id),
    FOREIGN KEY (modulId) REFERENCES modul (id),
    PRIMARY KEY (studiengangId, modulId)
);


CREATE TABLE `message` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `TIMESTAMP` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `vonUserId`int(11) NOT NULL,
    `roomId`int(11) NOT NULL,
    `message`varchar(128) NOT NULL DEFAULT '',
    FOREIGN KEY (VonuserId) REFERENCES users (id),
    FOREIGN KEY (roomId) REFERENCES room (id)
);

CREATE TABLE `userInRoom` (
    `userId` int(11) NOT NULL,
    `roomId` int(11) NOT NULL,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (roomId) REFERENCES room (id),
    PRIMARY KEY (userId, roomId)
);
CREATE TABLE `userAdmitted` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `vonUserid` int(11) NOT NULL,
    `anUserid` int(11) NOT NULL,
    FOREIGN KEY (anUserid) REFERENCES users (id),
    FOREIGN KEY (vonUserid) REFERENCES users (id)
);

CREATE TABLE `gruppeAdmitted` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `vonUserid` int(11) NOT NULL,
    `anGruppenid` int(11) NOT NULL,
    FOREIGN KEY (vonUserid) REFERENCES users (id),
    FOREIGN KEY (anGruppenid) REFERENCES lerngruppe (id)
);