import classes from "./MeetupList.module.css"
import classes2 from "./MeetupItem.module.css"
import { useNavigate, Routes, Route, useParams } from "react-router-dom"
import Card from "../ui/Card"
import React from "react"
import Moment from 'moment';
import { useState } from "react"
import axios from "axios";
import { useEffect } from "react"

const axio = axios.create({
  withCredentials: true,
});
//mapujemy listę postów z props
function PostyList(props) {

  const [editedPost, setEditedPost] = useState(null)
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(0)
  const [czyAdmin, setCzyAdmin] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const resp = await axio.get('http://localhost:5002/@me')
        console.log(resp.data['czyAdmin'])
        setCurrUser(resp.data['id'])
        setCzyAdmin(resp.data["czyAdmin"])
      } catch (err) {
        console.log("Not authenticated")
      }
    })();
  }, []);


  const navigateToEdit = (post) => {
    navigate(`/edytujpost/${post.id}`);
  };

  const usunPost = (post) => {
    console.log(post.id)

    return fetch(`http://127.0.0.1:5001/delete/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {window.location.reload(false)})
  }

  const editPost = (post) => {
    props.editPost(post)
  }

  const formatDate = (date) => {
    Moment.locale('pl');
    return Moment(date).format('DD.MM.YY - HH:mm')
  }

  return (

    <ul className={classes.list}>
      {/*reverse()*/}
      {props.posty.map((post) => {

        if (post.status != "usuniety"){
          return(
            <Card>
              <div className={classes2.content}>
                <h3>{post.tytul}</h3>
                <h4>{formatDate(post.dataUtworzenia)}</h4>
                <p>{post.tresc}</p>
              </div>


              {/*sprawdzenie id tego użytkownika*/}
              {
                (czyAdmin || currUser == post.client_id) &&
                <div className={classes2.actions}>

                  <button onClick={() => usunPost(post)}>Usuń</button>
                  <p> </p>
                  {/*<button onClick={() => editPost(post)}>Edytuj</button>*/}
                  <button onClick={() => navigateToEdit(post)}>Edytuj</button>

                </div>
              }


              {/*<button onClick={() => PotwierdzenieUsuniecia(post = post)}>Usuń</button>*/}


            </Card>
          )
        }
      })}
    </ul>
  )
}

export default PostyList
