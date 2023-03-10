import React from 'react'
import { useNavigate } from 'react-router-dom';
import KupWaluteForm from '../components/waluty/KupWaluteForm';

function WymianaWalut() {
    const navigate = useNavigate();
    function addTransaction(transactionData) {
        navigate('/exchange/summary',{state: transactionData});
    }

    return (<section>
        <KupWaluteForm onSubmitForm={addTransaction} />
    </section>)
}

export default WymianaWalut