import { useNavigate } from "react-router-dom"
import DodajPostForm from "../components/posty/DodajPostForm"

function DodajPost() {
  const navigate = useNavigate()
  function addMeetupHandler(meetupData) {
    //fetch i zapis do bazy
    fetch("http://127.0.0.1:5001/add", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({tytul: meetupData.tytul, tresc: meetupData.tresc})
    }).then(res => res.json())
      .then(res => console.log(res));


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
