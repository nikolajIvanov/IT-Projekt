from src.server.bo import BusinessObject


class Profil (BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__lerntyp = ""
        self.__modul = []
        self.__profilBild = None

    def get_name(self):
        """ Gibt den Profilnamen des Profiles zurück.

        :return: Profilname
        """
        return self.__name

    def set_name(self, name):
        """ Setzt den Profilnamen des Profiles.

        :param name: Profielname
        """
        self.__name = name

    def get_lerntyp(self):
        """Gibt den lerntyp des Profiles zurück.

        :return: Lerntyp
        """
        return self.__lerntyp

    def set_lerntyp(self, typ):
        """ Setzt den lerntyp des Profiles.

        :param typ: Lerntyp
        """
        self.__lerntyp = typ

    def get_modul(self):

        return self.__modul

    def set_modul(self, module):
        """Fügt dem Profil neue Module hinzu.

        :param module: Module
        """
        self.__modul.append(module)
