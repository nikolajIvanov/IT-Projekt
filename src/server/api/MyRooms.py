from .model import room, api
from flask_restx import Resource
from server.Administration import Administration
from server.bo.RoomBO import RoomBO


class MyRooms(Resource):

    @api.marshal_with(room)
    def get(self, authId):
        return Administration.get_rooms_of_user(authId)
