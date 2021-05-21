from abc import ABC

from server.bo.Lerngruppe import Lerngruppe
from server.db.Mapper import Mapper

# TODO warum abc import ?
class LerngruppeMapper(Mapper, ABC):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()

        #Daten von lerngruppe
        cursor.execute("""SELECT id, modul, name, beschreibung, profilbild, admin from lerngruppe""")
        tuples = cursor.fetchall()

        for (id, modul, name, beschreibung, profilbild, admin) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.set_modul(modul)
            lerngruppe.set_name(name)
            lerngruppe.set_beschreibung(beschreibung)
            lerngruppe.set_profilBild(profilbild)
            lerngruppe.set_admin(admin)
            result.append(lerngruppe)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, lerngruppe):
        result = []
        cursor = self._cnx.cursor()

        # LerngruppenID bekommen über name
        query1 = """SELECT id FROM teamup.lerngruppe WHERE name = (%s) """

        # Abfrage für gruppen_id
        cursor.execute(query1, lerngruppe.get_name())

        # gruppen_id is die ID um die lerngruppe in der TABLE zu finden
        gruppen_id = cursor.fetchall()

        #Query um alle informationen einer bestimmten lerngruppe zu bekommen
        query = """SELECT id, modul, name, beschreibung, profilbild, admin, mitglieder from lerngruppe 
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

    def init_with_authId(self, lerngruppe):
        """
        :param lerngruppe: Objekt der Klasse Lerngruppe
        :return lerngruppenID aus Datenbank
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls für TABLE lerngruppe
        query1 = """INSERT INTO teamup.lerngruppe (name, beschreibung, bild,
                    lerntypId, modulId, admin) VALUES (%s ,%s ,%s ,%s ,%s, %s)"""

        # Erstellen des SQL-Befehls für TABLE adminInLerngruppe für den admin
        query2 = """INSERT INTO teamup.adminInLerngruppe(userId, lerngruppeId) VALUES (%s, %s)"""

        # Erstellen des SQL-Befehls für TABLE userInLerngruppe für den admin
        query3 = """INSERT INTO teamup.userInLerngruppe(userId, lerngruppeId) VALUES (%s, %s)"""

        # Daten für lerngruppe
        daten1 = (lerngruppe.get_name(), Lerngruppe.get_beschreibung(),
                  Lerngruppe.get_profilBild(), Lerngruppe.get_lerntyp(), Lerngruppe.get_modul(),
                  lerngruppe.get_admin())

        # LerngruppenID bekommen über name
        query5 = """SELECT id FROM teamup.lerngruppe WHERE name = (%s) """

        # Lerngruppenname für SELECT-Abfrage von query5
        daten3 = lerngruppe.get_name()

        # Ausführen des SQL-Befehls für lerngruppe
        cursor.execute(query1, daten1)

        # gruppen_id is die ID um den admin und user in die TABLES speichern zu können
        cursor.execute(query5, daten3)
        gruppen_id = cursor.fetchall()

        # Daten für adminInLerngruppe & userInLerngruppe
        daten2 = (lerngruppe.get_admin(), gruppen_id)

        # Ausführen des SQL-Befehls für adminInLerngruppe
        cursor.execute(query2, daten2)

        # Ausführen des SQL-Befehls für userInLerngruppe
        cursor.execute(query3, daten2)

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        return gruppen_id

    def insert_user_with_authId(self, lerngruppe):
        """
        :param lerngruppe:
        :return: gruppen_id
        """

        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # LerngruppenID bekommen über name
        query1 = """SELECT id FROM teamup.lerngruppe WHERE name = (%s) """

        # gruppen_id is die ID um den admin und user in die TABLES speichern zu können
        cursor.execute(query1, lerngruppe.get_name())
        gruppen_id = cursor.fetchall()

        # Erstellen des SQL-Befehls für TABLE userInLerngruppe
        query2 = """INSERT INTO teamup.userInLerngruppe(userId, lerngruppeId) VALUES (%s, %s)"""

        # Mitglieds UID & GruppenID für die speicherung in TABLE userInLerngruppe
        # Mitglied muss über die API via set_mitglieder gespeichert werden, d.h. ist das Mitglied
        # in dieser Liste als einiges Element vorhanden
        data = (lerngruppe.get_mitglieder(), gruppen_id)

        cursor.execute(query2, data)

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()

        return gruppen_id

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

    def update_info_from_lerngruppe(self, lerngruppe):
        """
        :param lerngruppe:
        :return:
        """





