import './App.css';
import { useState, useEffect } from 'react';
import PostsList from './components/PostsList';

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/get', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setPosts(resp))
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
    <header className="site-header">
      <nav className="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
        <div className="container">
          <a className="navbar-brand mr-4" href="/">Socjalny Kantor</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggle">
            <div className="navbar-nav mr-auto">
              <a className="nav-item nav-link" href="{{ url_for('home') }}">Posty</a>
                {/* {if current_user.is_authenticated %}
                    <a class="nav-item nav-link" href="/exchange">Wymiana walut</a>
                    <a class="nav-item nav-link" href="/plots">Wykresy</a>
                {% endif %} */}
              <a className="nav-item nav-link" href="/about">O nas</a>
            </div>
            {/* <!-- Navbar Right Side --> */}
            <div className="navbar-nav">
              {/* {% if current_user.is_authenticated %}
                  <a class="nav-item nav-link" href={{ url_for('new_post') }}>Nowy Post</a>
                  <a class="nav-item nav-link" href="/account">Konto</a>
                  <a class="nav-item nav-link" href="/logout">Wyloguj</a> */}
              {/* {% else %} */}
                  <a className="nav-item nav-link" href="/login">Logowanie</a>
                  <a className="nav-item nav-link" href="/register">Rejestracja</a>
              {/* {% endif %} */}
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main className="container">
      <div className="row">
        <div className="col-md-8">
        <h1>Posty</h1>
        <PostsList posts={posts}></PostsList>
        </div>
      </div>
    </main>
    </div>
  );
}

export default App;
