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



query2 = """INSERT INTO teamup.userinmodul( userId, modulId) VALUES (%s, %s)"""
# Auslesen und speichern der users.id und modul.id
data = (self.get_Id_by_authId(nutzer.get_authId()), self.get_modulId_by_modul(i))
# (Bitte kein Komma nach data) Ausführen des SQL-Befehls
cursor.execute(query2, (data))
# Schließen der Datenbankverbindung
self._cnx.commit()
cursor.close()