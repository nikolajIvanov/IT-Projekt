from src.server.bo import BusinessObject as bo

class Profil (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__lerntyp = ""
        self.__modul = {}
        self.__profilBild = None

    def get_name(self):
        return self.__name

    def set_name(self, value):
        self.__name = value

    def get_lerntyp(self):
        return self.__lerntyp

    def set_lerntyp(self, value):
        self.__lerntyp = value

    def get_modul(self):
        return self.__modul

    def set_modul(self):
        pass



