from flask import Flask
from flask_sqlalchemy import SQLAlchemy

users_app = Flask(__name__)

users_app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
users_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
users_db = SQLAlchemy(users_app)