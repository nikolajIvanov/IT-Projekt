from server.bo.Nutzer import Nutzer
from server.db.Mapper import Mapper


class NutzerMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, email from users")
        tuples = cursor.fetchall()

        for (id, name, email) in tuples:
            user = Nutzer()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email FROM `test-bank`.users WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        (id, name, email) = tuples[0]
        user = Nutzer()
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
        user = Nutzer()
        user.set_id(id)
        user.set_name(name)
        user.set_email(email)
        result = user

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, user):

        cursor = self._cnx.cursor()

        command = "UPDATE users" + "SET name=% email=%s WHERE id = %s"
        data = (user.get_name(), user.get_email(), user.get_user_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self):
        pass

    def insert(self, user):
        """Einfügen eines User-Objekts in die Datenbank.

        :param user: Ein User Objekt wird übergeben
        :return:
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM users")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn User in der Datenbank exestieren, suchen wir die höchste ID und zählen diese
                um 1 hoch, damit garantieren wir, dass der neue User eine neue ID erhält.
                """
                user.set_id(maxid[0] + 1)
            else:
                """Falls noch kein User in der Datenbank exestiert, wird der neue User mit der ID 1 in der
                Datenbank gespeichert.
                """
                user.set_id(1)

            command = "INSERT INTO users (id, uid, name, email) VALUES (%s,%s,%s,%s)"
            data = (user.get_id(), user.get_uid(), user.get_name(), user.get_email())
            cursor.execute(command, data)

            self._cnx.commit()
            cursor.close()

            return user
