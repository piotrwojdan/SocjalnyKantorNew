import React, { useState } from "react";
import httpClient from "./httpClient"

// import axios from "axios";
// // const axios = require('axios').default;
//
// const axio = axios.create({
//   withCredentials: true,
// });

const Register = () => {
//   const [login, setLogin] = useState("");
//   const [haslo, setHaslo] = useState("");
//   const [imie, setImie] = useState("");
//   const [nazwisko, setNazwisko] = useState("");
//
//
//   const registerUser = async () => {
//     try {
//         const resp = await axio.post('http://localhost:5002/register', {imie, nazwisko, login, haslo,})
//         console.log("Błąd")
//         console.log(resp.data);
//         window.location.href = "/konto"
//     } catch (err) {
//        if (err.response.status === 401){
//            alert("Invalid credentials");
//        }
//     }
// };

  return (
    <div>
      <h1>Utwórz konto</h1>
      <form>
        {/* <div>*/}
        {/*  <label>Imie: </label>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    value={imie}*/}
        {/*    // onChange={(e) => setImie(e.target.value)}*/}
        {/*    id="imie"*/}
        {/*  />*/}
        {/*</div>*/}
        {/* <div>*/}
        {/*  <label>Nazwisko: </label>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    value={nazwisko}*/}
        {/*    // onChange={(e) => setNazwisko(e.target.value)}*/}
        {/*    id="nazwisko"*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <label>Login: </label>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    value={login}*/}
        {/*    // onChange={(e) => setLogin(e.target.value)}*/}
        {/*    id="login"*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <label>Hasło: </label>*/}
        {/*  <input*/}
        {/*    type="password"*/}
        {/*    value={haslo}*/}
        {/*    // onChange={(e) => setHaslo(e.target.value)}*/}
        {/*    id="haslo"*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<button type="button" onClick={() => registerUser()}>*/}
        {/*  Utwórz*/}
        {/*</button>*/}
      </form>
    </div>
  );
};

export default Register;