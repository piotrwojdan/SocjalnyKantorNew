import React, { useRef, useState } from 'react'
import classes from './CardForm.module.css'
import { useNavigate } from 'react-router-dom'
import { usePaymentInputs } from 'react-payment-inputs'
import { Form } from 'react-bootstrap'



function CardForm(props) {
    const navigate = useNavigate();
    const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();

    const { erroredInputs, touchedInputs } = meta;
    const [cardNumber, setCardNumber] = useState("");

    const inputCard = useRef();

    function submitHandler(event) {
        event.preventDefault();
        console.log(inputCard.current.value)

        const moretransactionData = {
            nrKarty: inputCard.current.value
        }
        console.log(moretransactionData)

        props.onSubmitForm(moretransactionData)
    }

    const handleCreditCard = (e) => {
        const number = e.target.value
        if (number.match(/[0-9]{16}/))
            setCardNumber(number);

    }
    const handleNumber = () => {
        setCardNumber(parseFloat(cardNumber) || '')
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <Form.Label>Numer karty</Form.Label>
                <input
                    value={cardNumber}
                    onChange={handleNumber}
                    onBlur={handleNumber}
                    ref={inputCard}
                    required
                />
                {/* <Form.Control.Feedback type="invalid">{erroredInputs.cardNumber}</Form.Control.Feedback> */}
            </div>
            <div className={classes.control}>
                <Form.Label>Data wazności</Form.Label>
                <Form.Control
                    {...getExpiryDateProps()}
                    isInvalid={touchedInputs.expiryDate && erroredInputs.expiryDate}
                />
                <Form.Control.Feedback type="invalid">{erroredInputs.expiryDate}</Form.Control.Feedback>
            </div>
            <div className={classes.control}>
                <Form.Label>Kod CVC</Form.Label>
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