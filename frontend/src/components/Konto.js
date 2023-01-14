import React, {useState, useEffect} from "react"

import axios from "axios";
// const axios = require('axios').default;

const axio = axios.create({
  withCredentials: true,
});

const Konto = () => {

  const [user, setUser] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const resp = await axio.get('http://localhost:5002/@me')
        setUser(resp.data)
      } catch (err) {
        console.log("Not authenticated")
      }
    })();
  }, []);

  return (
    <div className="content-section">
      {user != 0 ? (
        <div>
          <h1>Zalogowano</h1>
          <h3>Login: {user.login}</h3>
          <h3>Imię i nazwisko: {user.imie} {user.nazwisko}</h3>
        </div>
      ) :
        <fieldset className="form-group">
            <h1>Konto</h1>
            <p>
              Nie jesteś zalogowany
            </p>
          </fieldset>
      }
    </div>
  )
}

export default Konto