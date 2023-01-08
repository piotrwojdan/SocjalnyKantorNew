import LargeCard from "../ui/LargeCard";
import classes from './KupWaluteForm.module.css'
import { useRef, useEffect, useState } from "react"
import React from "react";
import { formatData } from "../utils"
import Plot from "./Plot";

function KupWaluteForm(props) {

    const [pair, setpair] = useState("");
    const [price, setprice] = useState("0.00");
    const [pastData, setpastData] = useState({});

    const ws = useRef(null);
    let first = useRef(false);
    const url = "https://api.pro.coinbase.com";

    const [currencies, setCurrencies] = useState([]);
    const [currency, setCurrency] = useState("");
    const [ilosc, setIlosc] = useState(1);
    

    useEffect(() => {
        //connect to websocket API
        ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
        //inside useEffect we need to make API with async function  
        let pairs;

        const apiCall = async () => {
            await fetch(url + "/products")
                .then((res) => res.json())
                .then((data) => (pairs = data));

            //coinbase returns over 120 currencies, this will filter to only USD based pairs
            let filtered = pairs.filter((pair) => {
                if (pair.quote_currency === "USD") {
                    return pair;
                }
            });

            //sort filtered currency pairs alphabetically
            filtered = filtered.sort((a, b) => {
                if (a.base_currency < b.base_currency) {
                    return -1;
                }
                if (a.base_currency > b.base_currency) {
                    return 1;
                }
                return 0;
            });

            setCurrencies(filtered);

            first.current = true;
        };

        //call async function
        apiCall()
    }, [])

    useEffect(() => {
        //prevents this hook from running on initial render
        if (!first.current) {
            return;
        }


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
                .then((data) => (dataArr = data));

            //helper function to format data that will be implemented later
            let formattedData = formatData(dataArr);
            setpastData(formattedData);
        };
        //run async function to get historical data
        fetchHistoricalData();
        //need to update event listener for the websocket object so that it is listening for the newly updated currency pair
        ws.current.onmessage = (e) => {
            let data = JSON.parse(e.data);
            console.log(data)
            if (data.type !== "ticker") {
                return;
            }
            //every time we receive an even from the websocket for our currency pair, update the price in state
            if (data.product_id === pair) {
                setprice(data.price);
            }
        };
        //dependency array is passed pair state, will run on any pair state change

    }, [pair]);

    useEffect(() => {
        fetch('http://127.0.0.1:5003/currency/get', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setCurrencies(resp.map((cur) => {return cur+"-USD"})))
            .catch(err => console.log(err))
    }, []);


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

    const handleSelect = (e) => {
        let unsubMsg = {
          type: "unsubscribe",
          product_ids: [pair],
          channels: ["ticker"]
        };
        let unsub = JSON.stringify(unsubMsg);
    
        ws.current.send(unsub);
    
        setpair(e.target.value);
      };

    return (
        <>
            <LargeCard>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor={'waluta'}>Waluta</label>
                        <select type="text" required id="waluta" ref={walutaInputRef} onChange={handleSelect}>
                            {currencies.map((cur) => { return <option key={cur.id} value={cur.id}>{cur.id}</option> })}
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
                    <label id="kurs">{price}</label>
                    <div className={classes.control}>
                        <label htmlFor={'cena'}>Cena</label>
                    </div>
                    <label id="cena">{ilosc * kurs}</label>
                    <div className={classes.actions}>
                        <button>Kup</button>
                    </div>
                </form>
            </LargeCard>
            <LargeCard>
                <Plot price={price} data={pastData} />
            </LargeCard>
        </>
    )
}

export default KupWaluteForm;