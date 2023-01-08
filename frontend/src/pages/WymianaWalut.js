import React from 'react'
import { useNavigate } from 'react-router-dom';
import KupWaluteForm from '../components/waluty/KupWaluteForm';

function WymianaWalut() {
    const navigate = useNavigate();
    function addTransaction(meetupData) {
        //fetch i zapis do bazy
        navigate('/exchange/summary');
    }

    return (<section>
        <KupWaluteForm onSubmitForm={addTransaction} />
    </section>)
}

export default WymianaWalut