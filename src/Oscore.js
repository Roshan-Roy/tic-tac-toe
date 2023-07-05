import React from 'react';

export default function Oscore(props){
  return <div className = {props.symbol?"score o":"score o now"}>
   <h2>O : {props.score}</h2>
  </div>
}