from flask import Flask, request, jsonify, session
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import current_user
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
import redis
from flask_session import Session


users_app = Flask(__name__)
CORS(users_app, supports_credentials=True)

users_app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
users_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
users_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
users_app.config['SESSION_TYPE'] = 'redis'
users_app.config['CORS_HEADERS'] = 'Content-Type'

# POSTS_URL = 'http://localhost:5001/'
# CURRENCIES_URL = 'http://localhost:5003/'

users_db = SQLAlchemy(users_app)
users_ma = Marshmallow(users_app)

bcrypt = Bcrypt(users_app)

server_session = Session(users_app)

SESSION_TYPE = "redis"
SESSION_PERMANENT = False
SESSION_USE_SIGNER = True
SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")


class User(users_db.Model):
    id = users_db.Column(users_db.Integer, primary_key=True)
    imie = users_db.Column(users_db.String(20), nullable=False)
    nazwisko = users_db.Column(users_db.String(20), nullable=False)
    login = users_db.Column(users_db.String(
        100), unique=True, nullable=False)  # login to email
    haslo = users_db.Column(users_db.String(60), nullable=False)
    dataUrodzenia = users_db.Column(users_db.Date, nullable=False)
    czyAdmin = users_db.Column(users_db.Boolean, nullable=False, default=False)
    # posts = users_db.relationship('Post', backref='author', lazy=True)    #relacja
    # rachunki = db.relationship('Rachunek', backref='author', lazy=True)

    # @login_manager.user_loader
    # def load_user(user_id):
    #     return Klient.query.get(int(user_id))  # był tu user

    def __init__(self, imie, nazwisko, login, haslo, dataUrodzenia, czyAdmin=False):
        self.imie = imie
        self.nazwisko = nazwisko
        self.login = login
        self.haslo = bcrypt.generate_password_hash(haslo)
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


@users_app.route("/@me")
@cross_origin()
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return user_schema.jsonify(user)


@users_app.route("/register", methods=['POST', 'OPTIONS'])
@cross_origin()
def register():

    imie = request.json['imie']
    nazwisko = request.json['nazwisko']
    login = request.json['login']
    haslo = request.json['haslo']
    dataUrodzenia = datetime.strptime(
        request.json['dataUrodzenia'], "%d.%m.%Y")

    user_exists = User.query.filter_by(login=login).first() is not None

    if user_exists:
        return jsonify({"error": "Użytkownik już istnieje"}), 409

    new_user = User(imie=imie, nazwisko=nazwisko, login=login,
                    haslo=haslo, dataUrodzenia=dataUrodzenia)

    users_db.session.add(new_user)
    users_db.session.commit()

    session["user_id"] = new_user.id

    return user_schema.jsonify(new_user)


@users_app.route("/login", methods=['GET', 'POST'])
@cross_origin()
def login():

    login = request.json['login']
    haslo = request.json['haslo']

    user = User.query.filter_by(login=login).first()

    if user is None:
        return jsonify({"error": "Użytkownik nie istnieje"}), 401

    if not bcrypt.check_password_hash(user.haslo, haslo):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return user_schema.jsonify(user)


@users_app.route("/logout", methods=['POST'])
@cross_origin()
def logout():
    session.pop("user_id")

    return "200"


@users_app.after_request
def after_each(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    # with users_app.app_context():
    #     users_db.create_all()
    users_app.run(debug=True, port=5002)
