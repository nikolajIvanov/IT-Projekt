from server.bo.BusinessObject import BusinessObject


class NachrichtBO(BusinessObject):
    """
    Business Klasse in der alle relevanten Variablen und Methoden definiert wurden, um mit den relevanten Informationen
    für einen Chat im Backend umgehen zu können.
    """
    def __init__(self):
        super().__init__()
        self.__nachricht = ""
        self.__sender_id = ""
        self.__room_id = ""

    def get_nachricht(self):
        return self.__nachricht

    def set_nachricht(self, nachricht):
        self.__nachricht = nachricht

    def get_sender_id(self):
        return self.__sender_id

    def set_sender_id(self, sender_id):
        self.__sender_id = sender_id

    def get_room_id(self):
        return self.__room_id

    def set_room_id(self, room_id):
        self.__room_id = room_id
