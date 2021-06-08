from server.db.Mapper import Mapper


class InitMapper(Mapper):

    def __init__(self):
        super().__init__()

    def initialize(self, auth_id):
        cursor = self._cnx.cursor(prepared=True)

        data_call = """SELECT name FROM TeamUP.users WHERE authId=%s"""

        cursor.execute(data_call, (auth_id,))
        user = cursor.fetchone()

        print(user)

        if user is None:
            return 500
        else:
            return 200

    def find_all(self):
        pass
