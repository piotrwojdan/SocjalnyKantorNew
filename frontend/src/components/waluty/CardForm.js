import React, { useRef, useState } from 'react'
import classes from './CardForm.module.css'
import { useNavigate } from 'react-router-dom'
import { usePaymentInputs } from 'react-payment-inputs'
import { Form } from 'react-bootstrap'



function CardForm(props) {
    const navigate = useNavigate();
    const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

    const { erroredInputs, touchedInputs } = meta;

    function submitHandler(event) {
        event.preventDefault();

        const moretransactionData = {
            nrKarty: touchedInputs.cardNumber
        }
        console.log(moretransactionData)

        props.onSubmitForm(moretransactionData)
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <Form.Label>Card number</Form.Label>
                <Form.Control
                    {...getCardNumberProps()}
                    // ref={numberInputRef}
                    isInvalid={touchedInputs.cardNumber && erroredInputs.cardNumber}
                    placeholder="0000 0000 0000 0000"
                />
                <Form.Control.Feedback type="invalid">{erroredInputs.cardNumber}</Form.Control.Feedback>
            </div>
            <div className={classes.control}>
                <Form.Label>Expiry date</Form.Label>
                <Form.Control
                    {...getExpiryDateProps()}
                    isInvalid={touchedInputs.expiryDate && erroredInputs.expiryDate}
                />
                <Form.Control.Feedback type="invalid">{erroredInputs.expiryDate}</Form.Control.Feedback>
            </div>
            <div className={classes.control}>
                <Form.Label>CVC</Form.Label>
                <Form.Control
                    {...getCVCProps()}
                    isInvalid={touchedInputs.cvc && erroredInputs.cvc}
                    placeholder="123"
                />
                <Form.Control.Feedback type="invalid">{erroredInputs.cvc}</Form.Control.Feedback>
            </div>
            <div className={classes.actions}>
                <button className='btn btn-danger mb-4 ' onClick={(e) => {navigate(-1)}}>Anuluj</button>
                <input type="submit" className='btn btn-primary mb-4 px-3' value="Kup"/>
            </div>
        </form >
    )
}

export default CardForm