from abc import ABC


class BusinessObject(ABC):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes BusinessObject eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    def __init__(self):
        self.__id = 0   # Die eindeutige Identifikationsnummer einer Instanz dieser Klasse.

    def get_id(self):
        """Auslesen der ID."""
        return self.__id

    def set_id(self, value):
        """Setzen der ID."""
        self.__id = value
