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
            lerngruppe.


    def find_by_key(self):
        pass
