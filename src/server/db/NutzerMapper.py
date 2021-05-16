from server.bo.Nutzer import Nutzer
from server.db.Mapper import Mapper
import datetime


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
    # TODO Methode läuft nicht
    def find_by_key(self, key):
        # TODO braucht man result?
        result = None
        # TODO Tabelle Lerntyp befüllen: https://mitteldeutsches-institut.de/lerntypen/
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
                user.set_module_append(x)

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

    def insert_by_authId(self, nutzer):
        cursor = self._cnx.cursor(prepared=True)

        query = """INSERT INTO teamup.users (authId, bild, name, geburtsdatum, email,
                beschreibung, lerntypId) VALUES (%s ,%s ,%s ,%s ,%s ,%s ,%s)"""

        daten = (nutzer.get_authId(), nutzer.get_profilBild(), nutzer.get_name(),
                 datetime.datetime.strptime(nutzer.get_geburtsdatum(),'%Y-%m-%d'),
                 nutzer.get_email(), nutzer.get_beschreibung(), nutzer.get_lerntyp())

        cursor.execute(query, (daten))
        self._cnx.commit()
        cursor.close()

        cursor = self._cnx.cursor(prepared=True)

        module = nutzer.get_modul()
        for i in module:
            query1 = """INSERT INTO teamup.userinmodul( userId, modulId) VALUES (%s, %s)"""
            data = (self.get_Id_by_authId(nutzer.get_authId()), self.get_modulId_by_modul(i))
            #Bitte kein Komma nach data
            cursor.execute(query1, (data))
        self._cnx.commit()
        cursor.close()


        return self.find_by_key (nutzer.get_authId())

    def update_by_authId(self, nutzer):

        cursor = self._cnx.cursor(prepared=True)

        query = """UPDATE teamup.users SET authId=%s, bild=%s, name=%s, geburtsdatum=%s, email=%s,
                       beschreibung=%s, lerntypId=%s WHERE authId=%s"""
        authId = nutzer.get_authId()
        daten = (authId, nutzer.get_profilBild(), nutzer.get_name(),
                 datetime.datetime.strptime(nutzer.get_geburtsdatum(), '%Y-%m-%d'),
                 nutzer.get_email(), nutzer.get_beschreibung(), nutzer.get_lerntyp(), authId)

        cursor.execute(query, (daten))
        self._cnx.commit()
        cursor.close()

        userid= self.get_Id_by_authId(authId)

        cursor = self._cnx.cursor(prepared=True)
        query1 = """DELETE FROM teamup.userinmodul WHERE userId=%s"""
        cursor.execute(query1, (userid,))
        self._cnx.commit()
        cursor.close()

        cursor = self._cnx.cursor(prepared=True)
        module = nutzer.get_modul()

        for i in module:
            query2 = """INSERT INTO teamup.userinmodul( userId, modulId) VALUES (%s, %s)"""
            data = (self.get_Id_by_authId(nutzer.get_authId()), self.get_modulId_by_modul(i))
            # Bitte kein Komma nach data
            cursor.execute(query2, (data))
        self._cnx.commit()
        cursor.close()




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

    def get_modulId_by_modul(self, modul):
        cursor = self._cnx.cursor(prepared=True)

        query = """SELECT modul.id FROM teamup.modul WHERE bezeichnung=%s"""

        cursor.execute(query, (modul,))

        modulId = cursor.fetchone()

        self._cnx.commit()
        cursor.close()
        return modulId[0]

    def get_Id_by_authId(self, authId):
        cursor = self._cnx.cursor(prepared=True)

        query = """SELECT users.id FROM teamup.users WHERE authId=%s"""

        cursor.execute(query, (authId,))

        userid = cursor.fetchone()

        self._cnx.commit()
        cursor.close()
        return userid[0]

    def delete(self):
        pass
