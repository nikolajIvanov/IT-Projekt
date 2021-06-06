from server.bo.UserBO import UserBO
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
        modulid = cursor.fetchone()

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()
        # Rückgabe der Modulid
        return modulid[0]

    def find_all(self):
        """
        Methode um alle UserBO und die dazugehörigen Module aus der Datenbank zu holen
        :return: Eine Liste mit allen Usern in Objekten gespeichert
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, "
                       "gender, semester, studiengang, vorname FROM TeamUP.users")
        tuples = cursor.fetchall()

        for (user_id, authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester, studiengang,
             vorname) in tuples:
            user = UserBO.create_userBO(id=user_id, authId=authId, profilBild=bild, name=name,
                                        geburtsdatum=geburtsdatum, email=email, beschreibung=beschreibung,
                                        lerntyp=lerntyp, gender=gender, semester=semester, studiengang=studiengang,
                                        vorname=vorname)
            # Das Geburtstag wird in das aktuelle Alter umgerechnet.
            user.set_geburtsdatum(user.calculate_age())
            result.append(self.find_modul_by_userid(user))

        self._cnx.commit()
        cursor.close()

        return result

    def find_modul_by_userid(self, user):
        """
        Findet alle Module eines Users
        :param user: Bekommt ein User Objekt mit mindestens der User ID um die Module zu finden
        :return: Übergibt ein User Objekt mit allen Modulen
        """
        cursor = self._cnx.cursor(prepared=True)

        query_modul = """SELECT modul.bezeichnung FROM TeamUP.modul JOIN TeamUP.userInModul  uIM 
                                    ON modul.id = uIM.modulId WHERE uIM.userId=%s"""

        # Ausführen des zweiten SQL-Befehls
        cursor.execute(query_modul, (user.get_id(),))
        # Speichern der SQL Antwort
        tuple_modul = cursor.fetchall()

        # Auflösen der zweiten SQL Antwort (Module des UserBO) und setzen des Parameters
        for i in tuple_modul:
            for x in i:
                user.set_module_append(x)

        # Datenbankverbindung schließen
        self._cnx.commit()
        cursor.close()

        return user

    def find_by_authId(self, user_authid):
        """
        :param user_authid: GoogleID eines bestimmten Users
        :return: Gibt ein UserBO Objekt mit allen Werten eines konkreten Users zurück
        """
        # öffnen der DB verbindung
        cursor = self._cnx.cursor(prepared=True)

        # erstellen des SQL-Befehls um die UserBO Daten abzufragen
        query = """SELECT users.id, users.bild, users.name, users.geburtsdatum, users.email, users.beschreibung, 
                    users.lerntyp, users.gender, users.semester, users.studiengang, users.vorname FROM TeamUP.users 
                    WHERE authId=%s"""

        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (user_authid,))

        # Speichern der SQL Antwort
        tuples = cursor.fetchall()

        # Auflösen der ersten SQL Antwort (UserBO) und setzen der Parameter
        (user_id, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester,
         studiengang, vorname) = tuples[0]

        user = UserBO.create_userBO(id=user_id, authId=user_authid, profilBild=bild, name=name,
                                    geburtsdatum=geburtsdatum, email=email, beschreibung=beschreibung, lerntyp=lerntyp,
                                    gender=gender, semester=semester, studiengang=studiengang, vorname=vorname)
        # Das Geburtstag wird in das aktuelle Alter umgerechnet.
        user.set_geburtsdatum(user.calculate_age())
        # Rückgabe des UserBO
        return self.find_modul_by_userid(user)

    def find_by_id(self, user_id):
        """
        :param user_id: Ist die id
        :return: Alle Objekte des UserBO
        """
        # öffnen der DB verbindung
        cursor = self._cnx.cursor(prepared=True)
        # erstellen des SQL-Befehls um die UserBO Daten abzufragen
        query = """SELECT users.authId, users.bild, users.name, users.geburtsdatum, users.email, users.beschreibung, 
                    users.lerntyp, users.gender, users.semester, users.studiengang, users.vorname 
                    FROM TeamUP.users WHERE users.id=%s"""

        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (user_id,))
        # Speichern der SQL Antwort
        tuples = cursor.fetchall()

        # Auflösen der ersten SQL Antwort (UserBO) und setzen der Parameter
        (authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester,
         studiengang, vorname) = tuples[0]

        user = UserBO.create_userBO(id=user_id, authId=authId, profilBild=bild, name=name,
                                    geburtsdatum=geburtsdatum, email=email, beschreibung=beschreibung, lerntyp=lerntyp,
                                    gender=gender, semester=semester, studiengang=studiengang, vorname=vorname)

        # Das Geburtstag wird in das aktuelle Alter umgerechnet.
        user.set_geburtsdatum(user.calculate_age())

        # Rückgabe des UserBO
        return self.find_modul_by_userid(user)

    # TODO Wird das noch benötigt?
    def find_by_name(self, name):

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email FROM TeamUP.users WHERE name LIKE '{}' ORDER BY  name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        (user_id, name, email) = tuples[0]
        user = UserBO()
        user.set_id(user_id)
        user.set_name(name)
        user.set_email(email)

        self._cnx.commit()
        cursor.close()

        return user

    def insert_by_authId(self, nutzer):
        """
        :param nutzer: Ist das Nutzerobjekt
        :return: Alle Objekte des UserBO
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """INSERT INTO TeamUP.users (authId, bild, name, geburtsdatum, email,
                beschreibung, lerntyp, gender, semester, studiengang, vorname) VALUES (%s ,%s ,%s ,%s ,%s ,%s ,%s, %s,
                 %s, %s, %s)"""

        # Auslesen der UserBO Daten
        daten = (nutzer.get_authId(), nutzer.get_profilBild(), nutzer.get_name(),
                 datetime.datetime.strptime(nutzer.get_geburtsdatum(), '%Y-%m-%d'),
                 nutzer.get_email(), nutzer.get_beschreibung(), nutzer.get_lerntyp(), nutzer.get_gender(),
                 nutzer.get_semester(), nutzer.get_studiengang(), nutzer.get_vorname())

        # Ausführen des SQL-Befehls um die UserBO Daten auf die Datenbank zu schreiben
        cursor.execute(query, daten)
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
            cursor.execute(query1, data)
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
        query = """UPDATE TeamUP.users SET authId=%s, bild=%s, name=%s, email=%s,
                       beschreibung=%s, lerntyp=%s, gender=%s,semester=%s, studiengang=%s, vorname=%s WHERE authId=%s"""

        # Auslesend der authId zur weitern verwendung
        authid = nutzer.get_authId()

        # Auslesen und speichern der restlichen UserBO Daten
        daten = (authid, nutzer.get_profilBild(), nutzer.get_name(), nutzer.get_email(), nutzer.get_beschreibung(),
                 nutzer.get_lerntyp(), nutzer.get_gender(), nutzer.get_semester(), nutzer.get_studiengang(),
                 nutzer.get_vorname(), authid)

        # TODO: Ist dieser Aufruf nötig? -> Sollte später kontrolliert werden. Wird aktuell benötigt, um die
        # User ID für das weitere Vorgehen aus der DB zu holen, falls sie falsch übergeben wurde (Postman)
        query_id = """SELECT users.id FROM TeamUP.users WHERE authId=%s"""
        # Ausführen des SQL-Befehls
        cursor.execute(query, daten)
        # Setzt die aktuelle User ID in das Objekt
        cursor.execute(query_id, (authid,))
        nutzer.set_id(cursor.fetchone()[0])
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)
        # Erstellen des SQL-Befehls um alle bestehenden einträge des UserBO in userInModule zu löschen
        query1 = """DELETE FROM TeamUP.userinmodul WHERE userId=%s"""
        # Ausführen des SQL-Befehls
        cursor.execute(query1, (nutzer.get_id(),))
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
            data = (nutzer.get_id(), self.get_modulId_by_modul(i))
            # (Bitte kein Komma nach data) Ausführen des SQL-Befehls
            cursor.execute(query2, data)
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Rückgabe der Userdaten (aktualisiert)
        return self.find_by_authId(authid)

    def update_by_id(self, nutzer):
        """
        :param nutzer: Ist das Nutzerobjekt
        :return: Das soeben geupdatete Objekt wird wieder nach vorne gegeben
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """UPDATE TeamUP.users SET authId=%s, bild=%s, name=%s, email=%s,
                       beschreibung=%s, lerntyp=%s, gender=%s, semester=%s, studiengang=%s, vorname=%s 
                       WHERE users.id=%s"""

        # Auslesen und speichern der restlichen UserBO Daten
        daten = (nutzer.get_authId, nutzer.get_profilBild(), nutzer.get_name(), nutzer.get_email(),
                 nutzer.get_beschreibung(), nutzer.get_lerntyp(), nutzer.get_gender(), nutzer.get_semester(),
                 nutzer.get_studiengang(), nutzer.get_vorname(), nutzer.get_id())

        # Ausführen des SQL-Befehls
        cursor.execute(query, daten)
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)
        # Erstellen des SQL-Befehls um alle bestehenden einträge des UserBO in userInModule zu löschen
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
            cursor.execute(query2, data)
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Rückgabe der Userdaten (aktualisiert)
        return 200

    def delete_by_authId(self, user_authid):
        """
        :param user_authid: Die GoogleID des zu löschenden Users
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Auslesen und speichern der UserBO.id
        userid = self.get_Id_by_authId(user_authid)

        # Erstellen des SQL-Befehls um die Einträge in der users Datenbank zu löschen
        query = """DELETE FROM TeamUP.users WHERE id=%s"""
        # Erstellen des SQL-Befehls um die Einträge in der userInModul Datenbank zu löschen
        query1 = """DELETE FROM TeamUP.userinmodul WHERE userId=%s"""
        # Erstellen des SQL-Befehls um die Einträge in der userInLerngruppe Datenbank zu löschen
        query2 = """DELETE FROM TeamUP.userInLerngruppe WHERE userId=%s"""
        # Ausführen des ersten SQL-Befehls
        cursor.execute(query1, (userid,))
        # Ausführen des zweiten SQL-Befehls
        cursor.execute(query2, (userid,))
        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (userid,))

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

    def delete_by_id(self, userid):
        """
        :param userid: Ist das Nutzerobjekt
        :return:
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls um die Einträge in der users Datenbank zu löschen
        query = """DELETE FROM TeamUP.users WHERE id=%s"""
        # Erstellen des SQL-Befehls um die Einträge in der userInModul Datenbank zu löschen
        query1 = """DELETE FROM TeamUP.userinmodul WHERE userId=%s"""
        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (userid,))
        # Ausführen des zweiten SQL-Befehls
        cursor.execute(query1, (userid,))

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

    def get_modulForUser(self, authId):

        cursor = self._cnx.cursor()

        query = """SELECT modul.bezeichnung From ((TeamUP.modul JOIN TeamUP.userinmodul 
                    ON modul.id = userinmodul.modulId) 
                    JOIN TeamUP.users ON userinmodul.userId = users.id ) WHERE authId=%s"""

        cursor.execute(query, (authId,))
        tuples = cursor.fetchall()

        user = UserBO()
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
