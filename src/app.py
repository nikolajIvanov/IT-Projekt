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
from server.api.ChatApi import ChatApi
from server.Administration import Administration
from server.api.Chat import Chat
from server.api.ChatRoomApi import ChatRoomApi
from server.api.RequestApi import RequestApi
from server.api.MyRooms import MyRooms

CORS(app, resources=r'/*')
socketIo = SocketIO(app, cors_allowed_origins="*")
app.config.from_pyfile('flask.cfg', silent=True)

socketIo.on_namespace(Chat('/chat'))


@socketIo.on('usertoroom', namespace='/private')
def add_user_to_room(usertooroom):
    # Erwarte ein JSON mit den Attributen userId und roomId
    Administration.add_user_to_room(usertooroom['userId'], usertooroom['roomId'])


@socketIo.on('private_message', namespace='/private')
def nachricht(payLoad):
    room = payLoad['roomId']
    message = payLoad['message']
    sender = payLoad['userId']
    emit('new_message', message, room=room)
    Administration.save_message(room, message, sender)


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

api.add_resource(ChatApi, '/chat/<int:roomId>')
api.add_resource(ChatRoomApi, '/chatrooms')
api.add_resource(ChatRoomApi, '/chatrooms/<string:authId>')

# Sendet einen Post befehl der ein argument type hat um zwischen gruppen und single unterscheiden zu können
api.add_resource(RequestApi, '/request')

api.add_resource(InitApi, '/init/<string:authId>')

if __name__ == '__main__':
    # app.run(debug=True)
    socketIo.run(app, debug=True)
