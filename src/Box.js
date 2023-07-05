import React from 'react';
import O from './O';
import X from './X';

export default function Box(props){
  const boxClicked = () => {
    props.f1(props.index);
  }
  return (
    <div className="box" onClick = {boxClicked}>
    {props.symbol==="x"?<X />:props.symbol==="o"?<O />:null}
    </div>
  )
}