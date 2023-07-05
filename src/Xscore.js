import React from 'react';

export default function Xscore(props){
  return <div className = {props.symbol?"score x now":"score x"}>
   <h2>X : {props.score}</h2>
  </div>
}