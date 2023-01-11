import React, { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState("");
  const [haslo, setHaslo] = useState("");

  const token = sessionStorage.getItem("token");
  console.log("Twoj token " + token);

  const handleClick = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        haslo: haslo,
      }),
    };
    fetch("http://127.0.0.1:5002/token", options)
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("Jakis blad");
      })
      .then((data) => {
        console.log("backend -> ", data);
        sessionStorage.setItem("token", data.access_token);
      })
      .catch((err) => {
        console.error("Blad", err);
      });
  };

  return (
    <div className="content-section">
      <h1>Zaloguj się</h1>

      {token && token != "" && token != undefined ? (
        "Jestes zalogowany tokenem " + token
      ) : (
        <div>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            value={haslo}
            onChange={(e) => setHaslo(e.target.value)}
          />
          <button onClick={handleClick}>Potwierdź</button>
        </div>
      )}
    </div>
  );
};

export default Login;
