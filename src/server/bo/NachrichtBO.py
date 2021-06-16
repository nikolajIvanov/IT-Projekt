from server.bo.BusinessObject import BusinessObject


class NachrichtBO(BusinessObject):
    """
    Business Klasse in der alle relevanten Variablen und Methoden definiert wurden, um mit den relevanten Informationen
    für einen Chat im Backend umgehen zu können.
    """
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

    def set_senderID(self, senderid):
        self.__senderId = senderid

    def get_roomId(self):
        return self.__roomId

    def set_roomId(self, Id):
        self.__roomId = Id
