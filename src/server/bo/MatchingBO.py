from werkzeug.exceptions import InternalServerError


class MatchingBO:

    def __init__(self):
        self.__result = []

    def get_result(self):
        return self.__result

    def set_result(self, obj_id):
        self.__result.append(obj_id)

    def user_matching(self, mainUser, finderUser):
        # TODO: Kommentieren?
        try:
            unsorted_user = []
            users = {"user": None, "score": None}
            for user in finderUser:
                score = 0
                if mainUser.get_lerntyp() == user.get_lerntyp():
                    score += 1
                if mainUser.get_semester() == user.get_semester():
                    score += 1
                if mainUser.get_studiengang() == user.get_studiengang():
                    score += 1
                if mainUser.get_frequenz() == user.get_frequenz():
                    score += 1
                if mainUser.get_lernort() == user.get_lernort():
                    score += 1
                users["user"] = user.get_id()
                users["score"] = score
                unsorted_user.append(users.copy())

            sorted_user = sorted(unsorted_user, reverse=True, key=lambda k: k['score'])
            for i in sorted_user:
                self.set_result(i["user"])

            return self

        except:
            raise InternalServerError('Kein Matchingpartner vorhanden')

    def lerngruppen_matching(self, mainUser, match_gruppen):
        # TODO: Kommentieren?
        unsorted_gruppen = []
        gruppen = {"gruppenID": None, "score": None}
        for gruppe in match_gruppen:
            score = 0
            if mainUser.get_lerntyp() == gruppe.get_lerntyp():
                score += 1
            if mainUser.get_frequenz() == gruppe.get_frequenz():
                score += 1
            if mainUser.get_lernort() == gruppe.get_lernort():
                score += 1
            gruppen["gruppenID"] = gruppe.get_id()
            gruppen["score"] = score
            unsorted_gruppen.append(gruppen.copy())

        sorted_gruppenID = sorted(unsorted_gruppen, reverse=True, key=lambda k: k['score'])

        for i in sorted_gruppenID:
            self.set_result(i["gruppenID"])

        return self
