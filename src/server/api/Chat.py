from flask_socketio import Namespace, emit, send

from server.Administration import Administration


class Chat(Namespace):
    def on_connect(self):
        pass

    def on_disconnect(self):
        pass

    def on_my_event(self, data):
        emit('my_response', data)

    def on_message(self, msg):
        print(msg)
        send(msg, broadcast=True)
        room = msg['roomId']
        message = msg['message']
        sender = msg['userId']
        emit('new_message', message)
        Administration.save_message(room, message, sender)
