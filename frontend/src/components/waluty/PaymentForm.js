import React from 'react'
import AccountForm from './AccountForm'
import CardForm from './CardForm'

function PaymentForm({payment}) {

  if (payment === "card") {
    return <CardForm />
  } else if (payment === "account") {
    return <AccountForm />
  } else {
    return <></>
  }
}

export default PaymentForm