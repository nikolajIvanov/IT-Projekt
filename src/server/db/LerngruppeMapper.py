from server.bo.Lerngruppe import Lerngruppe
from server.db.Mapper import Mapper
from server.db.RequestMapper import RequestMapper
import mysql.connector.errors
from werkzeug.exceptions import InternalServerError
from server.db.ChatMapper import ChatMapper


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

        # Speichert alle Lerngruppen in welchen ich bereits mitglied bin
        connected_groups = []

        # Die Variable users speichert alle Users, die für das Matching in Frage kommen
        # Datentyp SET wird genutzt, um sicher zu gehen, dass die User nur einmal vorkommen
        unsorted_gruppen = set()

        main_user_bo = self.find_modul_id_for_matching(user_authid)

        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(buffered=True)

        # Query erstellen um Gruppen zu finden in welchen ich bereits mitglied bin
        user_gruppen = """SELECT lerngruppeId from TeamUP.userInLerngruppe WHERE userId=%s"""

        # Alle Lerngruppen abrufen in welchen der User bereits Mitglied ist
        cursor.execute(user_gruppen, (self.find_userid_by_authid(user_authid),))
        u_gruppen = cursor.fetchall()

        for tuples in u_gruppen:
            for gruppe in tuples:
                connected_groups.append(gruppe)

        # Query erstellen um Lerngruppen zu finden an welche ich schon eine Anfrage gestellt habe
        angefragte_lerngruppe = """SELECT anGruppenid from TeamUP.gruppeAdmitted WHERE vonUserid=%s"""

        # Alle Lerngruppen finden an die ich schon eine Anfrage gestellt habe
        cursor.execute(angefragte_lerngruppe, (self.find_userid_by_authid(user_authid),))
        anfragen = cursor.fetchall()
        for tuples in anfragen:
            for anfrage in tuples:
                connected_groups.append(anfrage)

        query3 = """SELECT lerngruppeId FROM TeamUP.lerngruppeInModul WHERE modulId=%s"""

        # Holt alle Lerngruppen, die in den selben Modulen sind wie der aktuelle User
        for modul_id in main_user_bo.get_modul():
            cursor.execute(query3, (modul_id,))
            match_user = cursor.fetchall()
            lerngruppe_in_modul.append(match_user)

        for i in lerngruppe_in_modul:  # Löst die Liste von fetchall auf
            for x in i:  # Löse den Tuple von der Liste auf
                unsorted_gruppen.add(x[0])

        for gruppe in connected_groups:
            if gruppe in unsorted_gruppen:
                unsorted_gruppen.remove(gruppe)
            else:
                pass

        query_matching_gruppe = """SELECT id, lerntyp, frequenz, lernort FROM TeamUP.lerngruppe WHERE id=%s"""

        # Es werden alle benötigten Informationen jedes Users geholt und in einem UserBO gespeichert
        for gruppe in unsorted_gruppen:
            cursor.execute(query_matching_gruppe, (gruppe,))
            tuple_gruppe = cursor.fetchone()
            gruppe = Lerngruppe.create_matching_lerngruppen_bo(id=tuple_gruppe[0], lerntyp=tuple_gruppe[1],
                                                               frequenz=tuple_gruppe[2], lernort=tuple_gruppe[3])

            matching_gruppen.append(gruppe)

        return main_user_bo, matching_gruppen

    def find_all(self):

        try:
            result = []
            cursor = self._cnx.cursor(prepared=True)
            # Daten von lerngruppe
            cursor.execute("""SELECT id, lerntyp, name, beschreibung, bild, admin, frequenz, lernort 
                              FROM TeamUP.lerngruppe""")
            tuples = cursor.fetchall()

            # Überprüft ob Werte in tuples gescheitert sind wenn nicht wird ein Fehler geworfen
            if not tuples:
                cursor.close()
                raise InternalServerError('Keine Lerngruppen vorhanden')
            # Erstellt mit den erhaltenen daten alle Lerngruppen und fügt sie zur Liste 'result' hinzu
            for (gruppen_id, lerntyp, name, beschreibung, profilBild, admin, frequenz, lernort) in tuples:
                lerngruppe = Lerngruppe.create_lerngruppe_bo(id=gruppen_id, lerntyp=lerntyp, name=name,
                                                             beschreibung=beschreibung, profilBild=profilBild,
                                                             admin=admin, frequenz=frequenz, lernort=lernort)

                self.find_lerngruppe_in_modul(lerngruppe)
                self.find_user_in_lerngruppe(lerngruppe)
                result.append(lerngruppe)

            cursor.close()
            # Gibt Liste 'result' zurück
            return result
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def find_lerngruppe_in_modul(self, lerngruppe):
        """
        Findet alle Module, die eine Lerngruppe anbietet.
        :param lerngruppe: Lerngruppen BO, in der die Module eingetragen werden soll
        """
        cursor = self._cnx.cursor(prepared=True)

        # erstellen des SQL-Befehls um abzufragen welche Module einer Lerngruppe zugeordnet sind
        query_module = """SELECT modul.bezeichnung FROM TeamUP.modul JOIN TeamUP.lerngruppeinmodul lim 
                                                ON modul.id = lim.modulId WHERE lim.lerngruppeId =%s"""
        # Ausführen des zweiten SQL-Befehls
        cursor.execute(query_module, (lerngruppe.get_id(),))
        tupel1 = cursor.fetchall()

        # Auflösen der SQL Antwort (Module der Lerngruppe) und setzen des Parameters
        for i in tupel1:
            for x in i:
                lerngruppe.set_module_append(x)

        cursor.close()

    def find_user_in_lerngruppe(self, lerngruppe):
        """
        Findet alle Mitglieder eine Lerngruppe
        :param lerngruppe: Lerngruppen BO, in der die Mitglieder eingetragen werden soll
        """
        cursor = self._cnx.cursor(prepared=True)

        # erstellen des SQL-Befehls um abzufragen welche Mitglieder eine Lerngruppe besitzt
        query_user_in_lerngruppe = """SELECT teamup.userinlerngruppe.userId FROM teamup.userinlerngruppe 
                                                    WHERE teamup.userinlerngruppe.lerngruppeId =%s"""
        # Ausführen des zweiten SQL-Befehls
        cursor.execute(query_user_in_lerngruppe, (lerngruppe.get_id(),))
        tupel2 = cursor.fetchall()

        # Auflösen der SQL Antwort (Mitglieder der Lerngruppe) und setzen des Parameters
        for i in tupel2:
            for x in i:
                lerngruppe.set_mitglieder_append(x)

        cursor.close()

    def find_by_id(self, gruppen_id):
        try:
            cursor = self._cnx.cursor()

            # Query um alle informationen einer bestimmten lerngruppe zu bekommen
            query = """SELECT lerntyp, name, beschreibung, bild, admin, frequenz, lernort FROM TeamUP.lerngruppe 
            WHERE id = (%s)"""

            # Ausführen des ersten SQL-Befehls
            cursor.execute(query, (gruppen_id,))

            # Speichern der SQL Antwort
            tupel = cursor.fetchone()

            # Auflösen der ersten SQL Antwort (Lerngruppe) und setzen der Parameter
            (lerntyp, name, beschreibung, profilBild, admin, frequenz, lernort) = tupel
            lerngruppe = Lerngruppe.create_lerngruppe_bo(id=gruppen_id, lerntyp=lerntyp, name=name,
                                                         beschreibung=beschreibung, profilBild=profilBild,
                                                         admin=admin, frequenz=frequenz, lernort=lernort)

            self.find_lerngruppe_in_modul(lerngruppe)
            self.find_user_in_lerngruppe(lerngruppe)
            cursor.close()
            return lerngruppe
        except IndexError:
            raise InternalServerError('Die gesuchte Gruppe existiert nicht')
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def insert_lerngruppe(self, lerngruppe):
        """
        Erstellt eine neue Lerngruppe in der Datenbank
        :param lerngruppe: Objekt der Klasse Lerngruppe
        :return Statuscode: 200 für erfolgreiches Anlegen
        """
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)

            # Erstellen des SQL-Befehls für TABLE lerngruppe
            query = """INSERT INTO teamup.lerngruppe (name, beschreibung, bild, lerntyp,admin, frequenz, lernort 
                                                      ) VALUES (%s ,%s ,%s ,%s ,%s, %s ,%s)"""
            # Daten für lerngruppe
            daten = (lerngruppe.get_name(), lerngruppe.get_beschreibung(), lerngruppe.get_profil_bild(),
                     lerngruppe.get_lerntyp(), lerngruppe.get_admin(), lerngruppe.get_frequenz(),
                     lerngruppe.get_lernort())

            # Ausführen des SQL-Befehls für lerngruppe
            cursor.execute(query, daten)
            self._cnx.commit()
            # Holt die aktuelle GruppenId, die erstellt worden ist
            gruppen_id = cursor.lastrowid

            gruppen_mitglieder = lerngruppe.get_mitglieder()

            # Chatmapper aufrufen um einen room zu erstellen und mitglieder einem Room zuzuordnen
            with ChatMapper() as mapper:
                mapper.create_learngruppen_room(lerngruppe, gruppen_id)

            # Schleife setzt Mitglieder in die UserInLerngruppe Tabelle
            for mitglied in gruppen_mitglieder:
                query1 = """INSERT INTO teamup.userinlerngruppe(userId, lerngruppeId) VALUES (%s, %s)"""
                data1 = (mitglied, gruppen_id)
                cursor.execute(query1, data1)

            query2 = """INSERT INTO teamup.lerngruppeinmodul (lerngruppeId, modulId) VALUES (%s, %s) """
            data2 = (gruppen_id, self.get_modul_id_by_modul(lerngruppe.get_modul()))
            cursor.execute(query2, data2)
            self._cnx.commit()
            cursor.close()
            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def insert_user(self, new_mitglied):
        """
        Speichert ein neues Mitglied in der Lerngruppe
        :param new_mitglied: Liste mit GruppenID und UserID
        :return: Statuscode: 200 Wenn das anlegen erfolgreich war
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            query1 = """INSERT INTO TeamUP.userinlerngruppe(userId, lerngruppeId) VALUES (%s, %s)"""
            data1 = (new_mitglied[1], new_mitglied[0])
            cursor.execute(query1, data1)
            self._cnx.commit()

            query1 = """ SELECT id  FROM TeamUP.room WHERE groupId = %s """
            cursor.execute(query1, (new_mitglied[0],))
            roomid = cursor.fetchone()

            # Mitglied in Chatroom eintragen
            query2 = """INSERT INTO TeamUP.userinroom(userId, roomId) VALUES (%s, %s) """
            cursor.execute(query2, (new_mitglied[1], roomid[0]))

            self._cnx.commit()
            cursor.close()

            mapper = RequestMapper(cnx=self._cnx)
            mapper.accept_gruppen_request(new_mitglied)

            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    # TODO In bearbeitung
    # TODO: Muss als Parameter authId und lerngruppenID übergeben bekommen
    def delete_user_from_lerngruppe(self, altes_mitglied):
        """
        Löscht den aktuellen User aus der Lerngruppe
        :param altes_mitglied: Liste mit GruppenID und UserID
        :return: Statuscode: 200 Wenn das anlegen erfolgreich war
        """
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)
            # User aus der Userinlerngruppe Tabelle löschen
            query = """DELETE FROM teamup.userInLerngruppe WHERE teamup.userInLerngruppe.userId = %s
                       AND teamup.userinlerngruppe.lerngruppeId = %s"""

            # Mitglied ist in Liste Mitglied als einziges Element
            cursor.execute(query, (altes_mitglied[1], altes_mitglied[0]))
            # Gibt mir die Id des Gruppenraumes zurück
            query1 = """ SELECT teamup.room.id  FROM teamup.room WHERE teamup.room.groupId = %s """
            cursor.execute(query1, (altes_mitglied[0],))
            roomid = cursor.fetchone()

            # Mitglied aus Chatroom löschen
            query2 = """DELETE FROM teamup.userinroom WHERE teamup.userinroom.userId = %s 
                        AND teamup.userinroom.roomId = %s """
            cursor.execute(query2, (altes_mitglied[1], roomid[0]))

            # Schließen der Datenbankverbindung
            self._cnx.commit()
            cursor.close()
            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def update_lerngruppe(self, lerngruppe):
        """
        Updatet eine komplette Lerngruppe mit allen Werten
        :param lerngruppe:
        :return: 200 wenn die Gruppe aktualisiert wurde
        """
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)

            # Erstellen des SQL-Befehls um lerngruppendaten zu holen
            query = """UPDATE teamup.lerngruppe SET bild=%s, name=%s, beschreibung=%s, admin=%s,
                            lerntyp=%s WHERE lerngruppe.id=%s"""
            # Auslesen und speichern der restlichen UserBO Daten
            daten = (lerngruppe.get_profil_bild(), lerngruppe.get_name(), lerngruppe.get_beschreibung(),
                     lerngruppe.get_admin(), lerngruppe.get_lerntyp(), lerngruppe.get_id())
            cursor.execute(query, daten)

            self._cnx.commit()

            # Erstellen des SQL-Befehls um alle bestehenden einträge der Gruppe in gruppeInModule zu löschen
            query1 = """DELETE FROM TeamUP.lerngruppeinmodul WHERE teamup.lerngruppeinmodul.lerngruppeId=%s"""
            # Ausführen des SQL-Befehls
            cursor.execute(query1, (lerngruppe.get_id(),))
            self._cnx.commit()

            # Auslesen und speicher welche Module zu dieser Gruppe gehören
            module = lerngruppe.get_modul()

            # Für jedes Modul ein Datenbankeintrag erzeugen
            for i in module:
                # Erstellen des SQL-Befehls
                query2 = """INSERT INTO TeamUP.lerngruppeinmodul(lerngruppeId, modulId)  VALUES (%s, %s)"""
                # Auslesen und speichern der users.id und modul.id
                data = (lerngruppe.get_id(), self.get_modul_id_by_modul(i))
                # (Bitte kein Komma nach data) Ausführen des SQL-Befehls
                cursor.execute(query2, data)

            # Schließen der Datenbankverbindung
            self._cnx.commit()
            cursor.close()
            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def delete_gruppe(self, gruppen_id):
        """
        Löscht eine komplette Lerngruppe und die dazugehörigen Verbindungen
        :param gruppen_id: Die LerngruppenID, welche gelöscht werden soll
        :return: Statuscode 200 Wenn die Lerngruppe erfolgreich gelöscht wurde
        """
        try:
            # Öffnen der Datenbankverbindung
            cursor = self._cnx.cursor(prepared=True)

            # Lerngruppe in lerngruppeInModul TABLE löschen
            query_user = """DELETE FROM teamup.userinlerngruppe WHERE lerngruppeId= %s """

            # Lerngruppe in lerngruppeInModul TABLE löschen
            query_modul = """DELETE FROM teamup.lerngruppeInModul WHERE lerngruppeId= %s """

            query_admitted = """DELETE FROM teamup.gruppeadmitted WHERE anGruppenid= %s"""

            query_room_id = """SELECT teamup.room.id FROM teamup.room WHERE teamup.room.groupId= %s"""
            cursor.execute(query_room_id, (gruppen_id,))
            roomid = cursor.fetchone()

            query_userchatdelete = """DELETE FROM teamup.userinroom WHERE teamup.userinroom.roomId= %s"""
            cursor.execute(query_userchatdelete, roomid)

            query_deletroom = """DELETE FROM teamup.room WHERE teamup.room.id= %s"""
            cursor.execute(query_deletroom, roomid)

            # Lerngruppen über die ID löschen
            query_gruppe = """DELETE FROM teamup.lerngruppe WHERE id= %s """

            # Löschen alle User aus der Datenbank der Lerngruppe
            cursor.execute(query_user, (gruppen_id,))

            # Löschen alle Moduleinträge der Lerngruppe
            cursor.execute(query_modul, (gruppen_id,))

            # Löschen alle anfragen an die Lerngruppe
            cursor.execute(query_admitted, (gruppen_id,))

            # Löschen der Lerngruppe
            cursor.execute(query_gruppe, (gruppen_id,))

            self._cnx.commit()
            cursor.close()
            return 200
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    ###################################################################################################################
    # Nicht genutzt Methoden
    ###################################################################################################################
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

    def find_by_name(self, lerngruppe):
        result = []
        cursor = self._cnx.cursor()

        # LerngruppenID bekommen über name
        query1 = """SELECT id FROM teamup.lerngruppe WHERE name = (%s) """

        # Abfrage für gruppen_id
        cursor.execute(query1, lerngruppe.get_name())

        # gruppen_id is die ID um die lerngruppe in der TABLE zu finden
        data = cursor.fetchone()

        # Query um alle informationen einer bestimmten lerngruppe zu bekommen
        query = """SELECT id,lerntyp, name, beschreibung, bild, admin from TeamUP.lerngruppe
        WHERE name = (%s)"""

        cursor.execute(query, data)

        # lerngruppendaten
        tupel = cursor.fetchall()

        (gruppen_id, modul, name, beschreibung, profilbild, admin, mitglieder) = tupel[0]
        lerngruppe = Lerngruppe()
        lerngruppe.set_id(gruppen_id)
        lerngruppe.set_modul(modul)
        lerngruppe.set_name(name)
        lerngruppe.set_beschreibung(beschreibung)
        lerngruppe.set_profil_bild(profilbild)
        lerngruppe.set_admin(admin)
        lerngruppe.set_mitglieder(mitglieder)
        result.append(lerngruppe)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id_test(self, gruppen_id):
        try:
            cursor = self._cnx.cursor()

            # Query um alle informationen einer bestimmten lerngruppe zu bekommen
            query = """SELECT lerntyp, name, beschreibung, bild, admin, frequenz, lernort FROM TeamUP.lerngruppe 
            WHERE id = (%s)"""

            # Ausführen des ersten SQL-Befehls
            cursor.execute(query, (gruppen_id,))

            # Speichern der SQL Antwort
            tupel = cursor.fetchall()

            # Abbrechen der Suche da die Gruppe nicht vorhanden ist
            if not tupel:
                return 400, 'Keine Gruppe gefunden'
            # Auflösen der ersten SQL Antwort (Lerngruppe) und setzen der Parameter
            (lerntyp, name, beschreibung, bild, admin, frequenz, lernort) = tupel[0]
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(gruppen_id)
            lerngruppe.set_lerntyp(lerntyp)
            lerngruppe.set_name(name)
            lerngruppe.set_beschreibung(beschreibung)
            lerngruppe.set_profil_bild(bild)
            lerngruppe.set_admin(admin)
            lerngruppe.set_frequenz(frequenz)
            lerngruppe.set_lernort(lernort)

            # erstellen des SQL-Befehls um abzufragen welche Module einer Lerngruppe zugeordnet sind
            query1 = """SELECT teamup.modul.bezeichnung FROM teamup.modul JOIN teamup.lerngruppeinmodul lim 
                        ON modul.id = lim.modulId WHERE lim.lerngruppeId =%s"""
            # Ausführen des zweiten SQL-Befehls
            cursor.execute(query1, (gruppen_id,))
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
            cursor.execute(query2, (gruppen_id,))
            # Speichern der SQL Antwort
            tupel2 = cursor.fetchall()

            # Auflösen der zweiten SQL Antwort (Mitglieder der Lerngruppe) und setzen des Parameters
            for i in tupel2:
                for x in i:
                    lerngruppe.set_mitglieder_append(x)

            return lerngruppe
        except mysql.connector.Error as err:
            return 400, err.msg

    def update_info_from_lerngruppe_alt(self, lerngruppe):

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
        daten = (lerngruppe.get_profil_bild(), lerngruppe.get_name(), lerngruppe.get_beschreibung(),
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
