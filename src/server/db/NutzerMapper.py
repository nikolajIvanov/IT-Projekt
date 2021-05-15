from server.bo.Nutzer import Nutzer
from server.db.Mapper import Mapper


class NutzerMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, email FROM users")
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

        cursor = self._cnx.cursor(prepared=True)
        query = """SELECT users.id, users.bild, users.name, users.geburtsdatum, users.email, users.beschreibung, 
               lerntyp.typ FROM teamup.users JOIN teamup.lerntyp on users.lerntypId = lerntyp.id WHERE authId=%s"""


        query1 ="""SELECT modul.bezeichnung From ((teamup.modul JOIN teamup.userinmodul 
                ON modul.id = userinmodul.modulId) 
                JOIN teamup.users ON userinmodul.userId = users.id ) WHERE authId=%s"""

        cursor.execute(query, (key,))
        tuples = cursor.fetchall()
        cursor.execute(query1, (key,))
        tuples1 = cursor.fetchall()

        (id, bild, name, geburtsdatum, email, beschreibung, lerntyp,) = tuples[0]
        user = Nutzer()
        user.set_id(id)
        user.set_profilBild(bild)
        user.set_name(name)
        user.set_geburtsdatum(geburtsdatum)
        user.set_email(email)
        user.set_beschreibung(beschreibung)
        user.set_lerntyp(lerntyp)

        for i in tuples1:
            for x in i:
                user.set_modul(x)

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

        cursor = self._cnx.cursor(prepared=True)

        command = """UPDATE users" + "SET name=% email=%s WHERE id = %s"""
        data = (user.get_name(), user.get_email(), user.get_user_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def update_authId(self, authIdOld, authIdNew):

        cursor = self._cnx.cursor()

        query =  """ UPDATE users SET users.authId = {} WHERE authId=%s """.format(authIdNew)
        cursor.execute(query, (authIdOld,))

        self._cnx.commit()
        cursor.close()

    def update_lerntypId(self, authId, lerntypId):

        cursor = self._cnx.cursor()

        query =  """ UPDATE users SET users.lerntypId = {} WHERE authId=%s """.format(lerntypId)
        cursor.execute(query, (authId,))

        self._cnx.commit()
        cursor.close()

    def update_bild(self, authId, bild):

        cursor = self._cnx.cursor()

        query =  """ UPDATE users SET users.bild = {} WHERE authId=%s """.format(bild)
        cursor.execute(query, (authId,))

        self._cnx.commit()
        cursor.close()

    def update_beschreibung(self, authId, beschreibung):

        cursor = self._cnx.cursor()

        query = """ UPDATE users SET users.beschreibung = {} WHERE authId=%s """.format(beschreibung)
        cursor.execute(query, (authId,))

        self._cnx.commit()
        cursor.close()

    def update_geburtsdatum(self, authId, geburtsdatum):

        cursor = self._cnx.cursor()

        query = """ UPDATE users SET users.geburtsdatum = {} WHERE authId=%s """.format(geburtsdatum)
        cursor.execute(query, (authId,))

        self._cnx.commit()
        cursor.close()

    def update_email(self, authId, email):

        cursor = self._cnx.cursor()

        query = """ UPDATE users SET users.email = {} WHERE authId=%s """.format(email)
        cursor.execute(query, (authId,))

        self._cnx.commit()
        cursor.close()

    def update_name(self, authId, name):

        cursor = self._cnx.cursor()

        query = """ UPDATE users SET users.name = {} WHERE authId=%s """.format(name)
        cursor.execute(query, (authId,))

        self._cnx.commit()
        cursor.close()

    #TODO get_ModuleForUser erst wichtig für den algo
    """def get_modulForUser(self, authId):

        cursor = self._cnx.cursor()
        #SQL Query nochmal prüfen
        #query =  SELECT userInModul.modulID FROM teamup.userInModul JOIN teamup.users on
         #       users.id = userInModul.userId WHERE authId=%s
        query = SELECT modul.bezeichnung From ((teamup.modul JOIN teamup.userinmodul ON modul.id = userinmodul.modulId) 
                JOIN teamup.users ON userinmodul.userId = users.id ) WHERE authId=%s

        cursor.execute(query, (authId,))
        tuples = cursor.fetchall()

        user = Nutzer()
        for i in tuples:
            for x in i:
             user.set_modul(x)

        self._cnx.commit()
        cursor.close()

        return user"""


    def delete(self):
        pass
     #TODO Insert Z 88 bis 102 unnötig da wir in der Datenban Auto_Increment bei der Id haben. Oder? überprüfen
    def insert(self, user):
        """Einfügen eines Nutzer-Objekts in die Datenbank.

        :param user: Ein Nutzer Objekt wird übergeben
        :return:
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM users")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn Nutzer in der Datenbank exestieren, suchen wir die höchste ID und zählen diese
                um 1 hoch, damit garantieren wir, dass der neue Nutzer eine neue ID erhält.
                """
                user.set_id(maxid[0] + 1)
            else:
                """Falls noch kein Nutzer in der Datenbank exestiert, wird der neue Nutzer mit der ID 1 in der
                Datenbank gespeichert.
                """
                user.set_id(1)

            command = "INSERT INTO users (id, uid, name, email) VALUES (%s,%s,%s,%s)"
            data = (user.get_id(), user.get_uid(), user.get_name(), user.get_email())
            cursor.execute(command, data)

            self._cnx.commit()
            cursor.close()

            return user
