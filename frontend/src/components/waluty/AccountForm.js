import React, { useEffect, useState } from 'react'
import classes from './CardForm.module.css'

function AccountForm() {
    const [accounts, setAccounts] = useState([]);

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
        <div className="container my-4">
            <div className={classes.control}>
                <label htmlFor={'account'}>Rachunek</label>
                <select className="form-select" type="text" required >
                    {accounts.map((cur) => { return <option key={cur.id} value={cur.id}>{cur.id}</option> })}
                </select>
            </div>
            <div className={classes.actions}>
                <button className='mb-4'>Kup</button>
            </div>
        </div>
    );
}

export default AccountForm