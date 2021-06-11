import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod
from werkzeug.exceptions import InternalServerError
import mysql.connector.errors



class Mapper(AbstractContextManager, ABC):

    def __init__(self):
        self._cnx = None

    def __enter__(self):
        self._cnx = connector.connect(user='root', password='2CVBkS9g',
                                      host='127.0.0.1',
                                      database='TeamUP')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._cnx.close()

    def get_modulId_by_modul(self, modul):

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

    @abstractmethod
    def find_all(self):
        pass

    def find_by_key(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass
