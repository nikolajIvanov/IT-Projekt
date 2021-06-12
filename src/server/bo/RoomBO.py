from server.bo.BusinessObject import BusinessObject


class RoomBO(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__mitglieder = []

    def set_name(self,name):
        self.__name = name

    def get_name(self):
        return self.__name

    def get_mitglieder(self):
        return self.__mitglieder

    def set_mitglieder(self, value):
        self.__mitglieder = value

    def set_mitglieder_append(self, value):
        self.__mitglieder.append(value)

    def create_room(self, **kwargs):
        obj = RoomBO()
        obj.set_name(kwargs["name"])
        obj.set_mitglieder(kwargs["mitglieder"])