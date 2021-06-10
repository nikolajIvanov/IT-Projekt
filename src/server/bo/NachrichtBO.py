from src.server.bo.BusinessObject import BusinessObject


class NachrichtBO(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__nachricht = ""
        self.__senderId = ""
        self.__roomId = ""

    def get_nachricht(self):
        return self.__nachricht

    def set_nachricht(self, nachricht):
        self.__nachricht = nachricht

    def get_senderId(self):
        return self.__senderId

    def set_senderID(self,Id):
        self.__senderId = Id

    def get_roomId(self):
        return self.__roomId

    def set_roomId(self, Id):
        self.__roomId = Id

