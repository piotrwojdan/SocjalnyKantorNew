import LargeCard from "../ui/LargeCard";
import classes from './KupWaluteForm.module.css'
import { useRef, useEffect, useState } from "react"
import React from "react";
import { formatData } from "../utils"
import Plot from "./Plot";
import axios from "axios";

const axio = axios.create({
    withCredentials: true,
});

function KupWaluteForm(props) {

    const [pair, setpair] = useState("");
    const [price, setprice] = useState("0.00");
    const [pastData, setpastData] = useState({});
    const [loading, setLoading] = useState(false);

    const ws = useRef(null);
    let first = useRef(false);
    const url = "https://api.pro.coinbase.com";

    const [currencies, setCurrencies] = useState([]);
    const [ilosc, setIlosc] = useState(1);
    const [dni, setDni] = useState(7);
    const [user_id, setUser_id] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const resp = await axio.get('http://localhost:5002/@me');
                setUser_id(resp.data.id);
            } catch (err) {
                console.log("Not authenticated")
            }
        })();
    }, []);


    useEffect(() => {
        if (!first.current) {
            return;
        }
        setLoading(true);

        let msg = {
            type: "subscribe",
            product_ids: [pair],
            channels: ["ticker"]
        };

        let jsonMsg = JSON.stringify(msg);
        ws.current.send(jsonMsg);

        let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
        const fetchHistoricalData = async () => {
            let dataArr = [];
            await fetch(historicalDataURL)
                .then((res) => res.json())
                .then((data) => (dataArr = data))
                .catch(err => console.log(err));

            let formattedData = formatData(dataArr);
            setpastData(formattedData);
        };

        fetchHistoricalData();
        setLoading(false);

        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);
            if (data.type !== "ticker") {
                return;
            }

            if (data.product_id === pair) {
                setprice(data.price);
            }
        };

    }, [pair, dni]);


    useEffect(() => {
        //connect to websocket API
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

        fetch('http://127.0.0.1:5003/currency/get', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setCurrencies(resp.map((cur) => {
                cur.symbol += "-USD";
                return cur
            })))
            .catch(err => console.log(err))
        // setCurrencies(currencies.filter((cur) => {cur.nazwa !== 'USD-USD'}))
        first.current = true;

    }, []);


    const walutaInputRef = useRef(); // w tym mijescu tworzymy po????czenie z inputem
    const iloscInputRef = useRef(); // zeby przekazac je do submitHandler


    //react automatycznie przeka?? event do tej funkcji je??li wpiszemy j?? w onSubmit
    function submitHandler(event) {
        event.preventDefault(); //zapobiegamy wysy??aniu ??adania przez przegl??dark??
        //czytamy podane przez u??ytkownika warto??ci

        const enteredWaluta = walutaInputRef.current.value; //obecna warto????
        const enteredilosc = iloscInputRef.current.value;
        const enteredKurs = price;
        const enteredCena = price * parseFloat(enteredilosc);

        const waluta = currencies.filter((cur) => { return cur.symbol === enteredWaluta })[0]
        console.log(waluta)

        const transactionData = {
            waluta_name: waluta.nazwa,
            waluta_id: waluta.id,
            ilosc: enteredilosc,
            cena: enteredCena,
            kurs: enteredKurs,
            klient: user_id,
            data: new Date().toJSON()
        }
        console.log(transactionData)

        props.onSubmitForm(transactionData)
    }

    const handleSelect = (e) => {
        let unsubMsg = {
            type: "unsubscribe",
            product_ids: [pair],
            channels: ["ticker"]
        };
        let unsub = JSON.stringify(unsubMsg);

        ws.current.send(unsub);

        const waluta = e.target.value

        setpair(waluta);
    };

    const handleNumber = (e) => {

        let input = e.target.value

        if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
            setIlosc(input)

    }

    const handleFloat = () => {
        setIlosc(parseFloat(ilosc) || '')
    }

    if (loading) {
        return (
            <LargeCard>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <div className={classes.control}>
                                    <div className="ms-2">
                                        <label htmlFor={'waluta'}>Waluta</label>
                                        <select className="form-select" type="text" required id="waluta" ref={walutaInputRef} onChange={handleSelect}>
                                            <option key="" value=""></option>
                                            {currencies.map((cur) => { if (cur.symbol !== "USD-USD") return <option key={cur.id} value={cur.symbol}>{cur.symbol}</option> })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className={classes.control}>
                                    <label htmlFor={'kurs'}>Kurs</label>
                                    <input id="kurs" type="text" value={price} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm">
                                    <div className={classes.control}>
                                        <label htmlFor={'ilosc'}>Ilo????</label>
                                        <input
                                            id="ilosc"
                                            min="0"
                                            value={ilosc}
                                            onChange={handleNumber}
                                            onBlur={handleFloat}
                                            ref={iloscInputRef}
                                            required />
                                    </div>
                                </div>
                                <div className="col-sm">

                                    <div className={classes.control}>
                                        <label htmlFor={'cena'}>Cena</label>
                                        <input id="cena" type="text" value={(ilosc * price).toFixed(2)} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.actions}>
                                <button className="btn btn-secondary px-4">Kup</button>
                            </div>
                        </div>
                    </div>
                </form>
            </LargeCard>
        )
    } else {

        return (
            <>
                <LargeCard>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm">
                                    <div className={classes.control}>
                                        <div className="ms-2">
                                            <label htmlFor={'waluta'}>Waluta</label>
                                            <select className="form-select" type="text" required id="waluta" ref={walutaInputRef} onChange={handleSelect}>
                                                <option key="" value=""></option>
                                                {currencies.map((cur) => { if (cur.symbol !== "USD-USD") return <option key={cur.id} value={cur.symbol}>{cur.symbol}</option> })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className={classes.control}>
                                        <label htmlFor={'kurs'}>Kurs</label>
                                        <input id="kurs" type="text" value={price} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        <div className={classes.control}>
                                            <label htmlFor={'ilosc'}>Ilo????</label>
                                            <input
                                                id="ilosc"
                                                min="0"
                                                value={ilosc}
                                                onChange={handleNumber}
                                                onBlur={handleFloat}
                                                ref={iloscInputRef} />
                                        </div>
                                    </div>
                                    <div className="col-sm">

                                        <div className={classes.control}>
                                            <label htmlFor={'cena'}>Cena</label>
                                            <input id="cena" type="text" value={(ilosc * price).toFixed(2)} readOnly />
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.actions}>
                                    <button className="btn btn-secondary px-4">Kup</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </LargeCard>

                <LargeCard>
                    <Plot price={price} data={pastData} days={dni} />
                    <div className="container my-4 ms-5">
                        <div className="row ms-5">
                            <div className="col-sm">
                                <input type="radio" className="btn-check" name="days" id="30" autoComplete="off" onClick={(e) => { setDni(30) }} />
                                <label className="btn btn-secondary px-5" htmlFor="30">30 Dni</label>
                            </div>
                            <div className="col-sm">
                                <input type="radio" className="btn-check" name="days" id="14" autoComplete="off" onClick={(e) => { setDni(14) }} />
                                <label className="btn btn-secondary px-5" htmlFor="14">14 Dni</label>
                            </div>
                            <div className="col-sm">
                                <input type="radio" className="btn-check" name="days" id="7" autoComplete="off" defaultChecked onClick={(e) => { setDni(7) }} />
                                <label className="btn btn-secondary px-5" htmlFor="7">7 Dni</label>
                            </div>
                        </div>
                    </div>
                </LargeCard>

            </>
        )
    }
}

export default KupWaluteForm;