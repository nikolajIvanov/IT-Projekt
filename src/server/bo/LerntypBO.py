from server.bo.BusinessObject import BusinessObject


class LerntypBO(BusinessObject):
    """
    Business Klasse in der alle relevanten Variablen und Methoden definiert wurden, um mit den Lerntypen  im Backend
    umgehen zu können.
    """
    def __init__(self):
        super().__init__()
        self.__bild = None
        self.__lerntyp = ""

    def get_bild(self):
        return self.__bild

    def set_bild(self, new_bild):
        self.__bild = new_bild

    def get_lerntyp(self):
        return self.__lerntyp

    def set_lerntyp(self, new_lerntyp):
        self.__lerntyp = new_lerntyp
