import React from 'react'
import AccountForm from './AccountForm'
import CardForm from './CardForm'
import { useState, useEffect } from 'react';

function PaymentForm({payment, user, submitHandler, cena}) {
  const [currencies, setCurrencies] = useState([]);


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

}, []);

  if (payment === "card") {
    return <CardForm onSubmitForm={submitHandler}/>
  } else if (payment === "account") {
    return <AccountForm user_id={user} onSubmitForm={submitHandler} currencies={currencies} cena={cena}/>
  } else {
    return <></>
  }
}

export default PaymentForm