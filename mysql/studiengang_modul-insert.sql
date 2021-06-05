USE `TeamUP`;


INSERT INTO modul(bezeichnung) VALUES
    /* Wirtschaftsinformatik */
    ('Marketing & Organisation'),
    ('Programmieren'),
    ('Data Science'),
    ('Grundlagen Wirtschaftsinformatik'),
    ('Grundlagen Datenbanken'),
    ('Algorithmen & Datenstrukturen'),
    /* Online-Medien-Management */
    ('Externes und Internes Rechnungswesen'),
    ('Wirtschaftswissenschaftliche Grundlagen'),
    ('Technologische Grundlagen'),
    ('Multimedia Storytelling'),
    ('E-Business'),
    ('Online-Anwendungen'),
    ('Mediensysteme');


INSERT INTO studiengang(studiengang) VALUES
    ('Wirtschaftsinformatik und digitale Medien'),
    ('Online-Medien-Management');

INSERT INTO modulInStudiengang(studiengangId, modulId) VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (2, 8),
    (2, 9),
    (2, 10),
    (2, 11),
    (2, 12),
    (2, 13),
    (2, 1);

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