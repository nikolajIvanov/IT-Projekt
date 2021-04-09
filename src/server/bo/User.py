from src.server.bo import BusinessObject as bo


class User (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__email = ""

    def get_name(self):
        return self.__name

    def set_name(self, value):
        self.__name = value

    def get_email(self):
        return self.__name

    def set_email(self, value):
        self.__name = value

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Customer()."""
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        return obj
