from server.bo.User import User
from server.db.Mapper import Mapper


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from users")
        tuples = cursor.fetchall()

        for (id, name, email) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            result.append(user)

    def find_by_key(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass
