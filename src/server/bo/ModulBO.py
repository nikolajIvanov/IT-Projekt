from server.bo.BusinessObject import BusinessObject


class ModulBO(BusinessObject):
    """
    Business Klasse in der alle relevanten Variablen und Methoden definiert wurden, um mit den Modulen im Backend
    umgehen zu können.
    """
    def __init__(self):
        super().__init__()
        self.__modul = ""

    def get_modul(self):
        return self.__modul

    def set_modul(self, new_modul):
        self.__modul = new_modul
