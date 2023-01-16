import React from "react"
import PostyList from "../components/posty/PostyList"
import { useState } from "react"
import EdytujPostForm from "../components/posty/EdytujPostForm"
import FlashMessage from "react-flash-message"

//komponent pozwalający rozwijać edycję bo wrzucamy w section ten EdytujPostForm
function Posty(props) {
  const [editedPost, setEditedPost] = useState(null);
  const [posts, setPosts] = useState(props.posts);
  const [status, setStatus] = useState(false);

  const editPost = (post) => {
    setEditedPost(post); //zmieniamy wartość editedPost tak by wyświetlić pole do edytowania
    // console.log("Edytowano")
  };

  const updatedData = (post) => {
    const new_post = props.posts.map((my_post) => {
      //po co ja tutaj tworzę kolekcję wszystkich postów z tym id
      if (my_post.id === post.id) {
        return post;
      } else {
        return my_post;
      }
      //setPosts(new_post)
    });
  };

  const displayFlash = () => {
    setStatus(true)
  }

  return (
    <section>
      <h1>Posty</h1>
      {/*{status && (*/}
      {/*  <FlashMessage duration={5000}>*/}
      {/*    <strong>Usunięto post!</strong>*/}
      {/*  </FlashMessage>*/}
      {/*)}*/}
      <PostyList posty={props.posts} editPost={editPost} flashFun={displayFlash}/>
      {/*{editedPost ? <EdytujPostForm post = {editedPost} updatedData={updatedData}/> : null}*/}
    </section>
  );
}
export default Posty;
