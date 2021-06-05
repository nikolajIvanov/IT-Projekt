from server.db.Mapper import Mapper
from server.bo.LerntypBO import LerntypBO


class LerntypMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("""SELECT id, bild, typ FROM TeamUP.lerntyp""")

        tuples = cursor.fetchall()

        for (id, bild, typ) in tuples:
            obj = LerntypBO()
            obj.set_id(id)
            obj.set_bild(bild)
            obj.set_lerntyp(typ)
            result.append(obj)

        self._cnx.commit()
        cursor.close()

        return result
