from flask import Flask
from flask_restx import Api, Resource
from flask_cors import CORS

# Api Endpunkte
from server.Administration import Administration
from server.bo.User import User
app = Flask(__name__)

CORS(app, resources=r'/*')

api = Api(app)

@api.route('/test')
class Test(Resource):

    def get(self):
        pass

    def post(self):
        """Anlegen eines neuen User-Objekts.

                :return:
                """
        print(api.payload)


if __name__ == '__main__':
    app.run(debug=True)