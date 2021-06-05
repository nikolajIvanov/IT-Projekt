CREATE DATABASE IF NOT EXISTS `TeamUP` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `TeamUP`;

DROP TABLE IF EXISTS `userInLerngruppe`;
DROP TABLE IF EXISTS `adminInLerngruppe`;
DROP TABLE IF EXISTS `lerngruppeInModul`;
DROP TABLE IF EXISTS `userInModul`;
DROP TABLE IF EXISTS `lerngruppe`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `modulInStudiengang`;
DROP TABLE IF EXISTS `modul`;
DROP TABLE IF EXISTS `lerntyp`;
DROP TABLE IF EXISTS `studiengang`;


CREATE TABLE `modul` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `bezeichnung` varchar(128) NOT NULL DEFAULT ''
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
     /* Geburtstag muss gesetzt werden im FROTNEND deswegen müssen wir im BE kein Default definieren */
    `geburtsdatum` DATE NOT NULL DEFAULT '01.01.1900',
    `email` varchar(128) NOT NULL DEFAULT '',
    `beschreibung` varchar(128) NOT NULL DEFAULT '',
    `lerntyp` varchar(128) NOT NULL DEFAULT '',
    `gender` varchar(128) NOT NULL DEFAULT '',
    `semester` int(11) NOT NULL ,
    `studiengang` varchar(128) NOT NULL DEFAULT ''

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
    `lerntyp` varchar(128) NOT NULL DEFAULT 999,
    `admin` varchar(128) NOT NULL DEFAULT '',
    `beschreibung` varchar(128) NOT NULL DEFAULT ''
);

CREATE TABLE `userInLerngruppe`
(
    `userId`       int(11) NOT NULL,
    `lerngruppeId` int(11) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (lerngruppeId) REFERENCES lerngruppe (id),
    PRIMARY KEY (userId, lerngruppeId)
);

CREATE TABLE `lerngruppeInModul`
(
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

CREATE TABLE `modulInStudiengang`
(
    `studiengangId`  int(11) NOT NULL,
    `modulId`       int(11) NOT NULL,
    FOREIGN KEY (studiengangId) REFERENCES studiengang (id),
    FOREIGN KEY (modulId) REFERENCES modul (id),
    PRIMARY KEY (studiengangId, modulId)
);

CREATE TABLE `lerntyp` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `bild` MEDIUMBLOB NOT NULL ,
    `typ` varchar(128) NOT NULL DEFAULT '',
    `beschreibung` varchar(3000) NOT NULL DEFAULT ''
);