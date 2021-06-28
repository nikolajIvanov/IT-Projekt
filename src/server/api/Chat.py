from flask_socketio import Namespace, emit, send
from server.Administration import Administration
from server.api.ChatRoomApi import ChatRoomApi


class Chat(Namespace):
    def on_connect(self):
        pass

    def on_disconnect(self):
        pass

    def on_my_event(self, data):
        emit('my_response', data)

    def on_message(self, msg):
        """
        Verarbeitet ein Chatnachricht. Sendet die Nachricht an alle Empfänger und speichert sie auf der DB
        :param msg: Nachrichtenobjekt
        """
        print(msg)
        send(msg, broadcast=True)
        room = msg['roomId']
        message = msg['message']
        sender = msg['userId']
        emit('message', message)
        Administration.save_message(room, message, sender)

    def on_serverload(self, data):
        """
        Läd die Nachrichten Historie für einen Chat
        :param data: Daten des Chats
        """
        chat_api = ChatRoomApi()
        chatlist = chat_api.get(data["auth_id"])
        emit('chatlist', chatlist)
