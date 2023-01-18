import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DodajPost from "./pages/DodajPost";
import Layout from "./components/layout/Layout";
import About from "./components/About";
import Posty from "./pages/Posty";
import EdytujPostForm from "./components/posty/EdytujPostForm";
import WymianaWalut from "./pages/WymianaWalut";
import Login from "./components/Login";
import Konto from "./components/Konto";
import Register from "./components/Register"
import NotFound from "./pages/NotFound"
import PodsumowanieWaluty from "./pages/PodsumowanieWaluty";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Posty />} />
        <Route path="/dodajpost" element={<DodajPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/edytujpost/:id" element={<EdytujPostForm />} />
        <Route path="/exchange" element={<WymianaWalut />} />
        <Route path="/exchange/summary" element={<PodsumowanieWaluty />} />
        <Route path="/konto" element={<Konto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route component={NotFound}/>
      </Routes>
    </Layout>
  );
}

export default App;
