# Wie Sie die APP starten


## Schritt 1: Starten des DBMS
1. Installieren Sie mySQL
2. Starten Sie den Dienst mySQL (Vorgehensweise plattformabhängig, siehe 
Hersteller-Dokumentation zu mySQL).
3. Erstellen Sie mit der Datei ```/mysql/MySQL-Dump.sql``` eine Datenbank mit 
Beispieldaten.
4. Befüllen Sie die Datenbank mit Testdaten   
````/mysql/test_user.sql````
````/mysql/Studiengang_Modul_NUTZEN.sql````
````/mysql/MySQL-Dump-Live.sql````    
   
## Schritt 2: Starten des Backend
1. Erstellen Sie für das Projekt ein Virtual Environment, das die in dem [Dokument 
INSTALLATION.md](INSTALLATION.md) formulierten Anforderungen erfüllt.
2. Starten Sie die Datei ```/src/app.py```. Achten Sie dabei auf die Console. Dort
erscheinen entsprechende Meldungen, wenn der Start erfolgt ist.
   
 
## Schritt 2: Starten des Frontend
1. Stellen Sie sicher, dass sich im Verzeichnis ```/frontend``` sind. 
2. Führen Sie im Terminal den Befehl ````npm start```` aus.   


