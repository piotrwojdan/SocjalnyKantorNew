import React, { useState } from "react";

import axios from "axios";
// const axios = require('axios').default;

const axio = axios.create({
  withCredentials: true,
});

const Login = () => {
  const [login, setLogin] = useState("");
  const [haslo, setHaslo] = useState("");

  const logInUser = async () => {
    try {
        const resp = await axio.post('http://localhost:5002/login', { login, haslo,})
        console.log(resp.data);
        window.location.href = "/konto"
    } catch (err) {
        // // Handle Error Here
        // console.error(err);

       if (err.response.status === 401){
           alert("Invalid credentials");
       }
    }
};

  return (
    <div>
      <h1>Zaloguj się do konta</h1>
      <form>
        <div>
          <label>Login: </label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            id=""
          />
        </div>
        <div>
          <label>Hasło: </label>
          <input
            type="password"
            value={haslo}
            onChange={(e) => setHaslo(e.target.value)}
            id=""
          />
        </div>
        <button type="button" onClick={() => logInUser()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;