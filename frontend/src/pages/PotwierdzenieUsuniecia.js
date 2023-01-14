import React from "react";
import classes from "./MeetupList.module.css"
import classes2 from "./MeetupItem.module.css"
import { useNavigate, Routes, Route, useParams } from "react-router-dom"
import Card from "../components/ui/Card"
import Moment from 'moment';
import { useState } from "react"

function PotwierdzenieUsuniecia(props){
  const post = props.post
  const navigate = useNavigate()

  const usunPost = (post) => {
    console.log(post.id)

    return fetch(`http://127.0.0.1:5001/delete/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {window.location.reload(false)})
  }

  return (
    <Card>
      <div className={classes2.content}>
        <h1>Czy napewno chcesz usunąć post?</h1>
        <div className={classes2.actions}>
          {/*sprawdzenie id tego użytkownika*/}
          <button onClick={() => usunPost(post)}>Usuń</button>
          <p> </p>
          <button onClick={() => navigate("/")}>Anuluj</button>
        </div>
      </div>
    </Card>
  );
};

export default PotwierdzenieUsuniecia;