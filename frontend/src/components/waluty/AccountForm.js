import React, { useEffect, useRef, useState } from 'react'
import classes from './CardForm.module.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios";


const axio = axios.create({
    withCredentials: true,
});


function AccountForm(props) {
    const [accounts, setAccounts] = useState([]);
    const currencies = props.currencies;
    const accountRef = useRef();

    const navigate = useNavigate();

    function submitHandler(event) {
        event.preventDefault();

        let chosenAccount = accountRef.current.value;

        const temp = accounts.filter(acc => {return acc.numer.toString() === chosenAccount})[0];
        console.log(temp)

        const moretransactionData = {
            idRachunku: temp.id
        }
        console.log(moretransactionData)

        props.onSubmitForm(moretransactionData)
    }

    useEffect(() => {
        (async () => {
            try {
                const resp = await axio.post('http://localhost:5003/accounts/get', { klient: props.user_id })
                let accs = resp.data
                accs = accs.map((acc) => {
                    let result = currencies.filter( cur => cur.id === acc.walutaId);
                    acc.walutaId = result[0].symbol
                    return acc
                })
                accs = accs.filter((acc) => {return acc.walutaId === "USD"});
                setAccounts(accs)
            } catch (err) {
                console.log("Not authenticated")
            }
        })();
    }, [])

    const handleSelect = (e) => {
        let chosenAccount = accountRef.current.value;

        const temp = accounts.filter(acc => {return acc.numer.toString() === chosenAccount})[0];
        if (temp.saldo < props.cena) {
            alert("Za mało środków na wybranym rachunku!")
        }
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className="container my-4">
                <div className={classes.control}>
                    <label htmlFor={'account'}>Rachunek</label>
                    <select className="form-select" type="text" required ref={accountRef} onChange={handleSelect}>
                        {accounts.map((acc) => { return <option key={acc.id} value={acc.numer}>{acc.numer} --- {acc.walutaId}</option> })}
                    </select>
                </div>
                <div className={classes.actions}>
                    <button className='btn btn-danger mb-4 ' onClick={(e) => { navigate(-1) }}>Anuluj</button>
                    <button className='btn btn-primary mb-4'>Kup</button>
                </div>
            </div>
        </form>
    );
}

export default AccountForm