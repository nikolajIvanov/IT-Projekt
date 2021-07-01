# Resource Naming

## Einleitung
Für einen REST-Server/Service benötigen wir eine konsistente Bennenung aller Ressourcen.
Wir verwenden die folgende Ressourcen-Struktur, um mittels REST auf den 
Applikationsserver zuzugreifen.

### A) Zugriff auf `User`-Objekte
1. Gibt alle Users zurück:
    ```
    GET /users
    ```
2. Legt einen neuen User an:
   ```
   POST /users
   ```
3. Legt viele User an:
   ```
   POST /viele-user
   ```
4. Aktualisieren eines User: 
    ```
   PUT /users
   ```
5. Gibt die Daten eines User zurück:
    ```
   GET /users/<auth_id>
   ```
6. Gibt die Daten von mehreren Usern zurück:
    ```
   GET /usersById
   ```
7. Löscht einen User:
    ```
   DELETE /users/<auth_id>
   ```
### B) Zugriff auf `Lerngruppen`-Objekte   
1. Gibt alle Lerngruppen zurück:
    ```
    GET /lerngruppen
    ```
2. Erzeugt eine Lerngruppe:
    ```
    POST /lerngruppen
    ```   
3. Gibt die Daten einer Lerngruppe zurück:
    ```
    GET /lerngruppe/<gruppen_id>
    ```   
4. Löscht eine Lerngruppe:
    ```
    DELETE /lerngruppe/<gruppen_id>
    ```   
5. Aktualisiert eine Lerngruppe:
    ```
    PUT /lerngruppe/<gruppen_id>
    ``` 
6. Fügt ein Mitglied einer Lerngruppe hinzu:
    ```
    PUT /lerngruppen-mitglied
    ```
7. Löscht ein Mitglied einer Lerngruppe:
    ```
    DELETE /lerngruppen-mitglied
    ```        
8. Gibt mehrere Lerngruppen zurück:
    ```
    GET /lerngruppenById
    ```  
###  C) Zugriff auf `Modul`-Objekte   
1. Gibt alle Module eines Studienganges zurück:
    ```
    GET /modul/<studiengang>
    ```
###  D) Zugriff auf `Matching`-Objekte   
1. Gibt alle User Matchings eines User zurück:
    ```
    GET /usermatch/<auth_id>
    ```
2. Gibt alle Lerngruppen Matchings eines User zurück:
    ```
    GET /lerngruppenmatch/<auth_id>
    ```
###  E) Zugriff auf `Chat`  
1. Gibt alle Nachrichten eines Chat Rooms zurück:
    ```
    GET /chat/<room_id>
    ```
2. Gibt alle Chat Rooms eines Users zurück:
    ```
    GET /chatrooms/<auth_id>
    ```
3. Erstellt einen neuen Chat Room:
    ```
    POST /chatrooms/<auth_id>
    ```
4. Löscht einen Chat Room:
    ```
    DELETE /chatrooms/<auth_id>
    ```
###  Zugriff auf `Request`-Objekte   
1. Gibt alle Studiengänge der HdM zurück:
    ```
    GET /studiengang
    ```
###  Zugriff auf `Sonstige`-Objekte   
1. Gibt alle Studiengänge der HdM zurück:
    ```
    GET /studiengang
    ```
2. Gibt alle Lerntypen zurück:
    ```
   GET /lerntyp
   ```