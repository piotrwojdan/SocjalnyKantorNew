import classes from './MeetupList.module.css'
import PostItem from "./PostItem"
import React from "react"
//mapujemy listę postów z props

function PostyList(props){
  return <ul className={classes.list}>
    {props.posty.map(post => <PostItem
      key={post.id}
      id={post.id}
      tytul={post.tytul}
      tresc={post.tresc}/>)}
  </ul>
}

export default PostyList;