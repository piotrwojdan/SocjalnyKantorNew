import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import LargeCard from '../ui/LargeCard';
import classes from './Summary.module.css'
import { useState } from 'react'
import PaymentForm from './PaymentForm';


function Summary(props) {
    const transactionData = props.transactionData
    console.log(transactionData)
    const navigate = useNavigate()
    const {waluta_name, waluta_id, ilosc, cena, kurs, klient, data} = transactionData
    let timer;
    
    useEffect(() => {
        timer = setTimeout(() => {
            alert("Czas sesji się zakończył, aby dokonać zakupy wybierz ponownie walutę i podaj ilość!");
            navigate("/exchange");
        }, 15 * 60 * 1000)
        return () => clearTimeout(timer)
    }, [])

    function sumbitHandler(event) {

        const {idRachunku, nrKarty} = event

        const newTransactionData = {
            ilosc: ilosc,
            cenaJedn: kurs,
            cenaCalk: cena,
            dataU: data,
            dataZ: new Date().toJSON(),
            waluta: waluta_id,
            klient: klient,
            nrKarty: nrKarty,
            idRachunku: idRachunku
        }
        console.log(newTransactionData)

        props.addTransaction(newTransactionData)
    }

    const [payment, setPayment] = useState("")

    return (
        <>
            <div className="text-center">
                <h1>Podsumowanie</h1>
            </div>

            <LargeCard>
                <div className={classes.form}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <div className={classes.control}>
                                    <label htmlFor={'waluta'}>Wybrana kruptowaluta:</label>
                                </div>
                            </div>
                            <div className="col-sm">
                                <label id="waluta">{waluta_name}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <div className={classes.control}>
                                    <label htmlFor={'kurs'}>Kurs:</label>
                                </div>
                            </div>
                            <div className="col-sm">
                                <label id="kurs">${kurs}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <div className={classes.control}>
                                    <label htmlFor={'ilosc'}>Ilość:</label>
                                </div>
                            </div>
                            <div className="col-sm">
                                <label id="ilosc">{ilosc}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm">
                                <div className={classes.control}>
                                    <label htmlFor={'cena'}>Cena całkowita:</label>
                                </div>
                            </div>
                            <div className="col-sm">
                                <label id="cena">${cena.toFixed(2)}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </LargeCard>
            <LargeCard>
                <div className="text-center pt-3">
                    <h3>Wybierz sposób płatności</h3>
                    <div className="container my-4">
                        <div className="row ms-sm-4">
                            <div className="col-sm">
                                <input type="radio" className="btn-check" name="payment" id="card" autoComplete="off" onClick={(e) => { setPayment("card") }} />
                                <label className="btn px-5" htmlFor="card">
                                <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFC0lEQVR4nO2dXagVVRTH/92bita9fpWEDyaFognlB5JkoKggmVaCN1/UepDqRdPAhwShNAJNU1EDRRN8kJQw60L4AVIZGSn1YH6Ami9+5YNczI/o6r2xbRXDco7NzFrnuu+Z/w/2w5kz/GfP+s/sPXv2PusAhBBCCCGEEEII6VwMA7AawK8ArgFoZ0EyBtckNh8DeKqaRnQFsA7ALRqArBdhiNVaAF2qYcZ+GoGircE+b1PCncGmCaYYrPHsM3QzdQzASwAavA5SQzQAeBnAcRWzVgBDPQ6wOsWMRg/hGqcngBMqdqs8hI8p0eA+ycZ0FbujcOCqEmUzlZ1GFbsQSzO6cyL3OX40xAYNiQwaEhk0JDJoSNkMYYEpBjQEcV1ENARxlSfYZCGqMpOGIKryAQ1BVOUrGoKoylkagqhKG4BeHIcgqjKWhiCq8panISQfaYZs8BQkdkMOegoSuyEtAB7wEiT5qNSPDPASJD6GvOglSHwMeddL0FqRjiqxUKl+270ErRWhIbAtmqMhNipdgGGtbzcPQWtFeIfgvxg83ZGGkH+41wU4CwWgIdUzZLmHIPEz5GsPQeJnyDkPQWKL35/qc5+cejTE2ZBf1OdxVkFii9829XleTj0a4mzIIvV5k1WQ2OI3WX0+lFOPhjgb0j8lFUedRZDkIy1+ly3rfWmIjbT4HVDbXrEKElv81qptS3Lo0ZAqGDJXbdtpFSS2+D2rtp3MoUdDqmDIQwBuJ7aF5D7dLYIkO5Xid0ptH2UVJLb47VLbX8+od1deRSaf8Uk+817R1E1Mz1Sd9Ewz1HchhWIm9DPzcUnORe5NT3l6SsZuZeL7weq7S8jIUPVE0C6Z0oL7zCx3N40Sm5Mpy36GJParB3Bd7dMPGVmV0jmxIFcMQh5fzU9qn0l50sSGX4/SBBSKwd4KaWK3qP0WIgdB8EMAf9EYZDWiVe6MSjl7F6j9P0UBHgewLKWNZMGdGPwhT1MrM6SFnajidhiOj3SF1hiVnMdUDH+3iD3pscao5HRTMbxhEauT2zMp2NevrqVglIrfGavgj0pwvE89S8PnXj/i+ZdNSnC+Tz1LMXjcmPIgNMUqPF8Jbvapb03RFcAz8tODsNp9T4U/wvnW42DjlWgYeZaZ/jLafltWKB4BcDPDkOCC5WfSSfoq4evyjqbWeRjAGABvyH+rfAPgSsGxWPh7pEGelTuvDhDeYtYK9XI+4VX5+zKpdFpSLFkHwkHnnTxTt1nZow4UKt8ZeQTABGluNsuoWb+NtSQta5ZXTzO97wjNCnXwcCXFTBf516AmmbVrlud/j8BflX5jmxgb+pNHO/oEZ6tKfYHO38m2/0+5JSY2i6lNYnKuNbrVYrj3aLMADTLqnSMznPtT1s8WLaGz/l50Qyf+PIAeiPx9TGviBNqquBCiXmbdmuSN824Avzl1sjflDtoqne2kPDN4sXFUndwLDpr9JCgLZZ7Aq7lpExO/lBy6r4rJNfW4vkaddLjFH8xxh40E8JrMIeyTCf92h9Ii2ds+AfAmgOfKsg5gdEqzsVs61SQDAUwDsBjADlnBkmzuipZWWa70maQ9mioTaaVmZ4VA/SzNTYvTVX9R7qKPpBMfUTSJS63Ty3la94YMzrbI3PNEGbyRHIRB0HcFOtkzMn5ZKiP9wbXWyd5P6mSw+ENKv3JFXjOvl2f68IKOa4U7kN4ycBye0sETQgghhBBCCEF8/A2Ul58+4m/RvgAAAABJRU5ErkJggg=="/>
                                    <br/>Karta
                                    </label>
                            </div>
                            <div className="col-sm pb-3">
                                <input type="radio" className="btn-check" name="payment" id="account" autoComplete="off" onClick={(e) => { setPayment("account") }} />
                                <label className="btn px-5" htmlFor="account">
                                <img  width="100px" height="100px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE7ElEQVR4nO2bW4hWVRTHf18108W0ojtZlJXaDaaEAptJpF6kpyYzInyNootBiSWC6YvWNHYln6ML1UgPvUleKrWowBfLyYckHCdo9KUxGm2mObHrf2Cz2efMuezvfOez7w8Lhr32Xt9e6+y19t5r7YEOOuigg+biWuBZ4H3ge+Bn0XfAR8AqYB6nIe4FvgCiDDQNfAncx2mAhcD2jIr7aLtktB1mAS8BJ0soH9NfwBvAHNoADeAh4EgAxV36FXgMOIOaogfY0wTFXTIB8y5qhIuBrcBUDiXMCukHZoseAH7KMX5Kv2l+u2U4E3gcOJ7zCx5JmPhFwKGcso5rDmYuleJuYH/BJfywZNwPHAVGgGVq6y8oc7/m1HRcCbynvbqoD18gWSPOqkCRvqjcac3NzLEp0X0VMB4giF3oMYChXqAvgPxxzdXMORheCDCxmFZI5jKPEULSmpAGGA04saNOEOxtkgHM7wRDFJhGtBLmBFr2SVRbA0QVUccAZdEFDNbgSxalAelQGIM1UCKEEQrjmIQspv0Q7y5jZYREoYNJxSg9/1EJMNZsN8Tbq9GhMDbXwIfL0qYyBuiWEUKeBKuiUc3d6NASv4qcflWPaxqOZYgLfZ4IXMW4Uv6eFQM5luErFY8r5e9Z0ZVxUkaJsyoa1zR/T8NMioQe94QSqLVBVLEBUJZnEbAR2K1M8h+iYbVtAO4IrGvLDdBQ/iBP1tgY58HQqbFWGOB64Nsciru0T1XptjRAL/BbCeXt+sHSdjDAhNVvqQqjvj4fA8uBBcDZyjSbdwUrxZv0jDsF3FN3A2ywlr2v4vQJcE2GuZnxn3rGj4V0hyiwAcxLkXMUtFyf/xt4xpJxm0rmP1i7gPn7NeAW9TFyntNYNyY06miAp8Rf4eE9KZ5Z7u84SvWqLGYXTt+0DkVrPPL662aAEyqZNTxb3YeW8rtSfsdt/9zKB7rucLBuBhgSb5HTftLy+a0Ob9Kp/qz2BD/jJgY3KAjavJ46GeBp8TY67e9aPu/68lqP7NVOH+MON4s35PDW18kAd4q322k3z20MXveMuUq8fXqZYnCpp5/JbBs86rTvqJMBrhbvUEL7j54xc8XbM0N1+YD6LXDah+tkgPPEc8vv5ya0uy5wueKB7wD0u/rMdtrH62SA8z2KTltbmc8AkyrbX2HJXufpN94OBrgxwQXmpbjAYqv4EceAuSkusNBzW6yNAfrE25VwYPEFwUvEM8p/lWKALeKtdNp3NrtgOuAUJtNSW+alF7oL2O0fqP1WzzO85z1zW5eyDW4LtQ0OZlDeNkKMV1P6mRscyuTY7X9aB6G3PTHA7Psx1nqMFB+E5ntulj3NLJj2pqS308Y1PA8mzTN6FBB3pLha0lHYyPws5FE4msHHk/plHbfco4x59RUb4S3nS7v7/5S+fJe1MgpfhrqBl/VQOWoyHdaFx3yxbzy+HBsBXXm3KMKfEB2Qe8Y+b+S86DlC781zHd5cgeK+w811lsvYNCTeTJjvWfaFEiKjFRtgwkppL/Hc4CK1mbjwiPb2WTpI3aStbltCKu2Utd1mRtQCOmyd7pYkrIS8NFZEeVpYFjfprcv+ncF/S/7rErL2lskDbmqRAQz9Yu3VDRU5hnOMPxgi9dUtI7RqJUzodGcXPW/X/yPtlEHiXWBYbetDZHs66KAD/nf4BypdwX/1RiZOAAAAAElFTkSuQmCC"/>
                                    <br/>Rachunek</label>
                            </div>
                        </div>
                    </div>
                </div>

                <PaymentForm payment={payment} user={transactionData.klient} submitHandler={sumbitHandler} cena={cena}/>
            </LargeCard>
        </>
    )
}

export default Summary