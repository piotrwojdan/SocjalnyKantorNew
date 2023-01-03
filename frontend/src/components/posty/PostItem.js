import classes from './MeetupItem.module.css';
import Card from '../ui/Card'

function PostItem(props){
  return <li className={classes.item}>
    <Card>
      <div className={classes.content}>
        <h3>{props.tytul}</h3>
        {/*dodać date*/}
        <p>{props.tresc}</p>
      </div>
      <div className={classes.actions}>
        <button>Usuń</button>
        <button>Edytuj</button>
      </div>
    </Card>
  </li>
}

export default PostItem;