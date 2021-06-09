from server.bo.UserBO import UserBO


class MatchingBO:

    def __init__(self):
        self.__score = None
        self.__userID = None
        self.__result = []

    def user_matching(self, mainUser, finderUser):
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
            users["user"] = user
            users["score"] = score
            unsorted_user.append(users.copy())
        sorted_user = sorted(unsorted_user, reverse=True, key=lambda k: k['score'])
        for i in sorted_user:
            self.__result.append(i["user"])
        return self.__result

    def lerngruppen_matching(self):
        pass
