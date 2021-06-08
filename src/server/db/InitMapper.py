from server.db.Mapper import Mapper


class InitMapper(Mapper):

    def __init__(self):
        super().__init__()

    # Überprüft ob der Nutzer in der Datenbank existiert
    # --> Es müssen alle Daten vorliegen da Nutzer nur komplett angelegt werden
    def initialize(self, auth_id):
        cursor = self._cnx.cursor(prepared=True)

        data_call = """SELECT name FROM TeamUP.users WHERE authId=%s"""

        cursor.execute(data_call, (auth_id,))
        user = cursor.fetchone()

        # Wenn der Nutzer nicht vorhanden ist wird der registrierungsprozess im Frontend
        # initiiert, sonst --> Einfacher Login
        if user is None:
            return 500
        else:
            return 200

    def find_all(self):
        pass
