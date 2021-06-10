from server.db.Mapper import Mapper
from server.bo.Nachricht import NachrichtBO

class ChatMapper(Mapper):
    def __init__(self):
        super().__init__()

    def add_message(self, message, senderId, roomId):
        # Öffnen der Datenbankverbindung
        cursor = self._cnx.cursor(prepared=True)

        # Erstellen des SQL-Befehls für TABLE lerngruppe
        query = """INSERT INTO teamup. (name, beschreibung, bild,
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

    def get_messages_by_room(self):

    def add_user_to_room(self):

    def delete_user_from_room(self):