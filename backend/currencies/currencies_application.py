from flask import Flask
from flask_sqlalchemy import SQLAlchemy

currencies_app = Flask(__name__)

currencies_app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
currencies_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///currencies.db'

currencies_db = SQLAlchemy(currencies_app)