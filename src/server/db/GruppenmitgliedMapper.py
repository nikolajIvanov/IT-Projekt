from server.bo.Gruppenmitglied import Gruppenmitglied
from server.db.Mapper import Mapper

class GruppenmitgliedMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, beschreibung, profilbild, admin from lerngruppe")
        tuples = cursor.fetchall()

        self._cnx.commit()
        cursor.close()

        return result
