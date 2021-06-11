# Import aller Nötigen Flask Packages
import socket

from flask_cors import CORS
from flask_socketio import SocketIO, send, emit
# Api Endpunkte
from server.api.InitApi import InitApi
from server.api.VieleUserApi import VieleUserApi
from server.api.UsersApi import UsersApi
from server.api.UserApi import UserApi
from server.api.LerngruppeApi import LerngruppeApi
from server.api.LerngruppenApi import LerngruppenApi
from server.api.LerngruppenmitgliedApi import LerngruppenmitgliedApi
from server.api.model import api, app
from server.api.StudiengangApi import StudiengangApi
from server.api.ModulApi import ModulApi
from server.api.LerntypApi import LerntypApi
from server.api.UserMatchingApi import UserMatchingApi
from server.api.LerngruppenMatchingApi import LerngruppenMatchingApi
from server.api.UsersByIdApi import UsersByIdApi
from server.api.LerngruppenByIdApi import LerngruppenByIdApi
from server.db.ChatMapper import ChatMapper
from server.Administration import Administration

CORS(app, resources=r'/*')
socketIo = SocketIO(app, cors_allowed_origins="*")
app.config.from_pyfile('flask.cfg', silent=True)
# TODO: Checken ob diese Methode noch benötigt wird
"""@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    emit("message", msg)
    # send(msg, broadcast=True)
    # Administration.save_message(msg)
    # return None"""


@socketIo.on("message")
def handle_message(msg):
    print(msg)


@socketIo.on('usertoroom', namespace='/private')
def add_user_to_room(usertooroom):
    # Erwarte ein JSON mit den Attributen userId und roomId
    Administration.add_user_to_room(usertooroom['userId'], usertooroom['roomId'])


@socketIo.on('private_message', namespace='/private')
def nachricht(payLoad):
    room = payLoad['roomId']
    nachricht = payLoad['nachricht']
    sender = payLoad['userId']
    emit('new_message', nachricht, room=room)
    Administration.save_message(room, nachricht, sender)
    return None


@socketIo.on('roomId', namespace='/private')
def get_history(roomId):
    return Administration.get_chat_by_room(roomId)


# Api Endpunkte werden mit der Funktion add_resource an Flask übergeben
api.add_resource(UsersApi, '/users')
api.add_resource(UserApi, '/users/<string:authId>')
api.add_resource(UsersByIdApi, '/usersById')
api.add_resource(VieleUserApi, '/viele-user')

api.add_resource(LerngruppenApi, '/lerngruppen')
api.add_resource(LerngruppeApi, '/lerngruppe/<int:gruppen_id>')
api.add_resource(LerngruppenmitgliedApi, '/lerngruppen-mitglied')
api.add_resource(LerngruppenByIdApi, '/lerngruppenById')

api.add_resource(StudiengangApi, '/studiengang')
api.add_resource(ModulApi, '/modul/<string:studiengang>')
api.add_resource(LerntypApi, '/lerntyp')

api.add_resource(UserMatchingApi, '/usermatch/<string:authId>')
api.add_resource(LerngruppenMatchingApi, '/lerngruppenmatch/<string:authId>')

api.add_resource(InitApi, '/init/<string:authId>')

if __name__ == '__main__':
    # app.run(debug=True)
    socketIo.run(app, debug=True)
