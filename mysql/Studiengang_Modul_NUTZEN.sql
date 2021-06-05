USE `TeamUP`;

INSERT INTO studiengang(studiengang) VALUES
    ('Audiovisuelle Medien'),
    ('Crossmedia-Redaktion/Public Relations'),
    ('Deutsch-chinesischer Studiengang Medien und Technologie'),
    ('Informationsdesign'),
    ('Infomationswissenschaften'),
    ('Integriertes Produktdesign'),
    ('Mediapublishing'),
    ('Medieninformatik'),
    ('Medienwirtschaft'),
    ('Mobile Medien'),
    ('Online-Medien-Management'),
    ('Print Media Technologies'),
    ('Verpackungstechnik'),
    ('Werbung & Marktkommunikation'),
    ('Wirtschaftsinformatik und digitale Medien'),
    ('Wirtschaftsingenieurwesen Medien');


INSERT INTO lerntyp(bild, typ, beschreibung) VALUES
    ('Bild1', 'Visuell', 'Der visuelle Lerntyp lernt am besten über das Sehen. Lesen, Anschauen und Beobachten sind für
    ihn die besten Möglichkeiten, um Informationen und Inhalte aufzunehmen. Bildliche Darstellungen, Schaubilder,
    Visualisierungen und grafisch strukturiertes Lernmaterial unterstützen seinen Lernprozess.'),
    ('Bild2', 'Auditiv', 'Hören ist der bevorzugte Wahrnehmungskanal des auditiven Lerntyps. Alles, was er akustisch
    wahrnimmt, kann er besonders gut verarbeiten. Vorträge, mündliche Erläuterungen, lautes Vorlesen und eigenes
    Verbalisieren helfen ihm beim Lernen.'),
    ('Bild3', 'Kommunikativ', 'Dieser Lerntyp lernt am besten über die Kommunikation und den Austausch mit anderen.
    Erklärungen, Fragen, eigene Vorträge und Diskussionen erzielen bei ihm die besten Lernergebnisse.'),
    ('Bild4', 'Motorisch', 'Der haptische Lerntyp lernt besonders gut über das Anfassen und eigenes praktisches Tun.
    Sein Lernerfolg ist am größten, wenn er Inhalte mit den Händen begreifen und selbst aktiv werden kann.
    Auch Bewegung hilft ihm beim Lernen.'),
    ('Bild5', 'Mischform', 'Du hast keinen eindeutigen Lerntyp und hast von allen etwas.');

INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (1, 'Grundstudium', 'Pflicht', 182315, 'Medienstandards und -Projektmanagement
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (2, 'Grundstudium', 'Pflicht', 182612, 'Künstliche Intelligenz/Digitalisierung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (3, 'Grundstudium', 'Pflicht', 182311, 'Rechnungslegung und Besteuerung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (4, 'Grundstudium', 'Pflicht', 182413, 'Projekt Medienproduktion
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (5, 'Grundstudium', 'Pflicht', 182312, 'Technik 2 (Maschinenelemente, Steuerungstechnik)
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (6, 'Grundstudium', 'Pflicht', 182410, 'Supply Chain Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (7, 'Grundstudium', 'Pflicht', 182318, 'Media Design: Consulting & Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (8, 'Grundstudium', 'Pflicht', 182320, 'Softwareentwicklung 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (9, 'Hauptstudium', 'Pflicht', 221020, 'Medientechnik
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (10, 'Grundstudium', 'Pflicht', 226000, 'Englisch Einstufungstest
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (11, 'Grundstudium', 'Pflicht', 226101, 'Studium Generale
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (12, 'Grundstudium', 'Pflicht', 226301, 'Textkompetenz
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (13, 'Grundstudium', 'Pflicht', 226401, 'Kommunikationswissenschaft
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (14, 'Grundstudium', 'Pflicht', 226501, 'Grundlagen PR
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (15, 'Grundstudium', 'Pflicht', 226201, 'Mediensysteme
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (16, 'Grundstudium', 'Pflicht', 226303, 'Crossmedia-Konzeption
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (17, 'Grundstudium', 'Pflicht', 226304, 'Lehrredaktion
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (18, 'Grundstudium', 'Pflicht', 226307, 'Web-Technologie und Datenkompetenz
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (19, 'Hauptstudium', 'Pflicht', 116312, 'Interaktion Packgut Packstoff Maschine
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (20, 'Hauptstudium', 'Pflicht', 116315, 'Verpackungsdesignprojekt 3D
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (21, 'Hauptstudium', 'Pflicht', 116314, 'Projektorganisation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (22, 'Hauptstudium', 'Pflicht', 116316, 'Grundlagen Logistik
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (23, 'Hauptstudium', 'Pflicht', 116415, 'Entwicklung von Verpackungssystemen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (24, 'Hauptstudium', 'Pflicht', 116410, 'Umwelt und Verpackung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (25, 'Hauptstudium', 'Pflicht', 116411, 'Druckverfahren und Veredelung 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (26, 'Hauptstudium', 'Pflicht', 116416, 'Verpackungslogistik
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (27, 'Hauptstudium', 'Wahlpflicht', 335070, 'Führungskompetenztraining
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (28, 'Hauptstudium', 'Wahlpflicht', 337047, 'Mobile Anwendungen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (29, 'Hauptstudium', 'Wahlpflicht', 337044, 'Trends im IT-Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (30, 'Hauptstudium', 'Wahlpflicht', 337045, 'IT Management Case Studies
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (31, 'Hauptstudium', 'Wahlpflicht', 337050, 'International Media Research
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (32, 'Hauptstudium', 'Wahlpflicht', 335098, 'Software-Visualisierung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (33, 'Hauptstudium', 'Wahlpflicht', 337064, 'Virtuelle Welten
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (34, 'Hauptstudium', 'Wahlpflicht', 337065, 'Interactive Storytelling
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (35, 'Hauptstudium', 'Wahlpflicht', 337066, 'Game Design
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (36, 'Hauptstudium', 'Wahlpflicht', 334040, 'Infografik
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (37, 'Hauptstudium', 'Wahlpflicht', 332519, 'Praktisches Studiensemester
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (38, 'Hauptstudium', 'Wahlpflicht', 332550, 'Fachinformation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (39, 'Hauptstudium', 'Wahlpflicht', 332551, 'Vertiefung zur Formalerschließung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (40, 'Hauptstudium', 'Wahlpflicht', 332552, 'Vertiefung zur inhaltlichen Erschließung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (41, 'Hauptstudium', 'Wahlpflicht', 332553, 'Besondere Institutionen, Zielgruppen und Dienstleistungen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (42, 'Hauptstudium', 'Wahlpflicht', 332554, 'Sonderbestände
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (43, 'Hauptstudium', 'Wahlpflicht', 332555, 'Musik, Musikalien und Musikinformation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (44, 'Hauptstudium', 'Wahlpflicht', 332556, 'Lizenzmanagement u. Marketing von E-Ressourcen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (45, 'Hauptstudium', 'Wahlpflicht', 332557, 'Net Communities und Citizen Science
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (46, 'Hauptstudium', 'Wahlpflicht', 332558, 'Service Monitoring und Evaluation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (47, 'Hauptstudium', 'Wahlpflicht', 332559, 'Standardsoftware in Kultureinrichtungen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (48, 'Hauptstudium', 'Wahlpflicht', 332560, 'Bildungslandschaften
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (49, 'Hauptstudium', 'Wahlpflicht', 332561, 'Wissens- und Dokumentenmanagement
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (50, 'Hauptstudium', 'Wahlpflicht', 332562, 'Managementinstrumente in Bibliotheken, Kultur- und Bildungseinrichtungen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (51, 'Hauptstudium', 'Pflicht', 114331, 'Presse-Projekt
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (52, 'Hauptstudium', 'Pflicht', 114400, 'Bachelor-Prüfung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (53, 'Hauptstudium', 'Pflicht', 114222, 'Programmplanung/Lektorat
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (54, 'Hauptstudium', 'Pflicht', 114211, 'Crossmediales Produkt- und Innovationsmanagement
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (55, 'Hauptstudium', 'Pflicht', 114231, 'Medienproduktion Print und Digital
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (56, 'Hauptstudium', 'Pflicht', 114243, 'Recht und Ökonomie digitaler Medien
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (57, 'Hauptstudium', 'Pflicht', 114251, 'Buch-, Zeitungs-und Zeitschriftengestaltung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (58, 'Hauptstudium', 'Pflicht', 114262, 'Presse- und Online-Marketing
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (59, 'Hauptstudium', 'Pflicht', 114271, 'Presse/Journalismus
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (60, 'Hauptstudium', 'Pflicht', 114312, 'Verlagsmanagement
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (61, 'Hauptstudium', 'Wahlpflicht', 113423, 'Aktuelle Themen der Internet-Technologien
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (62, 'Hauptstudium', 'Wahlpflicht', 113435, 'Enterprise-Content-Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (63, 'Hauptstudium', 'Wahlpflicht', 113447, 'Computergrafik
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (64, 'Hauptstudium', 'Wahlpflicht', 113462, 'Praktikum Network Security
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (65, 'Hauptstudium', 'Wahlpflicht', 113465, 'Präsentation und Kommunikation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (66, 'Hauptstudium', 'Wahlpflicht', 113468, 'Projektarbeit
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (67, 'Hauptstudium', 'Wahlpflicht', 113471, 'IT-Projektmanagement
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (68, 'Hauptstudium', 'Wahlpflicht', 113459, 'Praktikum Rechnernetze
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (69, 'Hauptstudium', 'Wahlpflicht', 113833, 'Studienleistungen im Ausland
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (70, 'Hauptstudium', 'Wahlpflicht', 113510, 'Game Praktikum
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (71, 'Hauptstudium', 'Wahlpflicht', 113520, 'Theory of Game Development
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (72, 'Hauptstudium', 'Wahlpflicht', 113540, 'Game Physics
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (73, 'Hauptstudium', 'Wahlpflicht', 113445, 'Künstliche Intelligenz für Computerspiele
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (74, 'Hauptstudium', 'Wahlpflicht', 113455, 'Praktikum Virtual Reality
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (75, 'Hauptstudium', 'Wahlpflicht', 113521, 'Game Engine Programming
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (76, 'Hauptstudium', 'Pflicht', 223230, 'Wirtschaft III: Führungsorientiertes Rechnungswesen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (77, 'Hauptstudium', 'Pflicht', 223430, 'Medientheorie
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (78, 'Hauptstudium', 'Pflicht', 223233, 'Management Information
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (79, 'Hauptstudium', 'Pflicht', 223433, 'AV-Technik 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (80, 'Hauptstudium', 'Pflicht', 223434, 'Crossmedia-Technik
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (81, 'Hauptstudium', 'Pflicht', 223131, 'Steuerung von Medienprojekten
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (82, 'Hauptstudium', 'Wahlpflicht', 223530, 'Produktion Audio
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (83, 'Hauptstudium', 'Wahlpflicht', 223531, 'Produktion Hochschulradio
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (84, 'Hauptstudium', 'Wahlpflicht', 223532, 'Produktion Studentenfernsehen Stufe
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (85, 'Hauptstudium', 'Wahlpflicht', 223533, 'Produktion Video, Film
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (86, 'Hauptstudium', 'Wahlpflicht', 223534, 'Produktion Convergent Journalismen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (87, 'Hauptstudium', 'Wahlpflicht', 223535, 'Produktion TV
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (88, 'Hauptstudium', 'Wahlpflicht', 223536, 'Produktion Interaktive Medien, Multimedia
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (89, 'Hauptstudium', 'Wahlpflicht', 223537, 'Produktion Print
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (90, 'Hauptstudium', 'Wahlpflicht', 223162, 'Interdisziplinäres Projekt: Journalismus
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (91, 'Hauptstudium', 'Pflicht', 119370, 'Tutorium
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (92, 'Hauptstudium', 'Wahlpflicht', 119610, 'Innovation Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (93, 'Hauptstudium', 'Wahlpflicht', 119640, 'Mobile Web Applications
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (94, 'Hauptstudium', 'Wahlpflicht', 119630, 'Spieleentwicklung für Mobile Geräte
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (95, 'Hauptstudium', 'Wahlpflicht', 119660, 'User Experience Design
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (96, 'Hauptstudium', 'Wahlpflicht', 119650, 'User Interaction in Mobile and Embedded Systems
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (97, 'Hauptstudium', 'Wahlpflicht', 119670, 'Rechnernetze 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (98, 'Hauptstudium', 'Wahlpflicht', 119835, 'Studienleistungen aus Angeboten von Gastdozenten
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (99, 'Hauptstudium', 'Wahlpflicht', 119665, 'Mobile Game Design
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (100, 'Hauptstudium', 'Wahlpflicht', 224459, 'Mobile Advertising and Brand Engagement
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (101, 'Hauptstudium', 'Wahlpflicht', 335086, 'Medien- und Netzpolitik
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (102, 'Hauptstudium', 'Wahlpflicht', 335089, 'Betriebliche Anwendungssysteme in Medienunternehmen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (103, 'Hauptstudium', 'Wahlpflicht', 335090, 'Studienleistung im Ausland
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (104, 'Hauptstudium', 'Wahlpflicht', 334845, 'Advanced Usability Engineering
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (105, 'Hauptstudium', 'Wahlpflicht', 111301, 'Projektpraktikum 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (106, 'Hauptstudium', 'Wahlpflicht', 335103, 'Big Data Scenarios
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (107, 'Hauptstudium', 'Wahlpflicht', 335113, 'Innovationsmanagement (Zulassung ab WS 16/17)
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (108, 'Hauptstudium', 'Wahlpflicht', 335114, 'IT und Information Security Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (109, 'Grundstudium', 'Pflicht', 181202, 'Physics for Engineers
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (110, 'Grundstudium', 'Pflicht', 181436, 'Advanced Lab - Metrology
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (111, 'Hauptstudium', 'Pflicht', 181310, 'Post-Press Technologies and Product Design
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (112, 'Hauptstudium', 'Pflicht', 181340, 'Product Development
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (113, 'Hauptstudium', 'Pflicht', 181450, 'Language Course 4
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (114, 'Hauptstudium', 'Pflicht', 181410, 'Packaging Printing
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (115, 'Hauptstudium', 'Pflicht', 181420, 'Production and Material Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (116, 'Hauptstudium', 'Pflicht', 181430, 'Advanced Lab - Lithography
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (117, 'Hauptstudium', 'Pflicht', 181550, 'Language Course 5
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (118, 'Hauptstudium', 'Pflicht', 181500, 'Internship
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (119, 'Hauptstudium', 'Pflicht', 181650, 'Language Course 6
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (120, 'Hauptstudium', 'Pflicht', 181600, 'Industrial Printing
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (121, 'Hauptstudium', 'Pflicht', 181610, 'Internat. Management, Commerce and Law
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (122, 'Hauptstudium', 'Pflicht', 181620, 'Academic Work
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (123, 'Hauptstudium', 'Pflicht', 181431, 'Advanced Lab - Digital Printing and Variable Data Printing
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (124, 'Hauptstudium', 'Pflicht', 116311, 'Druckverfahren und Veredelung 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (125, 'Hauptstudium', 'Pflicht', 116313, 'Werkstoffe, Packstoffe und Verarbeitung 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (126, 'Hauptstudium', 'Pflicht', 116412, 'Ingenieurwissenschaftliche Grundlagen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (127, 'Hauptstudium', 'Pflicht', 116414, 'Verpackungsmaschinen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (128, 'Hauptstudium', 'Pflicht', 116400, 'Tutorien, Exkursionen, Projekte 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (129, 'Hauptstudium', 'Pflicht', 116701, 'Betriebswirtschaftslehre - Kosten- und Leistungsrechnung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (130, 'Hauptstudium', 'Pflicht', 116700, 'Tutorien, Exkursionen, Projekte 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (131, 'Hauptstudium', 'Wahlpflicht', 116812, 'Nachhaltige Entwicklung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (132, 'Hauptstudium', 'Wahlpflicht', 116814, 'Kunststoffe 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (133, 'Hauptstudium', 'Pflicht', 224701, 'Kommunikationsprojekt
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (134, 'Hauptstudium', 'Pflicht', 224702, 'Bachelorprüfung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (135, 'Hauptstudium', 'Pflicht', 224431, 'Online-Kommunikation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (136, 'Hauptstudium', 'Pflicht', 224306, 'Kommunikation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (137, 'Hauptstudium', 'Pflicht', 224320, 'Konzeption der Marktkommunikation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (138, 'Hauptstudium', 'Pflicht', 224321, 'Digitale Kommunikation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (139, 'Hauptstudium', 'Pflicht', 224322, 'Agiles Projektmanagement
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (140, 'Hauptstudium', 'Pflicht', 224420, 'Empirische Marktforschung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (141, 'Hauptstudium', 'Pflicht', 224421, 'Performance Marketing
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (142, 'Hauptstudium', 'Pflicht', 224422, 'Werbe- und Kommunikationsethik
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (143, 'Hauptstudium', 'Pflicht', 224703, 'Arbeitsportfolio
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (144, 'Hauptstudium', 'Wahlpflicht', 224601, 'Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (145, 'Hauptstudium', 'Wahlpflicht', 224351, 'Visuelle Kommunikation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (146, 'Hauptstudium', 'Wahlpflicht', 224352, 'Zeitbasierte Medien
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (147, 'Hauptstudium', 'Wahlpflicht', 224353, 'Screendesign
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (148, 'Grundstudium', 'Pflicht', 335000, 'Oxford-Einstufungstest (Englisch)
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (149, 'Grundstudium', 'Pflicht', 335121, 'Grundlagen Wirtschaftsinformatik
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (150, 'Grundstudium', 'Pflicht', 335122, 'Grundlagen Datenbanken
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (151, 'Grundstudium', 'Pflicht', 335123, 'Programmieren
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (152, 'Grundstudium', 'Pflicht', 335120, 'Marketing & Organisation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (153, 'Grundstudium', 'Pflicht', 335125, 'Externes und Internes Rechnungswesen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (154, 'Grundstudium', 'Pflicht', 335127, 'Algorithmen & Datenstrukturen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (155, 'Grundstudium', 'Pflicht', 335128, 'Geschäftsprozesse
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (156, 'Grundstudium', 'Pflicht', 338002, 'Schlüsselkompetenz: Ways of Working
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (157, 'Grundstudium', 'Pflicht', 335132, 'Dienstleistungsmanagment
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (158, 'Grundstudium', 'Pflicht', 335126, 'Propädeutik WI
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (159, 'Grundstudium', 'Pflicht', 338047, 'Data Literacy
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (160, 'Hauptstudium', 'Pflicht', 338003, 'Schlüsselkompetenz: Tools for Working
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (161, 'Hauptstudium', 'Pflicht', 335129, 'Digitale Ökonomie und Geschäftsmodelle
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (162, 'Hauptstudium', 'Pflicht', 335131, 'Führungsorientiertes Rechnungswesen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (163, 'Hauptstudium', 'Pflicht', 335133, 'Software-Engineering
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (164, 'Hauptstudium', 'Pflicht', 335134, 'Web Technologie
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (165, 'Hauptstudium', 'Pflicht', 335135, 'Betriebliche Anwendungssysteme
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (166, 'Hauptstudium', 'Pflicht', 337080, 'Design und Usability
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (167, 'Hauptstudium', 'Pflicht', 335136, 'Data Science
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (168, 'Hauptstudium', 'Pflicht', 335137, 'Business Intelligence
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (169, 'Hauptstudium', 'Pflicht', 335138, 'Software-Praktikum
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (170, 'Hauptstudium', 'Pflicht', 335140, 'Strategien digitaler Medien
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (171, 'Hauptstudium', 'Pflicht', 338004, 'Schlüsselkompetenz: Working in a Media World
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (172, 'Hauptstudium', 'Pflicht', 335142, 'Bachelorkolloquium
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (173, 'Hauptstudium', 'Pflicht', 335143, 'Bachelorarbeit
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (174, 'Hauptstudium', 'Pflicht', 355144, 'Digitale Transformation
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (175, 'Hauptstudium', 'Wahlpflicht', 335059, 'Kooperationstechnologie
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (176, 'Hauptstudium', 'Wahlpflicht', 335066, 'Trends in der Medienwirtschaft
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (177, 'Hauptstudium', 'Wahlpflicht', 335068, 'Social Media Business
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (178, 'Hauptstudium', 'Wahlpflicht', 335075, 'Service Learning/Community Service
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (179, 'Hauptstudium', 'Wahlpflicht', 335115, 'Trends in Data Science
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (180, 'Hauptstudium', 'Wahlpflicht', 337089, 'Business Skills (Zulassung ab WS 16/17)
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (181, 'Hauptstudium', 'Wahlpflicht', 338005, 'Fachspezifisches Projekt: Management 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (182, 'Hauptstudium', 'Wahlpflicht', 338006, 'Fachspezifisches Projekt: Management 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (183, 'Hauptstudium', 'Wahlpflicht', 338007, 'Fachspezifisches Projekt: Management 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (184, 'Hauptstudium', 'Wahlpflicht', 338008, 'Fachspezifisches Projekt: Management 4
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (185, 'Hauptstudium', 'Wahlpflicht', 338009, 'Fachspezifisches Projekt: Management 5
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (186, 'Hauptstudium', 'Wahlpflicht', 338010, 'Fachspezifisches Projekt: Informationstechnologie 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (187, 'Hauptstudium', 'Wahlpflicht', 338011, 'Fachspezifisches Projekt: Informationstechnologie 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (188, 'Hauptstudium', 'Wahlpflicht', 338012, 'Fachspezifisches Projekt: Informationstechnologie 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (189, 'Hauptstudium', 'Wahlpflicht', 338013, 'Fachspezifisches Projekt: Informationstechnologie 4
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (190, 'Hauptstudium', 'Wahlpflicht', 338014, 'Fachspezifisches Projekt: Informationstechnologie 5
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (191, 'Hauptstudium', 'Wahlpflicht', 338015, 'Fachspezifisches Projekt: Medienproduktion 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (192, 'Hauptstudium', 'Wahlpflicht', 338016, 'Fachspezifisches Projekt: Medienproduktion 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (193, 'Hauptstudium', 'Wahlpflicht', 338017, 'Fachspezifisches Projekt: Medienproduktion 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (194, 'Hauptstudium', 'Wahlpflicht', 338018, 'Fachspezifisches Projekt: Medienproduktion 4
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (195, 'Hauptstudium', 'Wahlpflicht', 338019, 'Fachspezifisches Projekt: Medienproduktion 5
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (196, 'Hauptstudium', 'Wahlpflicht', 338024, 'Fachspezifisches Projekt: Medien/Kultur 5
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (197, 'Hauptstudium', 'Wahlpflicht', 338025, 'Interdisziplinäres Projekt: Management und Informationstechnologie 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (198, 'Hauptstudium', 'Wahlpflicht', 338026, 'Interdisziplinäres Projekt: Management und Informationstechnologie 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (199, 'Hauptstudium', 'Wahlpflicht', 338027, 'Interdisziplinäres Projekt: Management und Informationstechnologie 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (200, 'Hauptstudium', 'Wahlpflicht', 338028, 'Interdisziplinäres Projekt: Management und Medienproduktion 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (201, 'Hauptstudium', 'Wahlpflicht', 338029, 'Interdisziplinäres Projekt: Management und Medienproduktion 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (202, 'Hauptstudium', 'Wahlpflicht', 338030, 'Interdisziplinäres Projekt: Management und Medienproduktion 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (203, 'Hauptstudium', 'Wahlpflicht', 338031, 'Interdisziplinäres Projekt: Management und Medien/Kultur 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (204, 'Hauptstudium', 'Wahlpflicht', 338032, 'Interdisziplinäres Projekt: Management und Medien/Kultur 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (205, 'Hauptstudium', 'Wahlpflicht', 338033, 'Interdisziplinäres Projekt: Management und Medien/Kultur 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (206, 'Hauptstudium', 'Wahlpflicht', 338034, 'Interdisziplinäres Projekt: Informationstechnologie und Medienproduktion 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (207, 'Hauptstudium', 'Wahlpflicht', 338035, 'Interdisziplinäres Projekt: Informationstechnologie und Medienproduktion 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (208, 'Hauptstudium', 'Wahlpflicht', 338036, 'Interdisziplinäres Projekt: Informationstechnologie und Medienproduktion 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (209, 'Hauptstudium', 'Wahlpflicht', 338037, 'Interdisziplinäres Projekt: Informationstechnologie und Medien/Kultur 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (210, 'Hauptstudium', 'Wahlpflicht', 338038, 'Interdisziplinäres Projekt: Informationstechnologie und Medien/Kultur 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (211, 'Hauptstudium', 'Wahlpflicht', 338039, 'Interdisziplinäres Projekt: Informationstechnologie und Medien/Kultur 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (212, 'Hauptstudium', 'Wahlpflicht', 338040, 'Interdisziplinäres Projekt: Medienproduktion und Medien/Kultur 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (213, 'Hauptstudium', 'Wahlpflicht', 338041, 'Interdisziplinäres Projekt: Medienproduktion und Medien/Kultur 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (214, 'Hauptstudium', 'Wahlpflicht', 338042, 'Interdisziplinäres Projekt: Medienproduktion und Medien/Kultur 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (215, 'Hauptstudium', 'Wahlpflicht', 338043, 'Transdisziplinäres Projekt 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (216, 'Hauptstudium', 'Wahlpflicht', 338045, 'Transdisziplinäres Projekt 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (217, 'Hauptstudium', 'Wahlpflicht', 331103, 'Internationaler Intensivkurs B
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (218, 'Hauptstudium', 'Wahlpflicht', 331104, 'Internationaler Intensivkurs C
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (219, 'Hauptstudium', 'Wahlpflicht', 334891, 'Design Thinking
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (220, 'Hauptstudium', 'Wahlpflicht', 337068, 'Now Age Storytelling
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (221, 'Hauptstudium', 'Wahlpflicht', 338020, 'Fachspezifisches Projekt: Medien/Kultur 1
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (222, 'Hauptstudium', 'Wahlpflicht', 338021, 'Fachspezifisches Projekt: Medien/Kultur 2
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (223, 'Hauptstudium', 'Wahlpflicht', 335124, 'Medienmanagemant - Case Studies
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (224, 'Hauptstudium', 'Wahlpflicht', 335130, 'Customer Relationship Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (225, 'Hauptstudium', 'Wahlpflicht', 335118, 'WI-Tutorium
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (226, 'Hauptstudium', 'Wahlpflicht', 337049, 'Karriereplanung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (227, 'Hauptstudium', 'Wahlpflicht', 338023, 'Fachspezifisches Projekt: Medien/Kultur 4
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (228, 'Hauptstudium', 'Wahlpflicht', 338022, 'Fachspezifisches Projekt: Medien/Kultur 3
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (229, 'Hauptstudium', 'Wahlpflicht', 335053, 'Business Applications
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (230, 'Hauptstudium', 'Wahlpflicht', 335050, 'Strategisches Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (231, 'Hauptstudium', 'Wahlpflicht', 335051, 'Performance Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (232, 'Hauptstudium', 'Wahlpflicht', 331102, 'Internationaler Intensivkurs A
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (233, 'Hauptstudium', 'Wahlpflicht', 335146, 'Advanced Data Science
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (234, 'Hauptstudium', 'Wahlpflicht', 335147, 'Controlling Seminar
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (235, 'Hauptstudium', 'Wahlpflicht', 338049, 'Studienleistung im Ausland (unbenotet)
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (236, 'Hauptstudium', 'Wahlpflicht', 338054, 'Studienleistung im Ausland (benotet)
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (237, 'Hauptstudium', 'Wahlpflicht', 113310, 'Algorithmen und Datenstrukturen
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (238, 'Hauptstudium', 'Wahlpflicht', 182310, 'Production & Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (239, 'Hauptstudium', 'Wahlpflicht', 182313, 'Werkstoffkunde
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (240, 'Hauptstudium', 'Wahlpflicht', 182610, 'Technischer Vertrieb
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (241, 'Hauptstudium', 'Wahlpflicht', 182316, 'Marketing
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (242, 'Hauptstudium', 'Wahlpflicht', 182462, 'Musikdesign in der Werbung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (243, 'Hauptstudium', 'Wahlpflicht', 113411, 'Design Patterns
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (244, 'Hauptstudium', 'Wahlpflicht', 182412, 'Post-Press Technologies
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (245, 'Hauptstudium', 'Wahlpflicht', 182450, 'Grundlagen Führung
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (246, 'Hauptstudium', 'Wahlpflicht', 182456, 'International Media and Packaging Business and Law
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (247, 'Hauptstudium', 'Wahlpflicht', 182453, 'International Project Management
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (248, 'Hauptstudium', 'Wahlpflicht', 182457, 'Compliance, Verpackungsrecht
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (249, 'Hauptstudium', 'Wahlpflicht', 182461, 'Offset-Druck
');
INSERT INTO TeamUP.modul (id, studienart, `wahl/pflicht`, `edv-nr`, bezeichnung) VALUES (250, 'Hauptstudium', 'Wahlpflicht', 182463, 'Aktuelles Thema Wirtschaft/Medien/Design');

INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (1, 1);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (1, 2);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (1, 3);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (1, 4);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (1, 5);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (1, 6);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (1, 7);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (1, 8);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (1, 9);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (2, 10);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (2, 11);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (2, 12);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (2, 13);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (2, 14);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (2, 15);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (2, 16);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (2, 17);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (2, 18);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (3, 19);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (3, 20);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (3, 21);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (3, 22);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (3, 23);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (3, 24);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (3, 25);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (3, 26);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 27);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 28);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 29);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 30);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 31);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 32);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 33);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 34);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 35);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (4, 36);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 37);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 38);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 39);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 40);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 41);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 42);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 43);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 44);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 45);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 46);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 47);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 48);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 49);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (5, 50);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 51);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 52);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 53);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 54);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 55);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 56);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 57);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 58);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 59);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (7, 60);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 61);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 62);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 63);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 64);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 65);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 66);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 67);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 68);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 69);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 70);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 71);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 72);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 73);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 74);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (8, 75);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 76);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 77);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 78);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 79);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 80);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 81);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 82);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 83);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 84);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 85);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 86);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 87);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 88);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 89);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (9, 90);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 91);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 92);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 93);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 94);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 95);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 96);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 97);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 98);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 99);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (10, 100);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (11, 101);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (11, 102);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (11, 103);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (11, 104);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (11, 105);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (11, 106);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (11, 107);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (11, 108);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 109);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 110);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 111);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 112);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 113);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 114);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 115);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 116);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 117);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 118);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 119);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 120);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 121);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 122);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (12, 123);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (13, 124);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (13, 125);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (13, 126);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (13, 127);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (13, 128);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (13, 129);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (13, 130);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (13, 131);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (13, 132);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 133);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 134);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 135);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 136);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 137);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 138);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 139);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 140);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 141);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 142);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 143);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 144);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 145);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 146);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (14, 147);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 148);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 149);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 150);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 151);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 152);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 153);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 154);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 155);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 156);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 157);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 158);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 159);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 160);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 161);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 162);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 163);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 164);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 165);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 166);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 167);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 168);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 169);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 170);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 171);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 172);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 173);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 174);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 175);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 176);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 177);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 178);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 179);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 180);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 181);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 182);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 183);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 184);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 185);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 186);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 187);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 188);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 189);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 190);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 191);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 192);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 193);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 194);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 195);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 196);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 197);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 198);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 199);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 200);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 201);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 202);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 203);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 204);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 205);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 206);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 207);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 208);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 209);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 210);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 211);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 212);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 213);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 214);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 215);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 216);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 217);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 218);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 219);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 220);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 221);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 222);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 223);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 224);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 225);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 226);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 227);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 228);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 229);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 230);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 231);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 232);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 233);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 234);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 235);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (15, 236);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 237);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 238);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 239);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 240);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 241);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 242);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 243);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 244);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 245);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 246);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 247);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 248);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 249);
INSERT INTO TeamUP.modulInStudiengang (studiengangId, modulId) VALUES (16, 250);