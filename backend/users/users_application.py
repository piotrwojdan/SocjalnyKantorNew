from flask import Flask, request, jsonify
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from abc import ABCMeta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_login import current_user
from flask_cors import CORS
import requests, json

users_app = Flask(__name__)
CORS(users_app)

users_app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
users_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

POSTS_URL = 'http://localhost:5001/'
CURRENCIES_URL = 'http://localhost:5003/'

users_db = SQLAlchemy(users_app)
users_ma = Marshmallow(users_app)

users_app.config['JWT_SECRET_KEY'] = '78f8fd67gf7gd8fg68df7g6800gs7ff897s9d'
users_jwt = JWTManager(users_app)


# class User(metaclass=ABCMeta):
#     login = ''
#     haslo = ''
#     imie = ''
#     nazwisko = ''
#     dataUrodzenia = datetime.utcnow


class User(users_db.Model):
    id = users_db.Column(users_db.Integer, primary_key=True)
    imie = users_db.Column(users_db.String(20), nullable=False)
    nazwisko = users_db.Column(users_db.String(20), nullable=False)
    login = users_db.Column(users_db.String(100), unique=True, nullable=False) #login to email
    haslo = users_db.Column(users_db.String(60), nullable=False)
    dataUrodzenia = users_db.Column(users_db.Date, nullable=False)
    czyAdmin = users_db.Column(users_db.Boolean, nullable=False, default=False)
    # posts = users_db.relationship('Post', backref='author', lazy=True)    #relacja
    #rachunki = db.relationship('Rachunek', backref='author', lazy=True)

    # @login_manager.user_loader
    # def load_user(user_id):
    #     return Klient.query.get(int(user_id))  # był tu user

    def __init__(self, imie, nazwisko, login, haslo, dataUrodzenia, czyAdmin=False):
        self.imie = imie
        self.nazwisko = nazwisko
        self.login = login
        self.haslo = generate_password_hash(haslo, method="sha256")
        self.dataUrodzenia = dataUrodzenia
        self.czyAdmin = czyAdmin

    def __repr__(self):
        return f"Użytkownik {self.imie}, {self.login}"
        




# this is for jsonification of our user objects
class UserSchema(users_ma.Schema):
    class Meta:
        fields = ('id', 'imie', 'nazwisko', 'login', 'haslo', 'dataUrodzenia')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


@users_app.route("/register", methods=['POST'])
def register():
    imie = request.json['imie']
    nazwisko = request.json['nazwisko']
    login = request.json['login']
    haslo = request.json['haslo']
    dataUrodzenia = datetime.strptime(request.json['dataUrodzenia'], "%d.%m.%Y")

    user = User(imie, nazwisko, login, haslo, dataUrodzenia)

    users_db.session.add(user)
    users_db.session.commit()

    # to jest po to zeby sie uzytkownicy tez dodawali w pozostalych czesciach aplikacji
    to_send = {'id': f'{user.id}', 'imie': imie, 'nazwisko': nazwisko}
    requests.post(POSTS_URL + "user/add", json=to_send)
    requests.post(CURRENCIES_URL + "user/add", json=to_send)

    return user_schema.jsonify(user)


@users_app.route("/token", methods=['POST'])
def create_token():
    login = request.json.get('login', None)
    haslo = request.json.get('haslo', None)

    # Sprawdzanie poprawnosci tutaj powinno byc
    if login != 'test' or haslo != 'test':
        return jsonify({'msg': 'Zle dane'}), 401

    access_token = create_access_token(identity=login)
    return jsonify(access_token=access_token)


@users_app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:  # sprawdzamy czy jest już zalogowany
        return 




if __name__ == '__main__':
    # with users_app.app_context():
    #     users_db.create_all()
    users_app.run(debug=True, port=5002)