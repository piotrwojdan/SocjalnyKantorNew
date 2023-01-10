import React from 'react'
import AccountForm from './AccountForm'
import CardForm from './CardForm'

function PaymentForm({payment, submitHandler}) {

  if (payment === "card") {
    return <CardForm onSubmitForm={submitHandler}/>
  } else if (payment === "account") {
    return <AccountForm onSubmitForm={submitHandler}/>
  } else {
    return <></>
  }
}

export default PaymentForm