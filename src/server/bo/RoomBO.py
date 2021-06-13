from server.bo.BusinessObject import BusinessObject


class RoomBO(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__userAuthId = None
        self.__partnerId = None
        self.__mitglieder = []

    def get_mitglieder(self):
        return self.__mitglieder

    def set_mitglieder(self, value):
        self.__mitglieder = value

    def set_mitglieder_append(self, value):
        self.__mitglieder.append(value)

    def get_userAuthId(self):
        return self.__userAuthId

    def set_userAuthId(self, userAuthId):
        self.__userAuthId = userAuthId

    def get_partnerId(self):
        return self.__partnerId

    def set_partnerId(self, partnerId):
        self.__partnerId = partnerId



    @staticmethod
    def create_room(**kwargs):
        obj = RoomBO()
        obj.set_userAuthId(kwargs["userAuthId"])
        obj.set_partnerId(kwargs["partnerId"])
        obj.set_mitglieder_append(kwargs["partnerId"])
        return obj
