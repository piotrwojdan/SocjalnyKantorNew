import React from 'react'
import AccountForm from './AccountForm'
import CardForm from './CardForm'

function PaymentForm({payment, user, submitHandler}) {

  if (payment === "card") {
    return <CardForm onSubmitForm={submitHandler}/>
  } else if (payment === "account") {
    return <AccountForm user_id={user} onSubmitForm={submitHandler}/>
  } else {
    return <></>
  }
}

export default PaymentForm