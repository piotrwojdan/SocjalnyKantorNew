import React from 'react'
import Summary from '../components/waluty/Summary';
import { useLocation } from 'react-router-dom';

function PodsumowanieWaluty() {
    const location = useLocation();
    const transactionData = location.state

    function addTransaction(transactionData) {
        fetch("https://127.0.0.1:5003/transaction/add", {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        })
        // navigate('/');
    }

    return (
        <Summary transactionData={transactionData} addTransaction={addTransaction}/>
    )
}

export default PodsumowanieWaluty