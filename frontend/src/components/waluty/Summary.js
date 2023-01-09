import React from 'react'
import { useLocation } from 'react-router-dom';
import LargeCard from '../ui/LargeCard';
import classes from './Summary.module.css'


function Summary() {
    const location = useLocation();
    const transactionData = location.state

    return (
        <>
            <h1>Podsumowanie</h1>
            <LargeCard>
                <div className={classes.control}>
                    <label htmlFor={'waluta'}>Wybrana kruptowaluta</label>
                </div>
                <label id="waluta">{transactionData.waluta}</label>
                <div className={classes.control}>
                    <label htmlFor={'kurs'}>Kurs</label>
                </div>
                <label id="kurs">{transactionData.price}</label>
                <div className={classes.control}>
                    <label htmlFor={'ilosc'}>Ilość</label>
                </div>
                <label id="ilosc">{transactionData.ilosc}</label>
                <div className={classes.control}>
                    <label htmlFor={'cena'}>Cena całkowita</label>
                </div>
                <label id="cena">{transactionData.sum}</label>
            </LargeCard>
        </>
    )
}

export default Summary