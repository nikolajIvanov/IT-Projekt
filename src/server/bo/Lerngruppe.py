from server.bo.BusinessObject import BusinessObject


class Lerngruppe(BusinessObject):

    def __init__(self):
        super().__init__()
        self.__name = ''
        self.__beschreibung = ''
        self.__profilbild = None
        self.__admin = dict()

    def getName(self):
        return self.__name

    def setName(self, value):
        self.__name = value

    def getBeschreibung(self):
        return self.__beschreibung

    def setBeschreibung(self, beschreibung):
        self.__beschreibung = beschreibung

    def getProfilbild(self):
        return self.__profilbild

    def setProfilbild(self, profilbild):
        self.__profilbild = profilbild

    def getAdmin(self):
        return self.__admin

    def setAdmin(self, admin):
        self.__admin = admin