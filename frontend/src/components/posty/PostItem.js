import classes from "./MeetupItem.module.css"
import Card from "../ui/Card"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "@types/react"
//wyświetlamy pojedyńczy post

function PostItem(props) {
  const { id } = useParams()

  const [post, setPost] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5001/get/" + props.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPost(resp))
      .catch((err) => console.log(err))
  }, [])

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.tytul}</h3>
          {/*dodać date*/}
          <p>{props.tresc}</p>
        </div>
        <div className={classes.actions}>
          <button>Usuń</button>
          <p> </p>
          <button>Edytuj</button>
        </div>
      </Card>
    </li>
  )
}

export default PostItem
