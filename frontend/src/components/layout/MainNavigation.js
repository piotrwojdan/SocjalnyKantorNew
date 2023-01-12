import { Link } from 'react-router-dom'
//importujemy ten kompponent link zamiast robić anchor tag w html
//bo tak jest efektywniej bo nie trzeba wysyłac zapytań do serwera po kliknięciu w link
//tylko react załodowuje komponent tej strony i wten sposób jest chyba szybciej

import classes from './MainNavigation.module.css'
import React from 'react'
//ten css działą tylko dla tego folderu
//importujemy klasy cssowe dlatego potem classname = {} a nie 'coś'
function MainNavigation(){

  return(
    <header className={classes.header}>
      <div className={classes.logo}>Socjalny Kantor</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Posty</Link>
          </li>
          <li>
            <Link to='/dodajpost'>Dodaj post</Link>
          </li>
          <li>
            <Link to="/exchange">Wymiana walut</Link>
          </li>
          <li>
            <Link to="/about">O nas</Link>
          </li>
          <li>
            <Link to="/konto">Konto</Link>
          </li>
          <li>
            <Link to="/login">Zaloguj się</Link>
          </li>
          <li>
            <Link to="/register">Rejestracja</Link>
          </li>
          <li>
            <Link to="/logout">Wyloguj</Link>
          </li>
        </ul>
      </nav>
    </header>
    );
}

export default MainNavigation;