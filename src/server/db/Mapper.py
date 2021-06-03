import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper(AbstractContextManager, ABC):

    def __init__(self):
        self._cnx = None

    def __enter__(self):
        self._cnx = connector.connect(user='root', password='2CVBkS9g',
                                      host='127.0.0.1',
                                      database='test-bank')
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._cnx.close()

    @abstractmethod
    def find_all(self):
        pass

    def find_by_key(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass

