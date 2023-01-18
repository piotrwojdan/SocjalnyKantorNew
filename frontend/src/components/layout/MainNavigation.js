import { Link } from 'react-router-dom'
import httpClient from "../httpClient"
import classes from './MainNavigation.module.css'
import React from 'react'
import { useEffect, useState } from "react"


function MainNavigation(){

  const logoutUser = async () => {
    const resp = await httpClient.post('http://localhost:5002/logout')
    window.location.href = "/";
  }

  const [isLogged, setIsLogged] = useState(true)

  // sprawdzenie czy jest zalogowany jeśli tak to wyswietlamy co innego w navbarze
  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get('http://localhost:5002/@me')
      } catch (err) {
         if (err.response.status === 401){
           setIsLogged(false)
         }
      }
    })();
  });

  return(
    <header className={classes.header}>
      <div className={classes.logo}>Socjalny Kantor</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Posty</Link>
          </li>
          {isLogged &&
            <li>
              <Link to='/dodajpost'>Dodaj post</Link>
            </li>
          }
          <li>
            <Link to="/exchange">Wymiana walut</Link>
          </li>
          <li>
            <Link to="/about">O nas</Link>
          </li>
          {isLogged &&
            <li>
              <Link to="/konto">Konto</Link>
            </li>
          }
          {!isLogged &&
            <li>
              <Link to="/login">Zaloguj się</Link>
            </li>
          }
          {!isLogged &&
            <li>
              <Link to="/register">Rejestracja</Link>
            </li>
          }
          {isLogged &&
            <li>
            <button className={classes.baton} onClick={logoutUser}>Wyloguj</button>
          </li>}
        </ul>
      </nav>
    </header>
    );
}

export default MainNavigation;