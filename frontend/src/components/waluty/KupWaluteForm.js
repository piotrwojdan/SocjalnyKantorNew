import Card from "../ui/Card";
import classes from './KupWaluteForm.module.css'
import { useRef, useEffect, useState } from "react"
import React from "react";
import Binance from "binance-api-react-native"

function KupWaluteForm(props) {
    const client = Binance()

    const [currencies, setCurrencies] = useState([]);
    const [currency, setCurrency] = useState("");
    const [ilosc, setIlosc] = useState(1);
    const [kurs, setKurs] = useState(0);
    let prices;

    useEffect(() => {
        fetch('http://127.0.0.1:5003/currency/get', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setCurrencies(resp))
            .catch(err => console.log(err))
        setCurrency('BTCUSDT')
    }, []);

    useEffect(() => {
        client.prices()
            .then(resp => prices = resp)
            .then(console.log(prices))
    }, []);


    //nie uzywamy states tyle ref bo interesuje nas stan tylko po przycisnieciu submit
    const walutaInputRef = useRef(); // w tym inpucie tworzymy połączenie z tym
    const iloscInputRef = useRef();
    const TrescInputRef = useRef();

    //react automatycznie przekaż event do tej funkcji jeśli wpiszemy ją w onSubmit
    function submitHandler(event) {
        event.preventDefault() //zapobiegamy wysyłaniu żadania przez przeglądarkę
        //czytamy podane przez użytkownika wartości

        const enteredWaluta = walutaInputRef.current.value //obecna wartość
        // const enteredDate = new Date()
        const enteredilosc = iloscInputRef.current.value

        const transactionData = {
            waluta: enteredWaluta,
            // data: enteredDate,
            ilosc: enteredilosc
        }
        console.log(transactionData)

        props.onSubmitForm(transactionData)
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor={'waluta'}>Waluta</label>
                    <select type="text" required id="waluta" ref={walutaInputRef}>
                        {currencies.map((cur) => { return <option value={cur.symbol}>{cur.symbol}</option> })}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor={'ilosc'}>Ilość</label>
                    <input
                        type="number"
                        id="ilosc"
                        min="0"
                        defaultValue={ilosc}
                        onChange={(event) => {
                            setIlosc(event.target.value)
                            return (event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57))
                        }}
                        ref={iloscInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor={'kurs'}>Kurs</label>
                </div>
                <label id="kurs">{kurs}</label>
                <div className={classes.control}>
                    <label htmlFor={'cena'}>Cena</label>
                </div>
                <label id="cena">{ilosc * kurs}</label>
                <div className={classes.actions}>
                    <button>Kup</button>
                </div>
            </form>
        </Card>
    )
}

export default KupWaluteForm;