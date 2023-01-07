import React, { useState } from 'react'

function Exchange() {

    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5003/get', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(resp => setCurrencies(resp))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <form action="" method="post">
                <div class="row">
                    <div class="col-sm-6">
                        <span class="input-group-addon">Waluta</span>
                        <select name="currency" class="select-picker form-control">
                            <option value="1">1</option>
                        </select>
                    </div>
                    <div class="col-sm-6">
                        <span class="input-group-addon">Waluta</span>
                        <input type="text" value={currencies} readonly />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <span class="input-group-addon">Waluta</span>
                        <select name="currency" class="select-picker form-control">
                            <option value="1">1</option>
                        </select>
                    </div>
                    <div class="col-sm-6">
                        <span class="input-group-addon">Waluta</span>
                        <select name="currency" class="select-picker form-control">
                            <option value="1">1</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-default">Kup</button>
            </form>
        </>
    )
}

export default Exchange