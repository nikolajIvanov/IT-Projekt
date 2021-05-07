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

        command = "SELECT id, name, beschreibung, profilbild, admin FROM `test-bank`.users WHERE name LIKE '{}'" \
                  "ORDER BY  name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        (id, name, beschreibung, profilbild, admin) = tuples[0]
        lerngruppe = Lerngruppe()
        lerngruppe.set_id(id)
        lerngruppe.setName(name)
        lerngruppe.setBeschreibung(beschreibung)
        lerngruppe.setProfilbild(profilbild)
        lerngruppe.setAdmin(admin)
        result = lerngruppe

        self._cnx.commit()
        cursor.close()

        return result
