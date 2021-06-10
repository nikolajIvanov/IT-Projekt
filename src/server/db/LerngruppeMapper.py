from server.bo.Lerngruppe import Lerngruppe
from server.db.Mapper import Mapper
import mysql.connector.errors
from werkzeug.exceptions import InternalServerError
from server.db.UserMapper import UserMapper


class LerngruppeMapper(Mapper):

    def __init__(self):
        super().__init__()

    def matching_method(self, user_authid):
        """
        Sucht alle passenden Kandidaten, die für das Matching in Frage kommen. Dafür sucht man den aktuellen User über
        die authID und sucht alle Module in dem er sich befindet. Über die ModulID sucht man alle Lerngruppen, welche
        das selbe Modul anbieten und speichert alle Informationen des Kandidaten.
        :param user_authid: GoogleID des aktuellen Users
        :return: Als Rückgabe erhalt man den aktuellen User mit allen relevanten Informationen und eine Liste mit
        Lerngruppen Objekten die für das Matching in Frage kommen.
        """
        # Speichert jeden User der für den Algo in Frage kommt; Wird im return Übergeben
        matching_gruppen = []

        # Speichert alle User, die in den selben Modulen sind
        lerngruppe_in_modul = []

        # Die Variable users speichert alle Users, die für das Matching in Frage kommen
        # Datentyp SET wird genutzt, um sicher zu gehen, dass die User nur einmal vorkommen
        unsorted_gruppen = set()
        with UserMapper() as usermapper:
            mainUserBO = usermapper.find_modulID_for_matching(user_authid)

        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(buffered=True)

        query3 = """SELECT lerngruppeId FROM TeamUP.lerngruppeInModul WHERE modulId=%s"""

        # Holt alle Lerngruppen, die in den selben Modulen sind wie der aktuelle User
        for modul_id in mainUserBO.get_modul():
            cursor.execute(query3, (modul_id,))
            match_user = cursor.fetchall()
            lerngruppe_in_modul.append(match_user)

        for i in lerngruppe_in_modul:  # Löst die Liste von fetchall auf
            for x in i:  # Löse den Tuple von der Liste auf
                unsorted_gruppen.add(x[0])

        query_matching_gruppe = """SELECT id, lerntyp, frequenz, lernort FROM TeamUP.lerngruppe WHERE id=%s"""

        # Es werden alle benötigten Informationen jedes Users geholt und in einem UserBO gespeichert
        for gruppe in unsorted_gruppen:
            cursor.execute(query_matching_gruppe, (gruppe,))
            tuple_gruppe = cursor.fetchone()
            gruppe = Lerngruppe.create_matching_lerngruppenBO(id=tuple_gruppe[0], lerntyp=tuple_gruppe[1],
                                                              frequenz=tuple_gruppe[2], lernort=tuple_gruppe[3])

            matching_gruppen.append(gruppe)

        return mainUserBO, matching_gruppen

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

        try:
            result = []
            cursor = self._cnx.cursor(prepared=True)
            # Daten von lerngruppe
            cursor.execute("""SELECT id, lerntyp, name, beschreibung, bild, admin from TeamUP.lerngruppe""")
            tuples = cursor.fetchall()
            #Überprüft ob werte in tuples gescheirt sind wenn nicht wird ein Fehler geworfen
            if  not tuples:
                cursor.close()
                raise InternalServerError('Keine Lerngruppen vorhanden')
            for (id, lerntyp, name, beschreibung, profilbild, admin) in tuples:
                lerngruppe = Lerngruppe()
                lerngruppe.set_id(id)
                lerngruppe.set_lerntyp(lerntyp)
                lerngruppe.set_name(name)
                lerngruppe.set_beschreibung(beschreibung)
                lerngruppe.set_profilBild(profilbild)
                lerngruppe.set_admin(admin)

                # erstellen des SQL-Befehls um abzufragen welche Module einer Lerngruppe zugeordnet sind
                query1 = """SELECT teamup.modul.bezeichnung FROM teamup.modul JOIN teamup.lerngruppeinmodul lim 
                                        ON modul.id = lim.modulId WHERE lim.lerngruppeId =%s"""

                # Ausführen des zweiten SQL-Befehls
                cursor.execute(query1, (lerngruppe.get_id(),))
                # Speichern der SQL Antwort
                tupel1 = cursor.fetchall()

                # Auflösen der zweiten SQL Antwort (Module der Lerngruppe) und setzen des Parameters
                for i in tupel1:
                    for x in i:
                        lerngruppe.set_module_append(x)

                # erstellen des SQL-Befehls um abzufragen welche Mitglieder eine Lerngruppe besitzt
                query2 = """SELECT teamup.userinlerngruppe.userId FROM teamup.userinlerngruppe 
                                            WHERE teamup.userinlerngruppe.lerngruppeId =%s"""
                # Ausführen des zweiten SQL-Befehls
                cursor.execute(query2, (lerngruppe.get_id(),))
                # Speichern der SQL Antwort
                tupel2 = cursor.fetchall()

                # Auflösen der zweiten SQL Antwort (Mitglieder der Lerngruppe) und setzen des Parameters
                for i in tupel2:
                    for x in i:
                        lerngruppe.set_mitglieder_append(x)

                result.append(lerngruppe)
            self._cnx.commit()
            cursor.close()
            return result
        except mysql.connector.Error as err:
            cursor.close()
            raise InternalServerError(err.msg)

    def find_by_name(self, lerngruppe):
        result = []
        cursor = self._cnx.cursor()

        # LerngruppenID bekommen über name
        query1 = """SELECT id FROM teamup.lerngruppe WHERE name = (%s) """

        # Abfrage für gruppen_id
        cursor.execute(query1, lerngruppe.get_name())

        # gruppen_id is die ID um die lerngruppe in der TABLE zu finden
        gruppen_id = cursor.fetchall()

        # Query um alle informationen einer bestimmten lerngruppe zu bekommen
        query = """SELECT id,lerntyp, name, beschreibung, bild, admin from TeamUP.lerngruppe
        WHERE name = (%s)"""

        # daten für die Query
        data = gruppen_id

        cursor.execute(query, data)

        # lerngruppendaten
        tupel = cursor.fetchall()

        (id, modul, name, beschreibung, profilbild, admin, mitglieder) = tupel[0]
        lerngruppe = Lerngruppe()
        lerngruppe.set_id(id)
        lerngruppe.set_modul(modul)
        lerngruppe.set_name(name)
        lerngruppe.set_beschreibung(beschreibung)
        lerngruppe.set_profilBild(profilbild)
        lerngruppe.set_admin(admin)
        lerngruppe.set_mitglieder(mitglieder)
        result.append(lerngruppe)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, gruppenId):
        try:
            cursor = self._cnx.cursor()

            # Query um alle informationen einer bestimmten lerngruppe zu bekommen
            query = """SELECT lerntyp, name, beschreibung, bild, admin, frequenz, lernort FROM TeamUP.lerngruppe 
            WHERE id = (%s)"""

            # Ausführen des ersten SQL-Befehls
            cursor.execute(query, (gruppenId,))

            # Speichern der SQL Antwort
            tupel = cursor.fetchall()


            # Auflösen der ersten SQL Antwort (Lerngruppe) und setzen der Parameter
            (lerntyp, name, beschreibung, bild, admin, frequenz, lernort) = tupel[0]
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(gruppenId)
            lerngruppe.set_lerntyp(lerntyp)
            lerngruppe.set_name(name)
            lerngruppe.set_beschreibung(beschreibung)
            lerngruppe.set_profilBild(bild)
            lerngruppe.set_admin(admin)
            lerngruppe.set_frequenz(frequenz)
            lerngruppe.set_lernort(lernort)

            #erstellen des SQL-Befehls um abzufragen welche Module einer Lerngruppe zugeordnet sind
            query1 = """SELECT teamup.modul.bezeichnung FROM teamup.modul JOIN teamup.lerngruppeinmodul lim 
                        ON modul.id = lim.modulId WHERE lim.lerngruppeId =%s"""
            # Ausführen des zweiten SQL-Befehls
            cursor.execute(query1, (gruppenId,))
            # Speichern der SQL Antwort
            tupel1 = cursor.fetchall()

            # Auflösen der zweiten SQL Antwort (Module der Lerngruppe) und setzen des Parameters
            for i in tupel1:
                for x in i:
                    lerngruppe.set_module_append(x)

            # erstellen des SQL-Befehls um abzufragen welche Mitglieder eine Lerngruppe besitzt
            query2 = """SELECT teamup.userinlerngruppe.userId FROM teamup.userinlerngruppe 
                        WHERE teamup.userinlerngruppe.lerngruppeId =%s"""
            # Ausführen des zweiten SQL-Befehls
            cursor.execute(query2, (gruppenId,))
            # Speichern der SQL Antwort
            tupel2 = cursor.fetchall()

            # Auflösen der zweiten SQL Antwort (Mitglieder der Lerngruppe) und setzen des Parameters
            for i in tupel2:
                for x in i:
                    lerngruppe.set_mitglieder_append(x)
            cursor.close()
            return lerngruppe
        except IndexError:
            cursor.close()
            raise InternalServerError('Die gesuchte Gruppe exestiert nicht')
        except mysql.connector.Error as err:
            cursor.close()
            raise InternalServerError(err.msg)




    def find_by_id_test(self, gruppenId):
        try:
            cursor = self._cnx.cursor()

            # Query um alle informationen einer bestimmten lerngruppe zu bekommen
            query = """SELECT lerntyp, name, beschreibung, bild, admin, frequenz, lernort FROM TeamUP.lerngruppe 
            WHERE id = (%s)"""

            # Ausführen des ersten SQL-Befehls
            cursor.execute(query, (gruppenId,))

            # Speichern der SQL Antwort
            tupel = cursor.fetchall()

            #Abbrechen der Suche da die Gruppe nicht vorhanden ist
            if not tupel:
                return (400, 'Keine Gruppe gefunden')
            # Auflösen der ersten SQL Antwort (Lerngruppe) und setzen der Parameter
            (lerntyp, name, beschreibung, bild, admin, frequenz, lernort) = tupel[0]
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(gruppenId)
            lerngruppe.set_lerntyp(lerntyp)
            lerngruppe.set_name(name)
            lerngruppe.set_beschreibung(beschreibung)
            lerngruppe.set_profilBild(bild)
            lerngruppe.set_admin(admin)
            lerngruppe.set_frequenz(frequenz)
            lerngruppe.set_lernort(lernort)

            #erstellen des SQL-Befehls um abzufragen welche Module einer Lerngruppe zugeordnet sind
            query1 = """SELECT teamup.modul.bezeichnung FROM teamup.modul JOIN teamup.lerngruppeinmodul lim 
                        ON modul.id = lim.modulId WHERE lim.lerngruppeId =%s"""
            # Ausführen des zweiten SQL-Befehls
            cursor.execute(query1, (gruppenId,))
            # Speichern der SQL Antwort
            tupel1 = cursor.fetchall()

            # Auflösen der zweiten SQL Antwort (Module der Lerngruppe) und setzen des Parameters
            for i in tupel1:
                for x in i:
                    lerngruppe.set_module_append(x)

            # erstellen des SQL-Befehls um abzufragen welche Mitglieder eine Lerngruppe besitzt
            query2 = """SELECT teamup.userinlerngruppe.userId FROM teamup.userinlerngruppe 
                        WHERE teamup.userinlerngruppe.lerngruppeId =%s"""
            # Ausführen des zweiten SQL-Befehls
            cursor.execute(query2, (gruppenId,))
            # Speichern der SQL Antwort
            tupel2 = cursor.fetchall()

            # Auflösen der zweiten SQL Antwort (Mitglieder der Lerngruppe) und setzen des Parameters
            for i in tupel2:
                for x in i:
                    lerngruppe.set_mitglieder_append(x)

            return lerngruppe
        except mysql.connector.Error as err:
            return 400, err.msg

    def insert_lerngruppe(self, lerngruppe):
        """
        Erstellt eine neue Lerngruppe in der Datenbank
        :param lerngruppe: Objekt der Klasse Lerngruppe
        :return lerngruppenID aus Datenbank
        """
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)

            # Erstellen des SQL-Befehls für TABLE lerngruppe
            query = """INSERT INTO teamup.lerngruppe (name, beschreibung, bild, lerntyp,admin, frequenz, lernort) 
                       VALUES (%s ,%s ,%s ,%s ,%s, %s ,%s)"""
            # Erstellen des SQL-Befehls für TABLE userInLerngruppe für den admin

            # Daten für lerngruppe
            daten = (lerngruppe.get_name(), lerngruppe.get_beschreibung(),
                     lerngruppe.get_profilBild(), lerngruppe.get_lerntyp(),
                     lerngruppe.get_admin(), lerngruppe.get_frequenz(), lerngruppe.get_lernort())

            # Ausführen des SQL-Befehls für lerngruppe
            cursor.execute(query, daten)

            gruppenId = cursor.lastrowid

            gruppenMitglieder = lerngruppe.get_mitglieder()

            # Schleife setzt mitglieder in die UserInLerngruppe Tabelle
            for i in gruppenMitglieder:
                query1 = """INSERT INTO teamup.userinlerngruppe(userId, lerngruppeId) VALUES (%s, %s)"""
                data1 = (i, gruppenId)
                cursor.execute(query1, data1)

            gruppenModule = lerngruppe.get_modul()
            for i in gruppenModule:
                query2 = """INSERT INTO teamup.lerngruppeinmodul (lerngruppeId, modulId) VALUES (%s, %s) """
                data2 = (gruppenId, self.get_modulId_by_modul(i))
                cursor.execute(query2, data2)
            self._cnx.commit()
            cursor.close()
            return 200
        except mysql.connector.Error as err:
            cursor.close()
            raise InternalServerError(err.msg)

    def insert_user(self, lerngruppe):
        """
        :param lerngruppe:
        :return gruppen_id:
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)
        gruppenMitglieder = lerngruppe.get_mitglieder()
        for i in gruppenMitglieder:
            query1 = """INSERT INTO teamup.userinlerngruppe(userId, lerngruppeId) VALUES (%s, %s)"""
            data1 = (i, lerngruppe.get_id())
            cursor.execute(query1,(data1))

        self._cnx.commit()
        cursor.close()
        return self.find_by_id(lerngruppe.get_id())

    def delete_user_from_lerngruppe(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)
        alteMitglieder = lerngruppe.get_mitglieder()

        for i in alteMitglieder:
            #LerngruppenID bekommen über name
            query = """DELETE FROM teamup.userInLerngruppe WHERE teamup.userInLerngruppe.userId = %s
                        AND teamup.userinlerngruppe.lerngruppeId = %s"""
            # Mitglied ist in Liste Mitglied als einziges Element
            cursor.execute(query,(i,lerngruppe.get_id()))

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        return self.find_by_id(lerngruppe.get_id())

    def update_info_from_lerngruppe_by_id(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls um lerngruppendaten zu holen
        query = """UPDATE teamup.lerngruppe SET bild=%s, name=%s, beschreibung=%s, admin=%s,
                        lerntyp=%s WHERE lerngruppe.id=%s"""
        # Auslesen und speichern der restlichen UserBO Daten
        daten = (lerngruppe.get_profilBild(), lerngruppe.get_name(), lerngruppe.get_beschreibung(),
                 lerngruppe.get_admin(), lerngruppe.get_lerntyp(), lerngruppe.get_id())
        cursor.execute(query,(daten))
        self._cnx.commit()
        cursor.close()
        # Erstellen des SQL-Befehls um alle bestehenden einträge der Gruppe in gruppeInModule zu löschen
        query1 = """DELETE FROM TeamUP.lerngruppeinmodul WHERE teamup.lerngruppeinmodul.lerngruppeId=%s"""
        # Ausführen des SQL-Befehls
        cursor.execute(query1, lerngruppe.get_id())
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        # Öffnen einer Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)
        # Auslesen und speicher welche Module zu dieser Gruppe gehören
        module = lerngruppe.get_modul()

        # Für jedes Modul ein Datenbankeintrag erzeugen
        for i in module:
            # Erstellen des SQL-Befehls
            query2 = """INSERT INTO TeamUP.lerngruppeinmodul(lerngruppeId, modulId)  VALUES (%s, %s)"""
            # Auslesen und speichern der users.id und modul.id
            data = (lerngruppe.get_id(), self.get_modulId_by_modul(i))
            # (Bitte kein Komma nach data) Ausführen des SQL-Befehls
            cursor.execute(query2, (data))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

    def update_info_from_lerngruppe(self, lerngruppe):

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # LerngruppenID bekommen über name
        query1 = """SELECT id FROM teamup.lerngruppe WHERE name = (%s) """

        # gruppen_id is die ID um den admin und user in die TABLES speichern zu können
        cursor.execute(query1, lerngruppe.get_name())
        gruppen_id = cursor.fetchall()

        # Erstellen des SQL-Befehls um lerngruppendaten zu holen
        query = """UPDATE teamup.lerngruppe SET bild=%s, name=%s, beschreibung=%s, admin=%s,
                        lerntyp=%s WHERE lerngruppe.id=%s"""

        # Auslesen und speichern der restlichen UserBO Daten
        daten = (lerngruppe.get_profilBild(), lerngruppe.get_name(), lerngruppe.get_beschreibung(),
                 lerngruppe.get_admin(), lerngruppe.get_lerntyp())

        # Erstellen des SQL-Befehls um das Lerngruppenmodul anzupassen
        query1 = """UPDATE teamup.lerngruppeInModul SET modulId=%s  
                    WHERE lerngruppeId=%s """

        # Daten für das Update der TABLE lerngruppeInModul
        daten1 = (gruppen_id, lerngruppe.get_modul())

        # Ausführen des SQL-Befehls für die lerngruppen TABLE Daten
        cursor.execute(query, daten)

        # Ausführen des SQL-Befehls für die lerngruppeInModul TABLE Daten
        cursor.execute(query1, daten1)

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

    def check_name(self, lerngruppe):
        """
        :param lerngruppe:
        :return Liste mit Namen:
        """
        result = []

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # LerngruppenID bekommen über name
        query = """SELECT name FROM teamup.lerngruppe"""

        # SQL Abfrage und speicherung der Datenmenge in names
        cursor.execute(query)
        names = cursor.fetchall()

        # Namen in result speichern
        for name in names:
            lerngruppe.set_name(name)
            result.append(name)

        return result

    def delete_gruppe(self, gruppen_id):
        """
        :param lerngruppe:
        :return:
        """
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)

            # Lerngruppen über die ID löschen
            query = """DELETE FROM teamup.lerngruppe WHERE id=%s """

            # Lerngruppe in lerngruppeInModul TABLE löschen
            query1 = """DELETE FROM teamup.lerngruppeInModul WHERE lerngruppeId=%s """

            # Lerngruppe in lerngruppeInModul TABLE löschen
            query2 = """DELETE FROM teamup.userinlerngruppe WHERE lerngruppeId=%s """

            # Lerngruppen Id
            data = gruppen_id

            # Löschen des userinGruppe Eintrag
            cursor.execute(query2, (data,))

             # Löschen des lerngruppeInModul-Eintrags
            cursor.execute(query1, (data,))

             # Löschen der lergruppe
            cursor.execute(query, (data,))

            self._cnx.commit()
            cursor.close()
            return 200

        except mysql.connector.Error as err:
            cursor.close()
            raise InternalServerError(err.msg)

