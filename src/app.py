from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from server.bo.User import User


app = Flask(__name__)
api = Api(app)


@api.route('/benito')
class Benito(Resource):
    def get(self):
        return {'benito': 'schwanzhart'}


@api.route('/user')
class User(Resource):

    def get(self):
        projekt = User()



if __name__ == '__main__':
    app.run(debug=True)
