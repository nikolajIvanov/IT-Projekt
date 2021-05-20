from server.bo.Lerngruppe import Lerngruppe
from server.db.Mapper import Mapper

class LerngruppeMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, beschreibung, profilbild, admin from lerngruppe")
        tuples = cursor.fetchall()

        for (id, name, beschreibung, profilbild, admin) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.setName(name)
            lerngruppe.setBeschreibung(beschreibung)
            lerngruppe.setAdmin(admin)
            result.append(lerngruppe)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        result = None

        cursor = self._cnx.cursor()
        """TODO: Welche Datenbank?"""

        command =

        cursor.execute(command)
        tuples = cursor.fetchall()

        (id, name, beschreibung, profilbild, admin) = tuples[0]
        lerngruppe = Lerngruppe()
        lerngruppe.setName(name)
        lerngruppe.setBeschreibung(beschreibung)
        lerngruppe.setProfilbild(profilbild)
        lerngruppe.setAdmin(admin)
        result = lerngruppe

        self._cnx.commit()
        cursor.close()

        return result

    def insert_with_authId(self, lerngruppe):
        """
        :param lerngruppe: Objekt der Klasse Lerngruppe
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """INSERT INTO teamup.lerngruppe (name, beschreibung, bild,
                    lerntypId, modulId) VALUES (%s ,%s ,%s ,%s ,%s)"""

        """admin fehlt?"""

        # Auslesen der Lerngruppen Daten
        daten = (lerngruppe.get_name(), Lerngruppe.get_beschreibung(),
                 Lerngruppe.get_profilBild(), Lerngruppe.get_lerntyp(), Lerngruppe.get_modul())

        # Ausführen des SQL-Befehls um die Lerngruppen-Daten auf die Datenbank zu schreiben
        cursor.execute(query, (daten))
        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()
