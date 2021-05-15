from flask import Flask
from flask_restx import Api, fields


app = Flask(__name__)
api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute=lambda x: x.get_id(), description='Der Unique Identifier eines Business Object'),
})


user = api.inherit('User', bo, {
    'uid': fields.String(attribute=lambda x: x.get_uid(), description='GoogleID eines Benutzers'),
    'name': fields.String(attribute=lambda x: x.get_name(), description='Name eines Benutzers'),
    'email': fields.String(attribute=lambda x: x.get_email(), description='E-Mail-Adresse eines Benutzers')

})


