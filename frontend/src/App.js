import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
//importujemy komponenty czyli strony które będziemy wyświetlać
import DodajPost from "./pages/DodajPost";
import Layout from "./components/layout/Layout";
import About from "./components/About";
import Posty from "./pages/Posty";
import EdytujPostForm from "./components/posty/EdytujPostForm";
import WymianaWalut from "./pages/WymianaWalut";
import Summary from "./components/waluty/Summary";
import Login from "./components/Login";
import Konto from "./components/Konto";
import Register from "./components/Register"
import NotFound from "./pages/NotFound"
import PotwierdzenieUsuniecia from "./pages/PotwierdzenieUsuniecia"

function App() {
  const [posts, setPosts] = useState([]);

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
      .catch((err) => console.log(err));
  }, []);

  return (
    //tutaj musicie dodać swoje ścieżki//////////////////////////////////////////////////

    <Layout>
      <Routes>
        <Route path="/" element={<Posty posts={posts} />} />
        <Route path="/dodajpost" element={<DodajPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/edytujpost/:id" element={<EdytujPostForm />} />
        <Route path="/exchange" element={<WymianaWalut />} />
        <Route path="/exchange/summary" element={<Summary />} />
        <Route path="/konto" element={<Konto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route component={NotFound}/>
      </Routes>
    </Layout>
  );
}

export default App;
