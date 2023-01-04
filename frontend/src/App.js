//import "./App.css"
import { Routes, Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
//importujemy komponenty czyli strony które będziemy wyświetlać
import DodajPost from "./pages/DodajPost"
import Posty from "./pages/Posty"
import Layout from "./components/layout/Layout"
import About from "./components/About"

function App() {
  const [posts, setPosts] = useState([])

  //dzięki useEffects wykona się tylko raz
  useEffect(() => {
    fetch("http://127.0.0.1:5001/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPosts(resp))
      .catch((err) => console.log(err))
  }, [])

  return (
    // <div className="App">
    //   <Navbar />
    //   <Main posts={posts} />
    // </div>

    //tutaj musicie dodać swoje ścieżki//////////////////////////////////////////////////

    <Layout>
      <Routes>
        <Route path="/" element={<Posty />} />
        <Route path="/dodajpost" element={<DodajPost />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  )
}

export default App
