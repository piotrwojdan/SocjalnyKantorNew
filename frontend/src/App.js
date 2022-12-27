import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import React from 'react';


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
    <div className='App'>
      <Navbar />
      <Main posts={posts} />
    </div>
  );
}

export default App;
