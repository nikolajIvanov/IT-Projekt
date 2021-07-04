import mysql.connector as connector
from contextlib import AbstractContextManager
from abc import ABC
from werkzeug.exceptions import InternalServerError
import mysql.connector.errors
from server.bo.UserBO import UserBO
import os


class Mapper(AbstractContextManager, ABC):

    def __init__(self, cnx=None):
        self._cnx = cnx

    def __enter__(self):

        if os.getenv('GAE_ENV', '').startswith('standard'):
            """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
            Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
            Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

            self._cnx = connector.connect(user='root', password='2CVBkS9g',
                                          unix_socket='/cloudsql/teamup-deployment:europe-west3:teamup-db',
                                          database='TeamUP')
        else:
            """Wenn wir hier ankommen, dann handelt sich offenbar um die Ausführung des Codes in einer lokalen Umgebung,
            also auf einem Local Development Server. Hierbei stellen wir eine einfache Verbindung zu einer lokal
            installierten mySQL-Datenbank her."""

            self._cnx = connector.connect(user='root', password='2CVBkS9g',
                                          unix_socket='/cloudsql/teamup-deployment:europe-west3:teamup-db',
                                          database='TeamUP')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._cnx.close()

    def get_modul_id_by_modul(self, modul):

        """
        Sucht nach der Modul ID über die Modul bezeichnung. Wird verwendet, um eine Verbindung zwischen dem Objekt
        und seinen Modulen in der Datenbank zu speichern.
        :param modul: Bekommt ein einzelnes Modul als String
        :return: Modul ID
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)

            # Erstellen des SQL-Befehls
            query = """SELECT modul.id FROM TeamUP.modul WHERE bezeichnung=%s"""

            # Ausführen des SQL-Befehls
            cursor.execute(query, (modul,))

            # Speichern der SQL Antwort
            modulid = cursor.fetchone()

            # Bestätigung der Datenbankabfrage/ änderung
            self._cnx.commit()

            return modulid[0]

        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def find_modul_id_for_matching(self, user_authid):
        """
        Diese Methode findet alle Module welche ein Nutzer belegt. Dies wird für den Matching Algo benötigt
        :param user_authid: GoogleAuthId des Nutzers für welchen die Module gefunden werden sollen
        :return: Ein Nutzerobjekt
        """
        # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
        cursor = self._cnx.cursor(buffered=True)

        # erstellen des SQL-Befehls um die MainUser Daten abzufragen
        query_user = """SELECT id, lerntyp, semester, studiengang, frequenz, lernort FROM TeamUP.users 
                                WHERE authId=%s"""

        # Holt mir alle ModuleIDs von vem MainUser
        query_module = """SELECT modulId FROM TeamUP.userInModul WHERE userId=%s"""

        # Holt die Informationen des MainUsers über die authid
        cursor.execute(query_user, (user_authid,))
        tuple_main_user = cursor.fetchone()

        if not tuple_main_user:
            raise InternalServerError('Es gibt keinen angelegten user')

        # Holt mir alle ModuleIDs von dem MainUser
        cursor.execute(query_module, (tuple_main_user[0],))
        tuple_main_modul = cursor.fetchall()

        # Erstellt mir ein UserBO des aktuellen Users
        main_user_bo = UserBO.create_matching_user_bo(id=tuple_main_user[0], lerntyp=tuple_main_user[1],
                                                      semester=tuple_main_user[2], studiengang=tuple_main_user[3],
                                                      frequenz=tuple_main_user[4], lernort=tuple_main_user[5])

        # Speichert mir alle Module des Users in das BO
        for i in tuple_main_modul:  # Löst die Liste von fetchall auf
            for x in i:  # Löse den Tuple von der Liste auf
                main_user_bo.set_module_append(x)

        cursor.close()
        return main_user_bo

    def find_userid_by_authid(self, authid):
        """
        Findet die Interne Id eines Nutzers anhand seiner GoogleAuthId
        :param authid: GoogleID des aktuellen Users
        :return: Gibt die UserID zurück
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)
            # erstellen des SQL-Befehls um die UserBO Daten abzufragen
            query = """SELECT id FROM TeamUP.users WHERE authId=%s"""

            # Ausführen des ersten SQL-Befehls
            cursor.execute(query, (authid,))
            # Speichern der SQL Antwort
            user_id = cursor.fetchone()

            cursor.close()
            # Rückgabe des UserBO
            return user_id[0]
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def find_username_by_id(self, userid):
        """
        Sucht nach dem Namen eines Nutzers anhand seiner Id
        :param userid: Nutzer Id für welche der Name gefunden werden soll.
        :return: Name des Nutzers
        """
        try:
            # Cursor wird erstellt, um auf der Datenbank Befehle durchzuführen
            cursor = self._cnx.cursor(prepared=True)
            # erstellen des SQL-Befehls um die UserBO Daten abzufragen
            query = """SELECT vorname, name FROM TeamUP.users WHERE id=%s"""

            # Ausführen des ersten SQL-Befehls
            cursor.execute(query, (userid,))
            # Speichern der SQL Antwort
            username = cursor.fetchone()

            cursor.close()
            # Rückgabe des UserBO
            return username[0]
        except mysql.connector.Error as err:
            raise InternalServerError(err.msg)

    def find_all(self):
        pass

    def find_by_key(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass
