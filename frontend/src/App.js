import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

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
    <div className="App">
      <h1>Posty</h1>
      {posts.map(p => {
        return (
          <div key = {p.id}>
            <h3>{p.tytul}</h3>
            <p>{p.tresc}</p>
            <p>{p.dataUtworzenia}</p>
          </div>
        )
      }
      )
      }
    </div>
  );
}

export default App;
