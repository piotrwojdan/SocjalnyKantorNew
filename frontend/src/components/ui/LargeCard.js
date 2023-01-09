import classes from './LargeCard.module.css';
import React from 'react';
//funkcja do obudowywania rzeczy żeby wyglądały jak karty
//props children zbiera kontent spomiedzy <card> <card/>
function LargeCard(props){
  return <div className={classes.card}>{props.children}</div>
}


export default LargeCard;