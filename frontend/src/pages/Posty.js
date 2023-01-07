import React from "react"
import PostyList from "../components/posty/PostyList"
//import posts_application from "../../../backend/posts"

const posty = [
  {
    id: '1',
    tytul: 'Kocham Reacta',
    tresc:
      'Bardzo lubie technologie react'
  },
  {
    id: '2',
    tytul: 'Studiaaaaaaaaaaaaaaaaa',
    tresc:
      'Bardzo lubie studiaaaaaaaaa'
  },
];

function Posty() {
  // const posty = posts_application.getPosts()

  return (
    <section>
      <h1>Posty</h1>
      <PostyList posty={posty} />
      {/*<PostyList posty={DUMMY_DATA} />*/}
    </section>
  )
}
export default Posty
