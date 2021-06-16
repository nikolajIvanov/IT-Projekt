from server.bo.BusinessObject import BusinessObject


class RequestBO(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__auth_id = None
        self.__angefragter_id = None
        self.__gruppe_id = None

    def get_auth_id(self):
        return self.__auth_id

    def set_auth_id(self, auth_id):
        self.__auth_id = auth_id

    def get_angefragter_id(self):
        return self.__angefragter_id

    def set_angefragter_id(self, angefragter_id):
        self.__angefragter_id = angefragter_id

    def get_gruppe_id(self):
        return self.__gruppe_id

    def set_gruppe_id(self, gruppe_id):
        self.__gruppe_id = gruppe_id

    @staticmethod
    def create_request(**kwargs):
        obj = RequestBO()
        obj.set_auth_id(kwargs["auth_id"])
        obj.set_angefragter_id(kwargs["angefragter_id"])
        return obj

    @staticmethod
    def create_group_request(**kwargs):
        obj = RequestBO()
        obj.set_auth_id(kwargs["auth_id"])
        obj.set_gruppe_id(kwargs["groupid"])
        return obj
