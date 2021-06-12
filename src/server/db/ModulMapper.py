from server.db.Mapper import Mapper
from server.bo.ModulBO import ModulBO


class ModulMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, bezeichnung FROM TeamUP.modul")

        tuples = cursor.fetchall()

        for (modul_id, modul) in tuples:
            obj = ModulBO()
            obj.set_id(modul_id)
            obj.set_modul(modul)
            result.append(obj)

        self._cnx.commit()
        cursor.close()

        return result

    def get_studiengangId_by_studiengang(self, studiengang):
        """
        :param studiengang: Ist der Name des Studiengangs
        :return: modulid
        """
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls
        query = """SELECT studiengang.id FROM TeamUP.studiengang WHERE studiengang=%s"""

        # Ausführen des SQL-Befehls
        cursor.execute(query, (studiengang,))

        # Speichern der SQL Antwort
        studiengangId = cursor.fetchone()

        # Schließen der Datenbankverbindung
        self._cnx.commit()
        cursor.close()
        # Rückgabe der Modulid

        return self.find_by_studiengangId(studiengangId[0])

    def find_by_studiengangId(self, key):
        """
        :param key: Ist die authId
        :return: Alle Objekte des UserBO
        """
        result = []

        # öffnen der DB verbindung
        cursor = self._cnx.cursor(prepared=True)

        # erstellen des SQL-Befehls um die UserBO Daten abzufragen
        query = """SELECT modul.id, modul.bezeichnung FROM TeamUP.modul INNER JOIN TeamUP.modulInStudiengang mIS 
        on modul.id = mIS.modulId WHERE mIS.studiengangId =%s"""

        # Ausführen des ersten SQL-Befehls
        cursor.execute(query, (key,))
        tuples = cursor.fetchall()

        # Auflösen der ersten SQL Antwort (UserBO) und setzen der Parameter
        for (modul_id, modul) in tuples:
            obj = ModulBO()
            obj.set_id(modul_id)
            obj.set_modul(modul)
            result.append(obj)

        # Datenbankverbindung schließen
        self._cnx.commit()
        cursor.close()

        # Rückgabe der Module
        return result
