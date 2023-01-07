import classes from "./MeetupItem.module.css"
import Card from "../ui/Card"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
//wyświetlamy pojedyńczy post
import React from 'react';


function PostItem(props) {
  const editPost = (post) => {
    props.editPost(post) //metoda z PostyList w której jest logika edytowania
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.tytul}</h3>
          {/*dodać date*/}
          <p>{props.tresc}</p>
        </div>
        <div className={classes.actions}>
          {/*<button onClick={() => usunPost(props.post)}>Usuń</button>*/}
          <p> </p>
          <button onClick={() => editPost(props.post)}>Edytuj</button>
          {/*<button component={Link} to="/edytujpost">Edytuj</button>*/}
        </div>
      </Card>
    </li>
  )
}

export default PostItem
