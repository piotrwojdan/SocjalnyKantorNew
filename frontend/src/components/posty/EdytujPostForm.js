import React from "react"
import Card from "../ui/Card"
import classes from "./NowyPost.module.css"
import {useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const axio = axios.create({
  withCredentials: true,
});

function EdytujPostForm(props) {
  const [currUser, setCurrUser] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const resp = await axio.get('http://localhost:5002/@me')
        setCurrUser(resp.data.id)
        console.log("Current user  " + currUser)
      } catch (err) {
        console.log("Not authenticated")
      }
    })();
  }, []);

  const { id } = useParams() //pobierze ze ścieżki

  const[post, setPost] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://127.0.0.1:5001/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPost(resp))
      .then(() => console.log(post))
      .catch((err) => console.log(err))
  }, [])

  //zmieniamy edytowany post po kliknięciu buttona,
  //bez tego się nie zmienia i jest tylko pierwszy kliknięty
  const[tytul, setTytul] = useState(post.tytul)
  const[tresc, setTresc] = useState(post.tresc)

  useEffect(()=>{
      setTytul(post.tytul)
      setTresc(post.tresc)
  },[post])

  const updatePost = () => {
    // console.log(post)

    fetch(`http://127.0.0.1:5001/update/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tytul: tytul, tresc: tresc, autor: currUser})
    }).then(res => res.json())
      .then(res => console.log(res))
      .then(() => {window.location.reload(false)})

    navigate("/")
  }

  const goHome = () => {
    navigate("/")
  }

  return (
    <Card>
        <div className={classes.control}>
          <label htmlFor={"tytul"}>Tytuł posta</label>
          <input type="text" required id="tytul" value={tytul}
          onChange={(e) => setTytul(e.target.value)}/>
        </div>
         <div className={classes.control}>
          <label htmlFor={"Tresc"}>Treść</label>
          <textarea id="Tresc" required rows="5"
                    value={tresc} onChange={(e) => setTresc(e.target.value)}>
          </textarea>
        </div>
        <div className={classes.actions}>
          <button onClick={goHome}>Zamknij</button>
          <p> </p>
          <button onClick={updatePost}>Zatwierdź</button>
        </div>

    </Card>
  )
}
export default EdytujPostForm
