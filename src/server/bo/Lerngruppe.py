from server.bo.Profil import Profil


class Lerngruppe(Profil):

    def __init__(self):
        super().__init__()
        self.__mitglieder = []
        self.__admin = ""

    def get_mitglieder(self):
        return self.__mitglieder

    def set_mitglieder(self, value):
        self.__mitglieder = value

    def set_mitglieder_append(self, value):
        self.__mitglieder.append(value)

    def get_admin(self):
        return self.__admin

    def set_admin(self, admin):
        self.__admin = admin

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz.

        Diese besteht aus der ID, dem Namen, den Lerntyp und den Modulen der Superklasse ergänzt durch die GoogleId

        des jeweiligen Kunden."""
        # TODO LERNTYP MODUL dazu allgemein attribute anschaun pls
        return "Customer: {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_name(), self.get_lerntyp(),
                                                         self.get_modul(), self.get_mitglieder(), self.get_admin())

    @staticmethod
    def from_dict(dictionary=dict()):
        """"Umwandeln eines Python dict() in eine Lerngruppe()."""
        obj = Lerngruppe()
        obj.set_id(dictionary["id"])
        obj.set_modul(dictionary["modul"])
        obj.set_profilBild(dictionary["profilBild"])
        obj.set_beschreibung(dictionary["beschreibung"])
        obj.set_lerntyp(dictionary["lerntyp"])
        obj.set_name(dictionary["name"])
        obj.set_mitglieder(dictionary["mitglieder"])
        obj.set_admin(dictionary["admin"])
        return obj
