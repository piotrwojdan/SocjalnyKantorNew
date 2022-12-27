from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

currencies_app = Flask(__name__)

currencies_app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
currencies_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///currencies.db'
currencies_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

currencies_db = SQLAlchemy(currencies_app)
marshmallow = Marshmallow(currencies_app)


class CurrencySchema(marshmallow.Schema):
    class Meta:
        fields = ('id', 'symbol', 'nazwa')


currency_schema = CurrencySchema()
currencies_schema = CurrencySchema(many=True)


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
    ilosc = currencies_db.Column(currencies_db.Double, nullable=False)
    cenaJednostkowa = currencies_db.Column(currencies_db.Double, nullable=False)
    cenaCalkowita = currencies_db.Column(currencies_db.Double, nullable=False)
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


class Rachunek(currencies_db.Model):
    id = currencies_db.Column(currencies_db.Integer, primary_key=True)
    numer = currencies_db.Column(currencies_db.Integer, nullable=False)
    saldo = currencies_db.Column(currencies_db.Integer, nullable=False)
    walutaId = currencies_db.Column(currencies_db.Integer, currencies_db.ForeignKey("waluta.id"), nullable=False)
    klientId = currencies_db.Column(currencies_db.Integer, currencies_db.ForeignKey("klient.id"), nullable=False)

    def __init__(self, numer, saldo):
        self.numer = numer
        self.saldo = saldo


class Klient(currencies_db.Model):
    id = currencies_db.Column(currencies_db.Integer, primary_key=True)
    imie = currencies_db.Column(currencies_db.String(20), nullable=False)
    nazwisko = currencies_db.Column(currencies_db.String(20), nullable=False)

    def __init__(self, imie, nazwisko):
        self.imie = imie
        self.nazwisko = nazwisko


@currencies_app.route('/get', methods=['GET'])
def get_currencies():
    all_currencies = Waluta.query.all()
    results = currency_schema.dump(all_currencies)
    return jsonify(results)


if __name__ == '__main__':
    currencies_app.run(debug=True)
