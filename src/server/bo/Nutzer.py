from src.server.bo import BusinessObject as bo


class Nutzer (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__email = ""
        self.__uid = ""

    def get_name(self):
        return self.__name

    def set_name(self, value):
        self.__name = value

    def get_email(self):
        return self.__email

    def set_email(self, value):
        self.__email = value

    def get_uid(self):
        return self.__uid

    def set_uid(self, value):
        self.__uid = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz.

        Diese besteht aus der ID der Superklasse ergänzt durch den Vor- und Nachnamen
        des jeweiligen Kunden."""
        return "Customer: {}, {}, {}, {}".format(self.get_id(), self.get_uid(), self.get_name(), self.get_email())

    @staticmethod
    def from_dict(dictionary=dict()):
        """"Umwandeln eines Python dict() in einen Customer()."""
        obj = Nutzer()
        # obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_uid(dictionary["uid"])
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        return obj
