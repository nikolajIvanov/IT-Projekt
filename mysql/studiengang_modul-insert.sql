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