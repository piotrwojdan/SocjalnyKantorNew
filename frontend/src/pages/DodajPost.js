import { useNavigate } from "react-router-dom"
import DodajPostForm from "../components/posty/DodajPostForm"
import { useEffect, useState } from "react"
import axios from "axios";


const axio = axios.create({
  withCredentials: true,
});

function DodajPost() {
  const navigate = useNavigate()
  const [currUser, setCurrUser] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const resp = await axio.get('http://localhost:5002/@me')
        setCurrUser(resp.data)
      } catch (err) {
        console.log("Not authenticated")
      }
    })();
  }, []);

  function addPostHandler(post) {
    //fetch i zapis do bazy
    fetch("http://127.0.0.1:5001/add", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tytul: post.tytul, tresc: post.tresc, user: currUser.id})
    }).then(res => res.json())
      .then(res => console.log(res))
      .then(() => {window.location.reload(false)})


    navigate("/")
  }

  return (
    <section>
      <h1>Dodaj post</h1>
      <DodajPostForm onAddMeetup={addPostHandler} />
    </section>
  )
}
export default DodajPost
