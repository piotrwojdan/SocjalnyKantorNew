import React from 'react'

function PodsumowanieWaluty() {
    function addTransaction(transactionData) {
        navigate('/exchange/summary', { state: transactionData });
    }

    return (
        <div>PodsumowanieWaluty</div>
    )
}

export default PodsumowanieWaluty