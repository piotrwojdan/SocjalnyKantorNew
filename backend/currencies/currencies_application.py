from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
import random
from datetime import datetime

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


class transactionSchema(currencies_ma.Schema):
    class Meta:
        fields = ('id', 'ilosc', 'cenaJednostkowa', 'cenaCalkowita', 'numerKarty', 'rachunekId', 'dataZakonczenia', 'walutaId', 'klientId')


transaction_schema = transactionSchema()
transactions_schema = transactionSchema(many=True)


class rachunekSchema(currencies_ma.Schema):
    class Meta:
        fields = ('id', 'numer', 'saldo', 'walutaId','klientId')


rachunek_schema = rachunekSchema()
rachunki_schema = rachunekSchema(many=True)


class Waluta(currencies_db.Model):
    id = currencies_db.Column(currencies_db.Integer, primary_key=True)
    symbol = currencies_db.Column(currencies_db.String(5), nullable=False)
    nazwa = currencies_db.Column(currencies_db.String(30), nullable=False)

    def __init__(self, symbol, nazwa):
        self.symbol = symbol
        self.nazwa = nazwa


class Transakcja(currencies_db.Model):
    id = currencies_db.Column(currencies_db.Integer, primary_key=True)
    ilosc = currencies_db.Column(currencies_db.Float, nullable=False)
    cenaJednostkowa = currencies_db.Column(currencies_db.Float, nullable=False)
    cenaCalkowita = currencies_db.Column(currencies_db.Float, nullable=False)
    numerKarty = currencies_db.Column(currencies_db.String(40), nullable=True)
    dataUtworzenia = currencies_db.Column(
        currencies_db.DateTime, nullable=False)
    dataZakonczenia = currencies_db.Column(
        currencies_db.DateTime, nullable=False)
    walutaId = currencies_db.Column(
        currencies_db.Integer, currencies_db.ForeignKey("waluta.id"), nullable=False)
    klientId = currencies_db.Column(currencies_db.Integer, nullable=False)
    rachunekId = currencies_db.Column(
        currencies_db.Integer, currencies_db.ForeignKey("rachunek.id"), nullable=True)

    def __init__(self, ilosc, waluta_id, cena_jednostkowa, cenaCalkowita, dataUtworzenia, dataZakonczenia, user_id, rachunek_id, numer_karty):
        self.ilosc = float(ilosc)
        self.walutaId = waluta_id
        self.cenaJednostkowa = float(cena_jednostkowa)
        self.cenaCalkowita = cenaCalkowita
        self.dataUtworzenia = dataUtworzenia
        self.dataZakonczenia = dataZakonczenia
        self.klientId = user_id
        self.rachunekId = rachunek_id
        self.numerKarty = numer_karty


class Rachunek(currencies_db.Model):
    id = currencies_db.Column(currencies_db.Integer, primary_key=True)
    numer = currencies_db.Column(currencies_db.Integer, nullable=False)
    saldo = currencies_db.Column(currencies_db.Float, nullable=False)
    walutaId = currencies_db.Column(
        currencies_db.Integer, currencies_db.ForeignKey("waluta.id"), nullable=False)
    klientId = currencies_db.Column(currencies_db.Integer, nullable=False)

    def __init__(self, numer, waluta, klient, saldo=0):
        self.numer = numer
        self.saldo = saldo
        self.walutaId = waluta
        self.klientId = klient


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
@cross_origin()
def add_transaction():
    ilosc = request.json['ilosc']
    cenaJednostkowa = request.json['cenaJedn']
    cenaCalkowita = request.json['cenaCalk']
    numerKarty = request.json.get('nrKarty', None)
    dataUtworzenia = request.json['dataU']
    dataZakonczenia = request.json['dataZ']
    walutaId = request.json['waluta']
    klientId = request.json['klient']
    rachunekId = request.json.get('idRachunku', None)

    dataUtworzenia = datetime.strptime(dataUtworzenia, '%Y-%m-%dT%H:%M:%S.%f%z')
    dataZakonczenia = datetime.strptime(dataZakonczenia, '%Y-%m-%dT%H:%M:%S.%f%z')

    transakcja = Transakcja(ilosc, walutaId, cenaJednostkowa, cenaCalkowita, dataUtworzenia,
                            dataZakonczenia, klientId, rachunekId, numerKarty)

    rachunek_docelowy = Rachunek.query.filter_by(
        klientId=klientId, walutaId=walutaId).first()

    if not rachunek_docelowy:
        numerRachunku = random.randint(
            int(walutaId)*1000000, int(walutaId)*10000000)

        while Rachunek.query.filter_by(numer=numerRachunku).first():
            numerRachunku = random.randint(
                int(walutaId)*1000000, int(walutaId)*10000000)

        rachunek_docelowy = Rachunek(
            numerRachunku, walutaId, klientId, float(ilosc))
        currencies_db.session.add(rachunek_docelowy)
    else:
        rachunek_docelowy.saldo += float(ilosc)

    if rachunekId:
        oplacono_z = Rachunek.query.get(rachunekId)
        oplacono_z.saldo -= cenaCalkowita

    currencies_db.session.add(transakcja)
    currencies_db.session.commit()

    return transaction_schema.jsonify(transakcja)


@currencies_app.route('/transaction/get', methods=['GET'])
def get_transactions():
    user_id = request.json['user_id']
# to nam zwraca transakcje danego uzytkownika
    transakcje = Transakcja.query.filter_by(klientId=user_id).all()

    results = transactions_schema.jsonify(transakcje)
    return results

@currencies_app.route('/accounts/get', methods=['POST'])
@cross_origin()
def get_accounts_user():
    user_id = request.json['klient']
# to nam zwraca rachunki danego uzytkownika
    rachunki = Rachunek.query.filter_by(klientId=user_id).all()

    results = rachunki_schema.dump(rachunki)
    return jsonify(results)


@currencies_app.route('/accounts/add', methods=['POST'])
def add_rachunek():
    walutaId = request.json['waluta']
    klientId = request.json['klient']

    numerRachunku = random.randint(int(walutaId)*1000000, int(walutaId)*10000000)

    while Rachunek.query.filter_by(numer=numerRachunku).first():
        numerRachunku = random.randint(int(walutaId)*1000000, int(walutaId)*10000000)

    rachunek = Rachunek(numerRachunku, walutaId, klientId)

    currencies_db.session.add(rachunek)
    currencies_db.session.commit()

    return rachunek_schema.jsonify(rachunek)

@currencies_app.after_request
def after_each(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

if __name__ == '__main__':
    # with currencies_app.app_context():
    #     currencies_db.create_all()
    currencies_app.run(debug=True, port=5003)
