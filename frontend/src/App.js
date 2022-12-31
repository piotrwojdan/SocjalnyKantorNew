import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import React from 'react';


function App() {

  return (
    <div className='App'>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
