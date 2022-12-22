from datetime import datetime
from users_application import users_db
from abc import ABCMeta

class User(metaclass=ABCMeta):
    login = ''
    haslo = ''
    imie = ''
    nazwisko = ''
    dataUrodzenia = datetime.utcnow


class Klient(users_db.Model):
    __tablename__ = "Klient"
    id = users_db.Column(users_db.Integer, primary_key=True)
    imie = users_db.Column(users_db.String(20), unique=True, nullable=True)
    login = users_db.Column(users_db.String(100), unique=True, nullable=False) #login to email
    # image_file = users_db.Column(users_db.String(20), nullable=True, default='default.jpg')
    haslo = users_db.Column(users_db.String(60), nullable=False)
    dataUrodzenia = users_db.Column(users_db.Date, nullable=True)
    # posts = users_db.relationship('Post', backref='author', lazy=True)    #relacja
    #rachunki = db.relationship('Rachunek', backref='author', lazy=True)

    # @login_manager.user_loader
    # def load_user(user_id):
    #     return Klient.query.get(int(user_id))  # był tu user

    def __repr__(self):
        return f"Użytkownik {self.imie}, {self.login}, {self.image_file}"
        

class Administrator(users_db.Model): #

    id = users_db.Column(users_db.Integer, primary_key=True)
    imie = users_db.Column(users_db.String(20), unique=True, nullable=True)
    login = users_db.Column(users_db.String(100), unique=True, nullable=False) #login to email
    # image_file = db.Column(db.String(20), nullable=True, default='default.jpg')
    haslo = users_db.Column(users_db.String(60), nullable=False)
    dataUrodzenia = users_db.Column(users_db.Date, nullable=True)
    # posts = db.relationship('Post', backref='author', lazy=True)    #relacja

    def __repr__(self):
        return f"Użytkownik {self.imie}, {self.login}, {self.image_file}"
