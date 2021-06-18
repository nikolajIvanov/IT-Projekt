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

    def get_sender_id(self):
        return self.__senderId

    def set_sender_id(self, senderid):
        self.__senderId = senderid

    def get_room_id(self):
        return self.__roomId

    def set_room_id(self, room_id):
        self.__roomId = room_id
