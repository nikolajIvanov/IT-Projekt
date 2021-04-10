from flask_restx import Resource, fields, Api
from flask import Flask

from server.Administration import Administration

app = Flask(__name__)
api = Api(app)

model = api.model('Model', {
    'id': fields.Integer,
    'name': fields.String,
    'email': fields.String,
})

class TestApi(Resource):
    @api.marshal_with(model)
    def get(self, number):
        adm = Administration()
        user = adm.get_user_by_id(number)
        return user
