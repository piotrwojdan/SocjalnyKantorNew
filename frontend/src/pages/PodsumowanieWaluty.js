import React from 'react'
import Summary from '../components/waluty/Summary';
import { useLocation, useNavigate } from 'react-router-dom';

function PodsumowanieWaluty() {
    const location = useLocation();
    const transactionData = location.state
    const navigate = useNavigate()

    function addTransaction(transactionData) {
        console.log(JSON.stringify(transactionData))

        fetch("http://127.0.0.1:5003/transaction/add", {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        })
        .catch(err => console.error(err))
        alert("Transakcja udana! Środki dodane do Twojego konta!")
        navigate('/');
    }

    return (
        <Summary transactionData={transactionData} addTransaction={addTransaction}/>
    )
}

export default PodsumowanieWaluty