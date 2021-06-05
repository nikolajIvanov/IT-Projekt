from server.bo.User import User
from server.db.Mapper import Mapper
import datetime


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def get_modulId_by_modul(self, modul):
        """
        :param modul: Ist das Modul (string)
        :return: modulid
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """SELECT modul.id FROM TeamUP.modul WHERE bezeichnung=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (modul,))

        # Speichern der SQL Antwort
        modulId = cursor.fetchone()

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()
        # Rückgabe der Modulid
        return modulId[0]

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, "
                       "gender, semester, studiengang FROM TeamUP.users")
        tuples = cursor.fetchall()

        for (id, authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester, studiengang) \
                in tuples:
            user = User()
            user.set_id(id)
            user.set_authId(authId)
            user.set_profilBild(bild)
            user.set_name(name)
            user.set_geburtsdatum(geburtsdatum)
            user.set_email(email)
            user.set_beschreibung(beschreibung)
            user.set_lerntyp(lerntyp)
            user.set_gender(gender)
            user.set_semester(semester)
            user.set_studiengang(studiengang)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_authId(self, key):
        """
        :param key: Ist die authId
        :return: Alle Objekte des User
        """
        # TODO Tabelle Lerntyp befüllen: https://mitteldeutsches-institut.de/lerntypen/
        # öffnen der DB verbindung
        cursor = self._cnx.cursor(prepared=True)
        # erstellen des SQL-Befehls um die User Daten abzufragen
        query = """SELECT users.id, users.bild, users.name, users.geburtsdatum, users.email, users.beschreibung, 
               users.lerntyp, users.gender, users.semester, users.studiengang FROM TeamUP.users WHERE authId=%s"""

        # erstellen des SQL-Befehls um abzufragen welche Module einem User zugeordnet sind
        query1 = """SELECT modul.bezeichnung From ((TeamUP.modul JOIN TeamUP.userinmodul 
                    ON modul.id = userinmodul.modulId) 
                    JOIN teamup.users ON userinmodul.userId = users.id ) WHERE teamup.users.authId=%s"""

        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (key,))
        # Speichern der SQL Antwort
        tuples = cursor.fetchall()
        # Ausführen des zweiten SQL-Befehls
        cursor.execute(query1, (key,))
        # Speichern der SQL Antwort
        tuples1 = cursor.fetchall()

        # Auflösen der ersten SQL Antwort (User) und setzen der Parameter
        (id, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester, studiengang) = tuples[0]
        user = User()
        user.set_id(id)
        user.set_profilBild(bild)
        user.set_name(name)
        user.set_geburtsdatum(geburtsdatum)
        user.set_email(email)
        user.set_beschreibung(beschreibung)
        user.set_lerntyp(lerntyp)
        user.set_gender(gender)
        user.set_semester(semester)
        user.set_studiengang(studiengang)
        user.set_authId(key)

        # Auflösen der zweiten SQL Antwort (Module des User) und setzen des Parameters
        for i in tuples1:
            for x in i:
                user.set_module_append(x)

        # Datenbankverbindung schließen
        self._cnx.commit()
        cursor.close()

        # Rückgabe des User
        return user

    def find_by_id(self, id):
        """
        :param key: Ist die id
        :return: Alle Objekte des User
        """
        # öffnen der DB verbindung
        cursor = self._cnx.cursor(prepared=True)
        # erstellen des SQL-Befehls um die User Daten abzufragen
        query = """SELECT users.authId, users.bild, users.name, users.geburtsdatum, users.email, users.beschreibung, 
               users.lerntyp, users.gender, users.semester, users.studiengang FROM TeamUP.users WHERE users.id=%s"""

        # erstellen des SQL-Befehls um abzufragen welche Module einem User zugeordnet sind
        query1 = """SELECT modul.bezeichnung From ((TeamUP.modul JOIN TeamUP.userinmodul 
                ON modul.id = userinmodul.modulId) 
                JOIN teamup.users ON userinmodul.userId = users.id ) WHERE users.id=%s"""

        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (id,))
        # Speichern der SQL Antwort
        tuples = cursor.fetchall()
        # Ausführen des zweiten SQL-Befehls
        cursor.execute(query1, (id,))
        # Speichern der SQL Antwort
        tuples1 = cursor.fetchall()

        # Auflösen der ersten SQL Antwort (User) und setzen der Parameter
        (authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester, studiengang) = tuples[0]
        user = User()
        user.set_id(id)
        user.set_profilBild(bild)
        user.set_name(name)
        user.set_geburtsdatum(geburtsdatum)
        user.set_email(email)
        user.set_beschreibung(beschreibung)
        user.set_lerntyp(lerntyp)
        user.set_gender(gender)
        user.set_semester(semester)
        user.set_studiengang(studiengang)
        user.set_authId(authId)

        # Auflösen der zweiten SQL Antwort (Module des User) und setzen des Parameters
        for i in tuples1:
            for x in i:
                user.set_module_append(x)

        # Datenbankverbindung schließen
        self._cnx.commit()
        cursor.close()

        # Rückgabe des User
        return user


    def find_by_name(self, name):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email FROM TeamUP.users WHERE name LIKE '{}' ORDER BY  name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        (id, name, email) = tuples[0]
        user = User()
        user.set_id(id)
        user.set_name(name)
        user.set_email(email)
        result = user

        self._cnx.commit()
        cursor.close()

        return result

    def insert_by_authId(self, nutzer):
        """
        :param nutzer: Ist das Nutzerobjekt
        :return: Alle Objekte des User
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """INSERT INTO TeamUP.users (authId, bild, name, geburtsdatum, email,
                beschreibung, lerntyp, gender, semester, studiengang) VALUES (%s ,%s ,%s ,%s ,%s ,%s ,%s, %s, %s, %s)"""

        # Auslesen der User Daten
        daten = (nutzer.get_authId(), nutzer.get_profilBild(), nutzer.get_name(),
                 datetime.datetime.strptime(nutzer.get_geburtsdatum(), '%Y-%m-%d'),
                 nutzer.get_email(), nutzer.get_beschreibung(), nutzer.get_lerntyp(), nutzer.get_gender(),
                 nutzer.get_semester(), nutzer.get_studiengang())

        # Ausführen des SQL-Befehls um die User Daten auf die Datenbank zu schreiben
        cursor.execute(query, (daten))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Öffnen einer Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Auslesen welche Module zu dem Nutzer gehören
        module = nutzer.get_modul()
        # Datenbankeintrag für jedes Modul erzeugen
        for i in module:
            # SQL-Befehl um den Datenbankeintrag zu erstellen
            query1 = """INSERT INTO TeamUP.userinmodul( userId, modulId) VALUES (%s, %s)"""
            # Auslesen und speichern der users.id und modul.id
            data = (self.get_Id_by_authId(nutzer.get_authId()), self.get_modulId_by_modul(i))
            # (Bitte kein Komma nach data) Ausführen des SQL- Befehls
            cursor.execute(query1, (data))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Rückgabe aller Userdaten
        return self.find_by_authId(nutzer.get_authId())

    def update_by_authId(self, nutzer):
        """
        :param nutzer: Ist das Nutzerobjekt
        :return: Das soeben geupdatete Objekt wird wieder nach vorne gegeben
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """UPDATE TeamUP.users SET authId=%s, bild=%s, name=%s, geburtsdatum=%s, email=%s,
                       beschreibung=%s, lerntyp=%s, gender=%s,semester=%s, studiengang=%s WHERE authId=%s"""

        # Auslesend der authId zur weitern verwendung
        authId = nutzer.get_authId()

        # Auslesen und speichern der restlichen User Daten
        daten = (authId, nutzer.get_profilBild(), nutzer.get_name(),
                 datetime.datetime.strptime(nutzer.get_geburtsdatum(), '%Y-%m-%d'),
                 nutzer.get_email(), nutzer.get_beschreibung(), nutzer.get_lerntyp(), nutzer.get_gender(),
                 nutzer.get_semester(), nutzer.get_studiengang(), authId)

        # Ausführen des SQL-Behls
        cursor.execute(query, (daten))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Auslesen und speichern der User.Id für später verwendung
        userid = nutzer.get_id()

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)
        # Erstellen des SQL-Befehls um alle bestehenden einträge des User in userInModule zu löschen
        query1 = """DELETE FROM TeamUP.userinmodul WHERE userId=%s"""
        # Ausführen des SQL-Befehls
        cursor.execute(query1, (userid,))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Öffnen einer Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)
        # Auslesen und speicher welche Module zu diesem Nutzer gehören
        module = nutzer.get_modul()

        # Für jedes Modul ein Datenbankeintrag erzeugen
        for i in module:
            # Erstellen des SQL-Befehls
            query2 = """INSERT INTO TeamUP.userinmodul( userId, modulId) VALUES (%s, %s)"""
            # Auslesen und speichern der users.id und modul.id
            data = (userid, self.get_modulId_by_modul(i))
            # (Bitte kein Komma nach data) Ausführen des SQL-Befehls
            cursor.execute(query2, (data))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Rückgabe der Userdaten (aktualisiert)
        return self.find_by_authId(authId)

    def update_by_id(self, nutzer):
        """
        :param nutzer: Ist das Nutzerobjekt
        :return: Das soeben geupdatete Objekt wird wieder nach vorne gegeben
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """UPDATE TeamUP.users SET authId=%s, bild=%s, name=%s, geburtsdatum=%s, email=%s,
                       beschreibung=%s, lerntyp=%s, gender=%s, semester=%s, studiengang=%s WHERE users.id=%s"""

        # Auslesen und speichern der restlichen User Daten
        daten = (nutzer.get_authId, nutzer.get_profilBild(), nutzer.get_name(),
                 datetime.datetime.strptime(nutzer.get_geburtsdatum(), '%Y-%m-%d'),
                 nutzer.get_email(), nutzer.get_beschreibung(), nutzer.get_lerntyp(), nutzer.get_gender(),
                 nutzer.get_semester(), nutzer.get_studiengang(), nutzer.get_id())


        # Ausführen des SQL-Behls
        cursor.execute(query, (daten))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)
        # Erstellen des SQL-Befehls um alle bestehenden einträge des User in userInModule zu löschen
        query1 = """DELETE FROM TeamUP.userinmodul WHERE userId=%s"""
        # Ausführen des SQL-Befehls
        cursor.execute(query1, (nutzer.get_id,))

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Öffnen einer Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)
        # Auslesen und speichern, welche Module zu diesem Nutzer gehören
        module = nutzer.get_modul()

        # Für jedes Modul ein Datenbankeintrag erzeugen
        for i in module:
            # Erstellen des SQL-Befehls
            query2 = """INSERT INTO TeamUP.userinmodul( userId, modulId) VALUES (%s, %s)"""
            # Auslesen und speichern der users.id und modul.id
            data = (nutzer.get_id(), self.get_modulId_by_modul(i))
            # (Bitte kein Komma nach data) Ausführen des SQL-Befehls
            cursor.execute(query2, (data))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Rückgabe der Userdaten (aktualisiert)
        return self.find_by_key(nutzer.get_authId())

    def delete_by_authId(self, nutzer):
        """
        :param nutzer: Ist das Nutzerobjekt
        :return:
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Auslesen und speichern der User.id
        userid = self.get_Id_by_authId(nutzer.get_authId())

        # Erstellen des SQL-Befehls um die Einträge in der users Datenbank zu löschen
        query = """DELETE FROM TeamUP.users WHERE id=%s"""
        # Erstellen des SQL-Befehls um die Einträge in der userInModul Datenbank zu löschen
        query1 = """DELETE FROM TeamUP.userinmodul WHERE userId=%s"""
        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (userid))
        # Ausführen des zweiten SQL-Befehls
        cursor.execute(query1, (userid))

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

    def get_modulForUser(self, authId):

        cursor = self._cnx.cursor()

        query = """SELECT modul.bezeichnung From ((TeamUP.modul JOIN TeamUP.userinmodul ON modul.id = userinmodul.modulId) 
                JOIN TeamUP.users ON userinmodul.userId = users.id ) WHERE authId=%s"""

        cursor.execute(query, (authId,))
        tuples = cursor.fetchall()

        user = User()
        for i in tuples:
            for x in i:
                user.set_modul(x)

        self._cnx.commit()
        cursor.close()

        return user


    def get_Id_by_authId(self, authId):
        """
        :param authId: Ist die authId
        :return: modulid
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """SELECT users.id FROM TeamUP.users WHERE authId=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (authId,))

        # Speichern der SQL-Antwort
        userid = cursor.fetchone()

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()
        # Rückgabe der UserId
        return userid[0]

    def delete_gruppe_by_id(self, authId):
        """
        :param authId:
        :return: void
        """
        pass

    def join_gruppe_by_id(self, authId):
        """
        :param authId:
        :return:
        """
        pass
