import React from "react"
import PostyList from "../components/posty/PostyList"
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios';

function Posty(props) {

  const [editedPost, setEditedPost] = useState(null);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:5001/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPosts(resp))
      .catch((err) => console.log(err));
  }, []);

  const editPost = (post) => {
    setEditedPost(post);        //zmieniamy wartość editedPost tak by wyświetlić pole do edytowania
    // console.log("Edytowano")
  };


  return (
    <section>
      <h1>Posty</h1>
      <PostyList posty={posts} editPost={editPost}/>
    </section>
  );
}
export default Posty;
