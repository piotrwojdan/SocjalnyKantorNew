import React from "react"
import Card from "../ui/Card"
import classes from "./NowyPost.module.css"
import {useState } from "react"
import APIService from "./APIService"

function EdytujPostForm(props) {

  const[tytul, setTytul] = useState(props.post.tytul)
  const[tresc, setTresc] = useState(props.post.tresc)

  const updatePost = () => {
    APIService.UpdatePost(props.post.id, {tytul, tresc})
      .then(resp => console.log(resp))
      .catch(error => console.log(error))
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
        <div className={classes.action}>
          <button onClick={updatePost}>Zatwierdź</button>
        </div>

    </Card>
  )
}
export default EdytujPostForm
