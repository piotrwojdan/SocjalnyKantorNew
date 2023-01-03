import classes from './Card.module.css';
//funkcja do obudowywania rzeczy żeby wyglądały jak karty
//props children zbiera kontent spomiedzy <card> <card/>
function Card(props){
  return <div className={classes.card}>{props.children}</div>
}


export default Card;