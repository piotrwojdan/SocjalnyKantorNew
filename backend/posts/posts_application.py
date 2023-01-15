from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from datetime import datetime, timezone
from enum import Enum
from sqlalchemy import update


# configuring the flask app and database
posts_app = Flask(__name__)
CORS(posts_app)
posts_app.config['CORS_HEADERS'] = 'Content-Type'

posts_app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
posts_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///posts.db'
posts_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

posts_db = SQLAlchemy(posts_app)
posts_ma = Marshmallow(posts_app)


class StatusPostu(Enum):
    NOWY = "nowy"
    EDYTOWANY = "edytowany"
    USUNIETY = "usuniety"


# creating model for the orm to communicate with the db
class Post(posts_db.Model):
    id = posts_db.Column(posts_db.Integer, primary_key=True)
    tytul = posts_db.Column(posts_db.String(150), nullable=False)
    dataUtworzenia = posts_db.Column(posts_db.DateTime, nullable=False, default=datetime.now())
    tresc = posts_db.Column(posts_db.Text, nullable=False)
    status = posts_db.Column(posts_db.String(10), default=StatusPostu.NOWY.value)
    user_id = posts_db.Column(posts_db.Integer, nullable=False) # to zamiast calej tabeli

    def __init__(self, tytul, tresc, user):
        self.tytul = tytul
        self.tresc = tresc
        self.user_id = user

    def __repr__(self):
        return f"Post {self.tytul}, {self.dataUtworzenia}, {self.tresc}"


class EdycjePostu(posts_db.Model):
    id = posts_db.Column(posts_db.Integer, primary_key=True)
    zawartosc = posts_db.Column(posts_db.Text, nullable=False)
    dataEdycji = posts_db.Column(posts_db.DateTime, nullable=False, default=datetime.now(timezone.utc))
    post = posts_db.Column(posts_db.Integer, posts_db.ForeignKey("post.id"), nullable=False)
    edytujacy = posts_db.Column(posts_db.Integer, posts_db.ForeignKey("admin.id"), nullable=False)

    def __init__(self, zawartosc, post_id, edytujacy):
        self.zawartosc = zawartosc
        self.post = post_id
        self.edytujacy = edytujacy


    def __init__(self, zawartosc):
        self.zawartosc = zawartosc
    

# class Klient(posts_db.Model):
#     id = posts_db.Column(posts_db.Integer, primary_key=True)
#     imie = posts_db.Column(posts_db.String(20), nullable=False)
#     nazwisko = posts_db.Column(posts_db.String(20), nullable=False)
#     posts = posts_db.relationship('Post', lazy=True)    #relacja


#     def __init__(self, id, imie, nazwisko):
#         self.id = id
#         self.imie = imie
#         self.nazwisko = nazwisko

#     def __repr__(self):
#         return f"Użytkownik {self.imie}, {self.login}"
        

# class Admin(posts_db.Model): #

#     id = posts_db.Column(posts_db.Integer, primary_key=True)
#     imie = posts_db.Column(posts_db.String(20), nullable=False)
#     nawzisko = posts_db.Column(posts_db.String(20), nullable=False)
#     posts = posts_db.relationship('Post', lazy=True)    #relacja

#     def __init__(self, imie, nazwisko):
#         self.imie = imie
#         self.nazwisko = nazwisko

#     def __repr__(self):
#         return f"Użytkownik {self.imie}, {self.login}"



# this is for jsonification of our post objects
class postSchema(posts_ma.Schema):
    class Meta:
        fields = ('id', 'tytul', 'status', 'dataUtworzenia', 'tresc', 'autor')

post_schema = postSchema()
posts_schema = postSchema(many=True)


@posts_app.route('/get', methods=['GET'])
@cross_origin()
def getPosts():
    posts = Post.query.all()
    results = posts_schema.dump(posts)
    return jsonify(results)

@posts_app.route('/get/<id>', methods=['GET'])
def getPostDetails(id):
    post = Post.query.get(id)
    return post_schema.jsonify(post)

@posts_app.route('/add', methods=['POST'])
def addPost():
    tytul = request.json['tytul']
    tresc = request.json['tresc']

    post = Post(tytul, tresc)
    print(post.dataUtworzenia)
    posts_db.session.add(post)
    posts_db.session.commit()

    return post_schema.jsonify(post)

@posts_app.route('/update/<id>', methods=['PUT'])
def editPost(id):
    post = Post.query.get(id)

    updatedTresc = request.json['tresc']
    updatedTytul = request.json['tytul']
    admin_id = request.json['user'] 

    # edycja = EdycjePostu(post.tresc, id, 0)  # tu potem zamiast 0 bedzie id zalogowanego uzytkownika
    post.tresc = updatedTresc
    post.tytul = updatedTytul
    post.dataUtworzenia = datetime.now()
    post.status = StatusPostu.EDYTOWANY.value


    # posts_db.session.add(edycja)
    posts_db.session.commit()

    return post_schema.jsonify(post)

@posts_app.route('/delete/<id>', methods=['DELETE'])
def deletePost(id):
    post = Post.query.get(id)
 
    post.status = StatusPostu.USUNIETY.value

    posts_db.session.commit()

    return post_schema.jsonify(post)


if __name__ == '__main__':
    # with posts_app.app_context():
        # posts_db.create_all()
    posts_app.run(debug=True, port=5001)
