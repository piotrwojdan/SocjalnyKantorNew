import React from 'react'
import classes from './CardForm.module.css'


function CardForm(props) {


    function submitHandler(event) {
        event.preventDefault();

        // const enteredWaluta = walutaInputRef.current.value; 
        // const enteredilosc = iloscInputRef.current.value;
        // const enteredKurs = price;
        // const enteredCena = price * parseFloat(enteredilosc);

        // const transactionData = {
        //     waluta: enteredWaluta,
        //     ilosc: enteredilosc,
        //     cena: enteredCena,
        //     kurs: enteredKurs
        // }
        // console.log(transactionData)

        // props.onSubmitForm(transactionData)
    }

    function handleCardNumber(e) {
        let number = e.target.value

        return number.match()
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className="container">
                <div className={classes.control}>
                    <label htmlFor={'number'}>Numer karty</label>
                    <input id="number" type="text" onChange={handleCardNumber}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor={'name'}>
                        Imię i nazwisko właściciela
                    </label>
                    <input id="name" type="text" />
                </div>
                <div className={classes.control}>
                    <label htmlFor={'data'}>Data wazności</label>
                    <input
                        id="data"
                        min="0"
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor={'kod'}>CCV</label>
                    <input id="kod" type="text" />
                </div>
                <div className={classes.actions}>
                    <button>Kup</button>
                </div>
            </div>
        </form>
    )
}

export default CardForm