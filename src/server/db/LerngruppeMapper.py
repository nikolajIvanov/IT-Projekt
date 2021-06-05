from server.bo.Lerngruppe import Lerngruppe
from server.db.Mapper import Mapper


class LerngruppeMapper(Mapper):

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
        cursor = self._cnx.cursor()

        # Daten von lerngruppe
        cursor.execute("SELECT id, lerntyp, name, beschreibung, bild, admin from TeamUP.lerngruppe")
        tuples = cursor.fetchall()

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

        self._cnx.commit()
        cursor.close()

        return lerngruppe

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
        cursor = self._cnx.cursor()

        # Query um alle informationen einer bestimmten lerngruppe zu bekommen
        query = """SELECT lerntyp, name, beschreibung, bild, admin from TeamUP.lerngruppe WHERE id = (%s)"""

        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (gruppenId,))

        # Speichern der SQL Antwort
        tupel = cursor.fetchall()
        # Auflösen der ersten SQL Antwort (Lerngruppe) und setzen der Parameter
        (lerntyp, name, beschreibung, bild, admin) = tupel[0]
        lerngruppe = Lerngruppe()
        lerngruppe.set_id(gruppenId)
        lerngruppe.set_lerntyp(lerntyp)
        lerngruppe.set_name(name)
        lerngruppe.set_beschreibung(beschreibung)
        lerngruppe.set_profilBild(bild)
        lerngruppe.set_admin(admin)

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

        self._cnx.commit()
        cursor.close()
        return lerngruppe

    def insert_lerngruppe(self, lerngruppe):
        """
        :param lerngruppe: Objekt der Klasse Lerngruppe
        :return lerngruppenID aus Datenbank
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls für TABLE lerngruppe
        query = """INSERT INTO teamup.lerngruppe (name, beschreibung, bild,
                    lerntyp,admin) VALUES (%s ,%s ,%s ,%s ,%s)"""
        # Erstellen des SQL-Befehls für TABLE userInLerngruppe für den admin

        # Daten für lerngruppe
        daten = (lerngruppe.get_name(), lerngruppe.get_beschreibung(),
                 lerngruppe.get_profilBild(), lerngruppe.get_lerntyp(),
                 lerngruppe.get_admin())

        # Ausführen des SQL-Befehls für lerngruppe
        cursor.execute(query, daten)

        gruppenId = cursor.lastrowid

        self._cnx.commit()
        cursor.close()
        cursor = self._cnx.cursor(prepared=True)

        gruppenMitglieder = lerngruppe.get_mitglieder()

        #Schleife setzt mitglieder in die UserInLerngruppe Tabelle
        for i in gruppenMitglieder:
            query1 = """INSERT INTO teamup.userinlerngruppe(userId, lerngruppeId) VALUES (%s, %s)"""
            data1 = (i, gruppenId)
            cursor.execute(query1,(data1))

        self._cnx.commit()
        cursor.close()

        cursor = self._cnx.cursor(prepared=True)

        gruppenModule = lerngruppe.get_modul()
        for i in gruppenModule:
            query2 = """INSERT INTO teamup.lerngruppeinmodul (lerngruppeId, modulId) VALUES (%s, %s) """
            data2 = (gruppenId, self.get_modulId_by_modul(i))
            cursor.execute(query2,(data2))

        self._cnx.commit()
        cursor.close()
    #TODO RETurn was soll returned werden
        return self.find_by_id(gruppenId)

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
        return lerngruppe.get_id()

    def delete_user_from_lerngruppe(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # LerngruppenID bekommen über name
        query = """DELETE FROM teamup.userInLerngruppe WHERE userId = (%s) """

        # Mitglied ist in Liste Mitglied als einziges Element
        data = (lerngruppe.get_mitglieder())

        cursor.execute(query, data)

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        return lerngruppe.get_mitglieder()

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
        # Auslesen und speichern der restlichen User Daten
        daten = (lerngruppe.get_profilBild(), lerngruppe.get_name(), lerngruppe.get_beschreibung(),
                 lerngruppe.get_admin(), lerngruppe.get_lerntyp(), lerngruppe.get_id())
        cursor.execute(query,(daten))
        self._cnx.commit()
        cursor.close()
        # Erstellen des SQL-Befehls um alle bestehenden einträge der Gruppe in gruppeInModule zu löschen
        query1 = """DELETE FROM TeamUP.userinmodul WHERE userId=%s"""
        # Ausführen des SQL-Befehls
        cursor.execute(query1, (lerngruppe.get_id(),))
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

        # Auslesen und speichern der restlichen User Daten
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

            # Lerngruppennamen
            data = gruppen_id

            # Lerngruppe in lerngruppeInModul TABLE löschen
            query2 = """DELETE FROM teamup.lerngruppeInModul WHERE lerngruppeId=%s """

            # Lerngruppen ID
            data2 = gruppen_id

            # Löschen des lerngruppeneintrags
            cursor.execute(query, data)

            # Löschen des lerngruppeInModul-Eintrags
            cursor.execute(query2, data2)

            return 200

        except:
            return 400
