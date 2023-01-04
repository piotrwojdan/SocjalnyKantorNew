import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import React from 'react';
import DodajPost from "./pages/DodajPost"
import Posty from "./pages/Posty"
import Layout from "./components/layout/Layout"
import About from "./components/About"
import Login from "./components/Login";


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
    // <div className='App'>
    //   <Navbar />
    //   <Main posts={posts} />
    // </div>
      <Layout>
        <Routes>
          <Route path="/" element={<Posty />} />
          <Route path="/dodajpost" element={<DodajPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
  );
}

export default App;
