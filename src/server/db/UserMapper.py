from server.bo.UserBO import UserBO
from server.db.Mapper import Mapper
import datetime


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def insert_by_authId(self, nutzer):
        """
        Methode zur Anlegung eines neuen Users in der Datenbank
        :param nutzer: Ist das Nutzerobjekt
        :return: Alle Objekte des UserBO
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """INSERT INTO TeamUP.users (authId, bild, name, geburtsdatum, email,
                beschreibung, lerntyp, gender, semester, studiengang, vorname, frequenz, lernort) 
                VALUES (%s ,%s ,%s ,%s ,%s ,%s ,%s, %s, %s, %s, %s, %s, %s)"""

        # Auslesen der UserBO Daten
        daten = (nutzer.get_authId(), nutzer.get_profilBild(), nutzer.get_name(),
                 datetime.datetime.strptime(nutzer.get_geburtsdatum(), '%Y-%m-%d'), nutzer.get_email(),
                 nutzer.get_beschreibung(), nutzer.get_lerntyp(), nutzer.get_gender(), nutzer.get_semester(),
                 nutzer.get_studiengang(), nutzer.get_vorname(), nutzer.get_frequenz(), nutzer.get_lernort())

        # Ausführen des SQL-Befehls um die UserBO Daten auf die Datenbank zu schreiben
        cursor.execute(query, daten)
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        #cursor.close()

        # Öffnen einer Datenbankverbindung
        #cursor = self._cnx.cursor(prepared=True)

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
        # Bestätigung der Datenbankabfrage/ änderung
        self._cnx.commit()
        cursor.close()

        # Rückgabe aller Userdaten
        return self.find_by_authId(nutzer.get_authId())

    def insert_many(self, users):
        """
        Methode zur Anlegung eines neuen Users in der Datenbank
        :param users: Ist das Nutzerobjekt
        :return: Alle Objekte des UserBO
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """INSERT INTO TeamUP.users (authId, bild, name, geburtsdatum, email,
                beschreibung, lerntyp, gender, semester, studiengang, vorname, frequenz, lernort) 
                VALUES (%s ,%s ,%s ,%s ,%s ,%s ,%s, %s, %s, %s, %s, %s, %s)"""
        for nutzer in users:
            # Auslesen der UserBO Daten
            daten = (nutzer.get_authId(), nutzer.get_profilBild(), nutzer.get_name(),
                     datetime.datetime.strptime(nutzer.get_geburtsdatum(), '%Y-%m-%d'), nutzer.get_email(),
                     nutzer.get_beschreibung(), nutzer.get_lerntyp(), nutzer.get_gender(), nutzer.get_semester(),
                     nutzer.get_studiengang(), nutzer.get_vorname(), nutzer.get_frequenz(), nutzer.get_lernort())

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
            # Bestätigung der Datenbankabfrage/ änderung
        self._cnx.commit()
        cursor.close()

        # Rückgabe aller Userdaten
        return self.find_by_authId(nutzer.get_authId())

    def find_all(self):
        """
        Methode um alle UserBO und die dazugehörigen Module aus der Datenbank zu holen
        :return: Eine Liste mit allen Usern in Objekten gespeichert
        """
        result = []
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, "
                       "gender, semester, studiengang, vorname, frequenz, lernort FROM TeamUP.users")
        tuples = cursor.fetchall()

        for (user_id, authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester, studiengang,
             vorname, frequenz, lernort) in tuples:
            user = UserBO.create_userBO(id=user_id, authId=authId, profilBild=bild, name=name,
                                        geburtsdatum=geburtsdatum, email=email, beschreibung=beschreibung,
                                        lerntyp=lerntyp, gender=gender, semester=semester, studiengang=studiengang,
                                        vorname=vorname, frequenz=frequenz, lernort=lernort)
            # Das Geburtstag wird in das aktuelle Alter umgerechnet.
            user.set_geburtsdatum(user.calculate_age())
            result.append(self.find_modul_by_userid(user))

        # Bestätigung der Datenbankabfrage/ änderung
        self._cnx.commit()
        cursor.close()

        return result

    def find_by_authId(self, user_authid):
        """
        Sucht einen bestimmten User in der Tabelle und gibt die Werte nach vorne durch
        :param user_authid: GoogleID eines bestimmten Users
        :return: Gibt ein UserBO Objekt mit allen Werten eines konkreten Users zurück
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(prepared=True)

        # erstellen des SQL-Befehls um die UserBO Daten abzufragen
        query = """SELECT id, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester, studiengang, 
                    vorname, frequenz, lernort FROM TeamUP.users WHERE authId=%s"""

        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (user_authid,))

        # Speichern der SQL Antwort
        tuples = cursor.fetchall()

        # Auflösen der ersten SQL Antwort (UserBO) und setzen der Parameter
        (user_id, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester,
         studiengang, vorname, frequenz, lernort) = tuples[0]

        user = UserBO.create_userBO(id=user_id, authId=user_authid, profilBild=bild, name=name,
                                    geburtsdatum=geburtsdatum, email=email, beschreibung=beschreibung, lerntyp=lerntyp,
                                    gender=gender, semester=semester, studiengang=studiengang, vorname=vorname,
                                    frequenz=frequenz, lernort=lernort)

        # Das Geburtstag wird in das aktuelle Alter umgerechnet.
        user.set_geburtsdatum(user.calculate_age())
        # Rückgabe des UserBO
        return self.find_modul_by_userid(user)

    def find_by_id(self, user_id):
        """
        :param user_id: Ist die id
        :return: Alle Objekte des UserBO
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(prepared=True)
        # erstellen des SQL-Befehls um die UserBO Daten abzufragen
        query = """SELECT authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester, studiengang, 
                          vorname, frequenz, lernort FROM TeamUP.users WHERE users.id=%s"""

        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (user_id,))
        # Speichern der SQL Antwort
        tuples = cursor.fetchall()

        # Auflösen der ersten SQL Antwort (UserBO) und setzen der Parameter
        (authId, bild, name, geburtsdatum, email, beschreibung, lerntyp, gender, semester,
         studiengang, vorname, frequenz, lernort) = tuples[0]

        user = UserBO.create_userBO(id=user_id, authId=authId, profilBild=bild, name=name,
                                    geburtsdatum=geburtsdatum, email=email, beschreibung=beschreibung, lerntyp=lerntyp,
                                    gender=gender, semester=semester, studiengang=studiengang, vorname=vorname,
                                    frequenz=frequenz, lernort=lernort)

        # Das Geburtstag wird in das aktuelle Alter umgerechnet.
        user.set_geburtsdatum(user.calculate_age())

        # Rückgabe des UserBO
        return self.find_modul_by_userid(user)

    def get_modulId_by_modul(self, modul):
        """
        Sucht nach der Modul ID über die Modul bezeichnung. Wird verwendet, um eine Verbindung zwischen einem User
        und seinen Modulen in der Datenbank zu speichern.
        :param modul: Bekommt ein einzelnes Modul als String
        :return: Modul ID
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """SELECT modul.id FROM TeamUP.modul WHERE bezeichnung=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (modul,))

        # Speichern der SQL Antwort
        modulid = cursor.fetchone()

        # Bestätigung der Datenbankabfrage/ änderung
        self._cnx.commit()

        return modulid[0]

    def find_modul_by_userid(self, user):
        """
        Findet alle Module eines Users
        :param user: Bekommt ein User Objekt mit mindestens der User ID um die Module zu finden
        :return: Übergibt ein User Objekt mit allen Modulen
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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

        # Bestätigung der Datenbankabfrage/ änderung
        self._cnx.commit()
        if self._cnx:
            return user
        else:
            cursor.close()
            return user

    def update_by_authId(self, nutzer):
        """
        Updatet einen Vorhandenen User. Die Transitive Tabelle userInModul wird ebenfalls geupdatet.
        :param nutzer: Ist das Nutzerobjekt mit den neuen Werten
        :return: Das soeben geupdatete Objekt wird wieder nach vorne gegeben
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """UPDATE TeamUP.users SET authId=%s, bild=%s, name=%s, email=%s,
                       beschreibung=%s, lerntyp=%s, gender=%s,semester=%s, studiengang=%s, vorname=%s, 
                       frequenz=%s, lernort=%s WHERE authId=%s"""

        # Auslesen der authId zur weiteren verwendung
        authid = nutzer.get_authId()

        # Auslesen und speichern der restlichen UserBO Daten
        daten = (authid, nutzer.get_profilBild(), nutzer.get_name(), nutzer.get_email(), nutzer.get_beschreibung(),
                 nutzer.get_lerntyp(), nutzer.get_gender(), nutzer.get_semester(), nutzer.get_studiengang(),
                 nutzer.get_vorname(), nutzer.get_frequenz(), nutzer.get_lernort() ,authid)

        # TODO: Ist dieser Aufruf nötig? -> Sollte später kontrolliert werden. Wird aktuell benötigt, um die
        # User ID für das weitere Vorgehen aus der DB zu holen, falls sie falsch übergeben wurde (Postman)
        query_id = """SELECT users.id FROM TeamUP.users WHERE authId=%s"""
        # Ausführen des SQL-Befehls
        cursor.execute(query, daten)
        # Setzt die aktuelle User ID in das Objekt
        cursor.execute(query_id, (authid,))
        nutzer.set_id(cursor.fetchone()[0])
        # Bestätigung der Datenbankabfrage/ änderung
        self._cnx.commit()

        # Erstellen des SQL-Befehls um alle bestehenden einträge des UserBO in userInModule zu löschen
        query1 = """DELETE FROM TeamUP.userinmodul WHERE userId=%s"""
        # Ausführen des SQL-Befehls
        cursor.execute(query1, (nutzer.get_id(),))
        # Bestätigung der Datenbankabfrage/ änderung
        self._cnx.commit()

        # Auslesen und speicher welche Module zu diesem Nutzer gehören
        module = nutzer.get_modul()

        # Für jedes Modul ein Datenbankeintrag erzeugen
        for i in module:
            # Erstellen des SQL-Befehls
            query2 = """INSERT INTO TeamUP.userinmodul( userId, modulId) VALUES (%s, %s)"""
            # Auslesen und speichern der users.id und modul.id
            data = (nutzer.get_id(), self.get_modulId_by_modul(i))
            # cursor_ins.execute(query2, data)
            cursor.execute(query2, data)
        # Bestätigung der Datenbankabfrage/ änderung
        self._cnx.commit()
        cursor.close()
        # TODO MySQL Errorhandling hier einbauen

    def find_modulID_for_matching(self, user_authid):
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(buffered=True)

        # erstellen des SQL-Befehls um die MainUser Daten abzufragen
        query_user = """SELECT id, lerntyp, semester, studiengang, frequenz, lernort FROM TeamUP.users 
                                WHERE authId=%s"""

        # Holt mir alle ModuleIDs von vem MainUser
        query_module = """SELECT modulId FROM TeamUP.userInModul WHERE userId=%s"""

        # Holt die Informationen des MainUsers über die authid
        cursor.execute(query_user, (user_authid,))
        tuple_mainUser = cursor.fetchone()

        # Holt mir alle ModuleIDs von dem MainUser
        cursor.execute(query_module, (tuple_mainUser[0],))
        tuple_mainModul = cursor.fetchall()

        # Erstellt mir ein UserBO des aktuellen Users
        mainUserBO = UserBO.create_matching_userBO(id=tuple_mainUser[0], lerntyp=tuple_mainUser[1],
                                                   semester=tuple_mainUser[2], studiengang=tuple_mainUser[3],
                                                   frequenz=tuple_mainUser[4], lernort=tuple_mainUser[5])

        # Speichert mir alle Module des Users in das BO
        for i in tuple_mainModul:  # Löst die Liste von fetchall auf
            for x in i:  # Löse den Tuple von der Liste auf
                mainUserBO.set_module_append(x)

        cursor.close()
        return mainUserBO

    def matching_method(self, user_authid):
        """
        Sucht alle passenden Kandidaten, die für das Matching in Frage kommen. Dafür sucht man den aktuellen User über
        die authID und sucht alle Module in dem er sich befindet. Über die ModulID sucht man alle User die im selben
        Modul sind und speichert alle Informationen des Kandidaten.
        :param user_authid: GoogleID des aktuellen Users
        :return: Als Rückgabe erhalt man den aktuellen User mit allen relevanten Informationen und eine Liste mit
        User Objekten die für das Matching in Frage kommen.
        """
        # Speichert jeden User der für den Algo in Frage kommt; Wird im return Übergeben
        matching_users = []

        # Speichert alle User, die in den selben Modulen sind
        users_in_modul = []

        # Die Variable users speichert alle Users, die für das Matching in Frage kommen
        # Datentyp SET wird genutzt, um sicher zu gehen, dass die User nur einmal vorkommen
        unsorted_users = set()

        mainUserBO = self.find_modulID_for_matching(user_authid)

        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(buffered=True)

        query3 = """SELECT userId FROM TeamUP.userInModul WHERE modulId=%s"""

        # Holt alle User, die in den selben Modulen sind wie der aktuelle User
        for modul_id in mainUserBO.get_modul():
            cursor.execute(query3, (modul_id,))
            match_user = cursor.fetchall()
            users_in_modul.append(match_user)

        for i in users_in_modul:  # Löst die Liste von fetchall auf
            for x in i:  # Löse den Tuple von der Liste auf
                # Stellt sicher, dass der aktuelle User nicht berücksichtigt wird
                if x[0] == mainUserBO.get_id():
                    continue
                else:
                    unsorted_users.add(x[0])

        query_matching_user = """SELECT id, lerntyp, semester, studiengang, frequenz, lernort FROM TeamUP.users 
                                 WHERE id=%s"""

        # Es werden alle benötigten Informationen jedes Users geholt und in einem UserBO gespeichert
        for user in unsorted_users:
            cursor.execute(query_matching_user, (user, ))
            tuple_user = cursor.fetchone()
            user = UserBO.create_matching_userBO(id=tuple_user[0], lerntyp=tuple_user[1], semester=tuple_user[2],
                                                 studiengang=tuple_user[3], frequenz=tuple_user[4],
                                                 lernort=tuple_user[5])

            matching_users.append(user)

        return mainUserBO, matching_users

    ###################################################################################################################
    # Nicht genutzt Methoden
    ###################################################################################################################

    def delete_by_authId(self, user_authid):
        """
        :param user_authid: Die GoogleID des zu löschenden Users
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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

    # TODO Wird das noch benötigt?
    def find_by_name(self, name):

        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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

    # TODO: Alte Version von Update. Soll noch drinnen bleiben. Wird beim Refactoring entfernt.
    def update_by_authId2(self, nutzer):
        """
        :param nutzer: Ist das Nutzerobjekt
        :return: Das soeben geupdatete Objekt wird wieder nach vorne gegeben
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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

        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(prepared=True)
        # Erstellen des SQL-Befehls um alle bestehenden einträge des UserBO in userInModule zu löschen
        query1 = """DELETE FROM TeamUP.userinmodul WHERE userId=%s"""
        # Ausführen des SQL-Befehls
        cursor.execute(query1, (nutzer.get_id(),))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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

    # TODO: Wird diese Methode benötigt?
    def update_by_id(self, nutzer):
        """
        :param nutzer: Ist das Nutzerobjekt
        :return: Das soeben geupdatete Objekt wird wieder nach vorne gegeben
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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

        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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

    # TODO: Wird diese Methode benötigt?
    def delete_by_id(self, userid):
        """
        :param userid: Ist das Nutzerobjekt
        :return:
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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

    # TODO: Wird diese Methode benötigt?
    def get_modulForUser(self, authId):
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
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

    # TODO: Wird diese Methode benötigt?
    def get_Id_by_authId(self, authId):
        """
        :param authId: Ist die authId
        :return: modulid
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """SELECT users.id FROM TeamUP.users WHERE authId=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (authId,))

        # Speichern der SQL-Antwort
        userid = cursor.fetchone()

        # Bestätigung der Datenbankabfrage/ änderung
        self._cnx.commit()
        cursor.close()
        # Rückgabe der UserId
        return userid[0]

    # TODO: Wird diese Methode benötigt?
    def delete_gruppe_by_id(self, authId):
        """
        :param authId:
        :return: void
        """
        pass

    # TODO: Wird diese Methode benötigt?
    def join_gruppe_by_id(self, authId):
        """
        :param authId:
        :return:
        """
        pass
