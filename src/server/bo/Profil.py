from src.server.bo.BusinessObject import BusinessObject


class Profil(BusinessObject):
    def __init__(self):
        super().__init__()
        self._name = ""
        self._lerntyp = ""
        self._modul = []
        self._profilBild = ""
        self._beschreibung= ""

    def get_name(self):
        """ Gibt den Profilnamen des Profiles zurück.

        :return: Profilname
        """
        return self._name

    def set_name(self, name):
        """ Setzt den Profilnamen des Profiles.

        :param name: Profielname
        """
        self._name = name

    def get_lerntyp(self):
        """Gibt den lerntyp des Profiles zurück.

        :return: Lerntyp
        """
        return self._lerntyp

    def set_lerntyp(self, typ):
        """ Setzt den lerntyp des Profiles.

        :param typ: Lerntyp
        """
        self._lerntyp = typ

    def get_modul(self):

        return self._modul

    def set_modul(self, module):
        """Fügt dem Profil neue Module hinzu.

        :param module: Module
        """
        self._modul.append(module)

    def get_profilBild(self):
        return self._profilBild

    def set_profilBild(self, bild):
        self._profilBild = bild

    def get_beschreibung(self):
        return self._beschreibung

    def set_beschreibung(self, beschreibung):
        self._beschreibung=beschreibung


