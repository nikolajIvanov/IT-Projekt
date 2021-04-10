from server.bo.User import User
from server.db.Mapper import Mapper


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, email from users"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    """
    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email FROM users WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            result = user
        except IndexError:
            ""Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt.""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
    """


    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email FROM `test-bank`.users WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        (id, name, email) = tuples[0]
        user = User()
        user.set_id(id)
        user.set_name(name)
        user.set_email(email)
        result = user

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email FROM `test-bank`.users WHERE name LIKE '{}' ORDER BY  name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        (id, name, email) = tuples[0]
        user = User()
        user.set_id(id)
        user.set_name(name)
        user.set_email(email)
        result = user

        self._cnx.commit()
        cursor.close()

        return result

    def update(self):
        pass

    def delete(self):
        pass
