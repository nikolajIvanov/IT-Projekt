from src.server.bo.BusinessObject import BusinessObject


# TODO modul = list??
class Profil(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__lerntyp = ""
        self.__modul = []
        self.__profilBild = ""
        self.__beschreibung = ""

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
        """Fügt dem ProfilBO neue Module hinzu.

        :param module: Module
        """
        self.__modul = module

    def set_module_append(self, module):

        self.__modul.append(module)

    def get_profilBild(self):
        return self.__profilBild

    def set_profilBild(self, bild):
        self.__profilBild = bild

    def get_beschreibung(self):
        return self.__beschreibung

    def set_beschreibung(self, beschreibung):
        self.__beschreibung = beschreibung
