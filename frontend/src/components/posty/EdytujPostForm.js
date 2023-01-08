import React from "react"
import Card from "../ui/Card"
import classes from "./NowyPost.module.css"
import {useState, useEffect } from "react"
import APIService from "./APIService"
import { useNavigate, useParams } from "react-router-dom"

function EdytujPostForm(props) {

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
    // APIService.UpdatePost(props.post.id, {tytul, tresc})
    //   .then(resp => props.updatedData(resp))
    //   .catch(error => console.log(error))
    console.log(post)

    fetch(`http://127.0.0.1:5001/update/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify({tytul: tytul, tresc: tresc})
      body: JSON.stringify({tytul: tytul, tresc: tresc})
    }).then(res => res.json())
      .then(res => console.log(res));

    navigate("/") //czy potrzebne
  }

  const goHome = () => {
    navigate("/") //czy potrzebne
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
