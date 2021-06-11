from server.bo.BusinessObject import BusinessObject


class StudiengangBO(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__studiengang = ""

    def get_studiengang(self):
        return self.__studiengang

    def set_studiengang(self, new_studi):
        self.__studiengang = new_studi
