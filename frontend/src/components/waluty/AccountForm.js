import React, { useEffect, useRef, useState } from 'react'
import classes from './CardForm.module.css'
import { useNavigate } from 'react-router-dom'


function AccountForm(props) {
    const [accounts, setAccounts] = useState([]);
    const accountRef = useRef();

    const navigate = useNavigate();

    function submitHandler(event) {
        event.preventDefault();

        let chosenAccount = accountRef.current.value;

        const moretransactionData = {
            idRachunku: chosenAccount
        }
        console.log(moretransactionData)

        props.onSubmitForm(moretransactionData)
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5003/accounts", {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setAccounts(resp))
            .catch(err => console.log(err))
    }, [])

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className="container my-4">
                <div className={classes.control}>
                    <label htmlFor={'account'}>Rachunek</label>
                    <select className="form-select" type="text" required ref={accountRef}>
                        {accounts.map((cur) => { return <option key={cur.id} value={cur.id}>{cur.numer}</option> })}
                        <option key="1" value="1">1</option>
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