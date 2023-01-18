from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

currencies_app = Flask(__name__)

CORS(currencies_app)
currencies_app.config['CORS_HEADERS'] = 'Content-Type'

currencies_app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
currencies_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///currencies.db'
currencies_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

currencies_db = SQLAlchemy(currencies_app)
currencies_ma = Marshmallow(currencies_app)



class CurrencySchema(currencies_ma.Schema):
    class Meta:
        fields = ('id', 'symbol', 'nazwa')


currency_schema = CurrencySchema()
currencies_schema = CurrencySchema(many=True)

class userSchema(currencies_ma.Schema):
    class Meta:
        fields = ('id', 'imie', 'nazwisko')

user_schema = userSchema()
users_schema = userSchema(many=True)

class transactionSchema(currencies_ma.Schema):
    class Meta:
        fields = ('id', 'ilosc', 'cenaJedn', 'cena', 'nrKarty', 'idRachunku')

transaction_schema = transactionSchema()
transactions_schema = transactionSchema(many=True)

class rachunekSchema(currencies_ma.Schema):
    class Meta:
        fields = ('id', 'numer', 'saldo', 'idKlienta')

rachunek_schema = rachunekSchema()
rachunki_schema = rachunekSchema(many=True)

class Waluta(currencies_db.Model):
    id = currencies_db.Column(currencies_db.Integer, primary_key=True)
    symbol = currencies_db.Column(currencies_db.String(5), nullable=False)
    nazwa = currencies_db.Column(currencies_db.String(30), nullable=False)
    # cena = currencies_db.Column(currencies_db.Float, nullable=False)
    # dataAktualizacjiCeny = currencies_db.Column(currencies_db.DateTime, nullable=False)

    def __init__(self, symbol, nazwa):
        self.symbol = symbol
        self.nazwa = nazwa


class Transakcja(currencies_db.Model):
    id = currencies_db.Column(currencies_db.Integer, primary_key=True)
    ilosc = currencies_db.Column(currencies_db.Float, nullable=False)
    cenaJednostkowa = currencies_db.Column(currencies_db.Float, nullable=False)
    cenaCalkowita = currencies_db.Column(currencies_db.Float, nullable=False)
    numerKarty = currencies_db.Column(currencies_db.String(40), nullable=False)
    # dataUtworzenia = currencies_db.Column(currencies_db.DateTime, nullable=False)
    # dataZakonczenia = currencies_db.Column(currencies_db.DateTime, nullable=False)
    walutaId = currencies_db.Column(currencies_db.Integer, currencies_db.ForeignKey("waluta.id"), nullable=False)
    klientId = currencies_db.Column(currencies_db.Integer, currencies_db.ForeignKey("klient.id"), nullable=False)
    rachunekId = currencies_db.Column(currencies_db.Integer, currencies_db.ForeignKey("rachunek.id"), nullable=False)

    def __init__(self, ilosc, waluta_id, cena_jednostkowa):
        self.ilosc = ilosc
        self.walutaId = waluta_id
        self.cenaJednostkowa = cena_jednostkowa
        self.cenaCalkowita = cena_jednostkowa * ilosc


class Rachunek(currencies_db.Model):
    id = currencies_db.Column(currencies_db.Integer, primary_key=True)
    numer = currencies_db.Column(currencies_db.Integer, nullable=False)
    saldo = currencies_db.Column(currencies_db.Integer, nullable=False)
    walutaId = currencies_db.Column(currencies_db.Integer, currencies_db.ForeignKey("waluta.id"), nullable=False)
    klientId = currencies_db.Column(currencies_db.Integer, currencies_db.ForeignKey("klient.id"), nullable=False)

    def __init__(self, numer, waluta, klient):
        self.numer = numer
        self.saldo = 0
        self.walutaId = waluta
        self.klientId = klient


class Klient(currencies_db.Model):
    id = currencies_db.Column(currencies_db.Integer, primary_key=True)
    imie = currencies_db.Column(currencies_db.String(20), nullable=False)
    nazwisko = currencies_db.Column(currencies_db.String(20), nullable=False)

    def __init__(self, imie, nazwisko):
        self.imie = imie
        self.nazwisko = nazwisko


@currencies_app.route('/currency/get', methods=['GET'])
def get_currencies():
    all_currencies = Waluta.query.all()
    results = currencies_schema.dump(all_currencies)
    return jsonify(results)

@currencies_app.route('/currency/add', methods=['POST'])
def add_currency():
    symbol = request.json['symbol']
    nazwa = request.json['nazwa']

    waluta = Waluta(symbol, nazwa)

    currencies_db.session.add(waluta)
    currencies_db.session.commit()

    return currency_schema.jsonify(waluta)

@currencies_app.route('/transaction/add', methods=['POST'])
def add_transaction():
    ilosc = request.json['ilosc']
    cenaJednostkowa = request.json['cenaJedn']
    numerKarty = request.json['nrKarty']
    # dataUtworzenia = currencies_db.Column(currencies_db.DateTime, nullable=False)
    # dataZakonczenia = currencies_db.Column(currencies_db.DateTime, nullable=False)
    walutaId = request.json['waluta']
    klientId = request.json['klient']
    rachunekId = request.json['idRachunku']

    transakcja = Transakcja(ilosc, walutaId, cenaJednostkowa, klientId, )

    currencies_db.session.add(transakcja)
    currencies_db.session.commit()

    return transaction_schema.jsonify(transakcja)

@currencies_app.route('/transaction/get', methods=['GET'])
def get_transactions():
    all_currencies = Waluta.query.all()
    results = transactions_schema.dump(all_currencies)
    return jsonify(results)

@currencies_app.route('/rachunek/add', methods=['POST'])
def add_rachunek():
    numer = request.json['numer']
    walutaId = request.json['waluta']
    klientId = request.json['klient']

    rachunek = Rachunek(numer, walutaId, klientId)

    currencies_db.session.add(rachunek)
    currencies_db.session.commit()

    return rachunek_schema.jsonify(rachunek)


if __name__ == '__main__':
    # with currencies_app.app_context():
    #     currencies_db.create_all()
    currencies_app.run(debug=True, port=5003)
