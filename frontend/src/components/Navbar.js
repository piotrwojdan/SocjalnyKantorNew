import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <header className="site-header">
    <nav className="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
      <div className="container">
        <Link to="/">
            <h3 className="navbar-brand mr-4" href="/">Socjalny Kantor</h3>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggle">
          <div className="navbar-nav mr-auto">

            <Link to="/posts">
                <p className="nav-item nav-link">Posty</p>
            </Link>
            <Link to="/exchange">
                <p className="nav-item nav-link">Wymiana walut</p>
            </Link>
            <Link to="/plots">
                <p className="nav-item nav-link">Wykresy</p>
            </Link>
            <Link to="/about">
                <p className="nav-item nav-link">O nas</p>
            </Link>

          </div>

          <div className="navbar-nav ml-auto">

            <Link to="/newpost">
                <p className="nav-item nav-link">Nowy post</p>
            </Link>
            <Link to="/account">
                <p className="nav-item nav-link">Konto</p>
            </Link>
            <Link to="/logout">
                <p className="nav-item nav-link">Wyloguj</p>
            </Link>
            <Link to="/login">
                <p className="nav-item nav-link">Zaloguj się</p>
            </Link>
            <Link to="/signup">
                <p className="nav-item nav-link">Rejestracja</p>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  </header>
  );
}

export default Navbar;