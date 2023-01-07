import Card from "../ui/Card";
import classes from './KupWaluteForm.module.css'
import { useRef, useEffect, useState } from "react"
import React from "react";

function KupWaluteForm(props) {

    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5003/get', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setCurrencies(resp))
            .catch(err => console.log(err))
    }, [])


    //nie uzywamy states tyle ref bo interesuje nas stan tylko po przycisnieciu submit
    const tytulInputRef = useRef(); // w tym inpucie tworzymy połączenie z tym
    const imageInputRef = useRef();
    const TrescInputRef = useRef();

    //react automatycznie przekaż event do tej funkcji jeśli wpiszemy ją w onSubmit
    function submitHandler(event) {
        event.preventDefault() //zapobiegamy wysyłaniu żadania przez przeglądarkę
        //czytamy podane przez użytkownika wartości

        const enteredTytul = tytulInputRef.current.value //obecna wartość
        const enteredDate = new Date()
        const enteredTresc = TrescInputRef.current.value

        const meetupData = {
            tytul: enteredTytul,
            data: enteredDate,
            tresc: enteredTresc
        }
        console.log(meetupData)

        props.onSubmitForm(meetupData)
    }

    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor={'waluta'}>Waluta</label>
                <select type="text" required id="tytul" ref={tytulInputRef}>
                    {currencies.map((cur) => { return <option value={cur.symbol}>{cur.symbol}</option>})}
                </select>
            </div>
            <div className={classes.control}>
                <label htmlFor={'Tresc'}>Treść</label>
                <textarea
                    id="Tresc"
                    required rows="5"
                    ref={TrescInputRef}
                ></textarea>
            </div>
            <div className={classes.action}>
                <button>Dodaj post</button>
            </div>
        </form>
    </Card>
}

export default KupWaluteForm;