import PostyList from "../components/posty/PostyList"
import React from "react"
import { useState } from "react"
import EdytujPostForm from "../components/posty/EdytujPostForm"
//komponent pozwalający rozwijać edycję bo wrzucamy w section ten EdytujPostForm
function Posty(props) {

  const [editedPost, setEditedPost] = useState(null)

  const editPost = (post) => {
    setEditedPost(post) //zmieniamy wartość editedPost tak by wyświetlić pole do edytowania
    // console.log("Edytowano")
  }

  return (
    <section>
      <h1>Posty</h1>
      <PostyList posty={props.posts} editPost={editPost}/>
      {editedPost ? <EdytujPostForm post = {editedPost}/> : null}
    </section>
  )
}
export default Posty
