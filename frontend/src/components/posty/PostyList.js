import classes from "./MeetupList.module.css"
import classes2 from "./MeetupItem.module.css"
import EdytujPostForm from "./EdytujPostForm"
import PostItem from "./PostItem"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../ui/Card"
import React from "react"

//mapujemy listę postów z props
function PostyList(props) {
  const [editetPost, setEditedPost] = useState()

  const navigate = useNavigate()
  function addPostHandler() {
    //fetch i zapis do bazy
    navigate("/")
  }
  const editPost = (post) => {
    props.editPost(post)
  }
  return (

    <ul className={classes.list}>
      {props.posty.map((post) => {
        return(
          //<PostItem editPost={editPost} post={post} key={post.id} id={post.id} tytul={post.tytul} tresc={post.tresc} />
          <Card>
            <div className={classes2.content}>
              <h3>{post.tytul}</h3>
              {/*dodać date*/}
              <p>{post.tresc}</p>
            </div>
            <div className={classes2.actions}>
              {/*<button onClick={() => usunPost(props.post)}>Usuń</button>*/}
              <p> </p>
              <button onClick={() => editPost(post)}>Edytuj</button>
            </div>
          </Card>
        )
      })}
    </ul>
  )
}

export default PostyList
