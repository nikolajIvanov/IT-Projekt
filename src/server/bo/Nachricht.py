from src.server.bo.BusinessObject import BusinessObject


class NachrichtBO(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__nachricht = ""
        self.__senderId = ""
        self.__roomId = ""

    def get_nachricht(self):
        return self.__nachricht

    def set_nachricht(self, nachricht, senderId, roomId):
        self.__nachricht = nachricht
        self.__senderId = senderId
        self.__roomId = roomId
