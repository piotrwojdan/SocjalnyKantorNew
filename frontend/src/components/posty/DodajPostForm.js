import Card from "../ui/Card";
import classes from './NowyPost.module.css'
import {useRef} from "react"

function DodajPostForm(props) {
  //nie uzywamy states tyle ref bo interesuje nas stan tylko po przycisnieciu submit
  const tytulInputRef = useRef(); // w tym inpucie tworzymy połączenie z tym
  const imageInputRef = useRef();
  const TrescInputRef = useRef();

  //react automatycznie przekaż event do tej funkcji jeśli wpiszemy ją w onSubmit
  function submitHandler(event){
    event.preventDefault() //zapobiegamy wysyłaniu żadania przez przeglądarkę
    //czytamy podane przez użytkownika wartości

    const enteredTytul = tytulInputRef.current.value //obecna wartość
    const enteredDate = new Date()
    const enteredTresc = TrescInputRef.current.value

    const meetupData = {
      tytul: enteredTytul,
      data: enteredDate,
      tresc: enteredTresc
    }
    console.log(meetupData)

    props.onAddMeetup(meetupData)
  }

  return <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          {/*powiązujemy input z labelem*/}
          <label htmlFor={'tytul'}>Tytuł posta</label>
          <input type="text" required id="tytul" ref={tytulInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor={'Tresc'}>Treść</label>
          <textarea
            id="Tresc"
            required rows="5"
            ref={TrescInputRef}
          ></textarea>
        </div>
        <div className={classes.action}>
          <button>Dodaj post</button>
        </div>
      </form>
    </Card>
}

export default DodajPostForm;