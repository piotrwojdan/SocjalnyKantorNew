import classes from "./MeetupList.module.css"
import classes2 from "./MeetupItem.module.css"
import { useNavigate, Routes, Route, useParams } from "react-router-dom"
import Card from "../ui/Card"
import React from "react"
import Moment from 'moment';
import { useState } from "react"
import PostItem from "./PostItem"

//mapujemy listę postów z props
function PostyList(props) {

  const [editedPost, setEditedPost] = useState(null)
  const navigate = useNavigate();

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
    Moment.locale('en');
    return Moment(date).format('DD.MM.YY - H:m')
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

              <div className={classes2.actions}>
                <button onClick={() => usunPost(post)}>Usuń</button>
                <p> </p>
                {/*<button onClick={() => editPost(post)}>Edytuj</button>*/}
                <button onClick={() => navigateToEdit(post)}>Edytuj</button>
              </div>
            </Card>
          )
        }
      })}
    </ul>
  )
}

export default PostyList
