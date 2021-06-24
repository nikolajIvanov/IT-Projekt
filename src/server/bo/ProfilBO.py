from server.bo.BusinessObject import BusinessObject


class ProfilBO(BusinessObject):
    """
    Business Klasse für ein Profil. Diese Klasse verbindet alle Gemeinsamkeiten einer Lerngruppe und eines Users und
    stellt diese per Vererbung zur verfügung.
    """
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__lerntyp = ""
        self.__modul = []
        self.__profilBild = ""
        self.__beschreibung = ""
        self.__frequenz = ""
        self.__lernort = ""

    def get_name(self):
        """ Gibt den Profilnamen des Profiles zurück.
        :return: Profilname
        """
        return self.__name

    def set_name(self, name):
        """ Setzt den Profilnamen des Profiles.
        :param name: Profilname
        """
        self.__name = name

    def get_lerntyp(self):
        """Gibt den Lerntyp des Profiles zurück.
        :return: Lerntyp
        """
        return self.__lerntyp

    def set_lerntyp(self, typ):
        """ Setzt den Lerntyp des Profiles.
        :param typ: Lerntyp
        """
        self.__lerntyp = typ

    def get_modul(self):
        """Gibt die Module eines Profiles zurück
        :return: Module eines Profiles
        """
        return self.__modul

    def set_modul(self, module):
        """Fügt dem ProfilBO neue Module hinzu.
        :param module: Module
        """
        self.__modul = module

    def set_module_append(self, module):
        """
        Fügt Module der Liste Module hinzu
        :param module: Module eines Profils
        """
        self.__modul.append(module)

    def get_profil_bild(self):
        """Gibt das Bild eines Profiles zurück
        :return: Bild eines Profiles
        """
        return self.__profilBild

    def set_profil_bild(self, bild):
        """Fügt dem ProfilBO ein Bild hinzu.
        :param bild: Module
        """
        self.__profilBild = bild

    def get_beschreibung(self):
        """Gibt die Beschreibung eines Profiles zurück
        :return: Beschreibung eines Profiles
        """
        return self.__beschreibung

    def set_beschreibung(self, beschreibung):
        """Fügt dem ProfilBO eine Beschreibung hinzu.
        :param beschreibung: Module
        """
        self.__beschreibung = beschreibung

    def get_frequenz(self):
        """Gibt die Frequenz eines Profiles zurück
        :return: Frequenz eines Profiles
        """
        return self.__frequenz

    def set_frequenz(self, newfrequenz):
        """Fügt dem ProfilBO eine Frequenz hinzu.
        :param newfrequenz: Module
        """
        self.__frequenz = newfrequenz

    def get_lernort(self):
        """Gibt den Lernort eines Profiles zurück
        :return: Lernort eines Profiles
        """
        return self.__lernort

    def set_lernort(self, newort):
        """Fügt dem ProfilBO einen Lernort hinzu.
        :param newort: Module
        """
        self.__lernort = newort
