from flask import Flask
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from server.bo.User import User

from server.Administration import Administration


app = Flask(__name__)

CORS(app, resources=r'/*')

api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

user = api.inherit('User', bo, {
    'name': fields.String(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'email': fields.String(attribute='_id', description='Der Unique Identifier eines Business Object')
})

@api.route('/benito')
class Benito(Resource):
    def get(self):
        return {'benito': 'schwanzhart'}


@api.route('/user')
class User(Resource):
    @api.marshal_with(user)
    def get(self):
        adm = Administration()
        nutzer = adm.get_all_users()
        return nutzer


if __name__ == '__main__':
    app.run(debug=True)
