import { useNavigate } from "react-router-dom"
import DodajPostForm from "../components/posty/DodajPostForm"
import axios from "axios";
import { useEffect, useState } from "react"

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
        setCurrUser(resp.data.id)
        console.log("Current user  " + currUser)
      } catch (err) {
        console.log("Not authenticated")
      }
    })();
  }, []);


  function addMeetupHandler(meetupData) {
    //fetch i zapis do bazy
    fetch("http://127.0.0.1:5001/add", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tytul: meetupData.tytul, tresc: meetupData.tresc, autor: currUser})
    }).then(res => res.json())
      .then(res => console.log(res))
      .then(() => {window.location.reload(false)})


    navigate("/")
  }

  return (
    <section>
      <h1>Dodaj post</h1>
      <DodajPostForm onAddMeetup={addMeetupHandler} />
    </section>
  )
}
export default DodajPost
