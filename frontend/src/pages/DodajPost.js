import NewMeetupForm from "../components/meetups/NewMeetupForm"
import { useNavigate } from 'react-router-dom';
import DodajPostForm from "../components/posty/DodajPostForm"

function DodajPost(){

  const navigate = useNavigate();
  function addMeetupHandler(meetupData){
    //fetch i zapis do bazy
    navigate('/home');
  }

  return <section>
    <h1>Dodaj post</h1>
    <DodajPostForm onAddMeetup={addMeetupHandler}/>
  </section>
}
export default DodajPost