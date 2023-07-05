import React,{useState,useEffect,useRef} from 'react';
import Box from './Box';
import Xscore from './Xscore';
import Oscore from './Oscore';
import './App.css';

export default function App(){
  
  let [arrOfSym,update1] = useState(new Array(9).fill(""));
  let [symbol,update2] = useState(true);
  let [gameOver,update3] = useState(false);
  let [score,update4] = useState({
    x:0,
    o:0
  });
  let [theme,update5]  = useState(true);
  
  let isMountedRef = useRef(false);
  let timeOutRef = useRef();
  useEffect(() => {
    if(isMountedRef.current)
     checkForWin();
    else
     isMountedRef.current = true;
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[arrOfSym])
  
  const checkForWin = () => {
    const arrayOfWins = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    const arrayOfX = [];
    const arrayOfO = [];
    
    arrOfSym.forEach((e,i)=>{
      if(e==="x") arrayOfX.push(i)
      else if(e==="o") arrayOfO.push(i)
    })
    
    let winnerObj = {
      win:false,
      arr:[]
    }
    
    const checkForWinner = (arr) => {
      arrayOfWins.forEach(elm => {
        if(elm.every(e => arr.includes(e))){
          winnerObj.win = true;
          winnerObj.arr = elm;
          return;
        }
      })
    }
    
    checkForWinner(arrayOfX);
    checkForWinner(arrayOfO);
    
    if(winnerObj.win===true||(arrayOfO.length+arrayOfX.length) === 9){
      const boxes = document.querySelectorAll(".box");
      winnerObj.arr.forEach(elm => {
        boxes[elm].classList.add("win");
      })
      if(winnerObj.win===true)
      update4(prev => {
        let copiedObj = {...prev};
        if(symbol) copiedObj.x++;
        else copiedObj.o++;
        return copiedObj;
      });
      update3(true);
      timeOutRef.current = setTimeout(() => {
        winnerObj.arr.forEach(elm => {
         boxes[elm].classList.remove("win");
        })
        isMountedRef.current = false;
        update1(new Array(9).fill(""));
        update2(true);
        update3(false);
      },3000)
    }else{
       update2(bool => bool?false:true);
    }
   
  }
  
  const handleBoxClick = (e) => {
     if(arrOfSym[e]===""&&!gameOver){
       update1(arr => {
         let tempArr = [...arr];
         tempArr[e] = symbol?"x":"o";
         return tempArr;
       })
     }
  }
  const handleRestartBtnClick = () => {
    clearTimeout(timeOutRef.current);
    document.querySelectorAll(".box").forEach(elm => {
      elm.className = "box";
    })
    isMountedRef.current = false;
    update1(new Array(9).fill(""));
    update2(true);
    update3(false);
    update4(prev => {
      return {
        x:0,
        o:0
      }
      
    });
  }
  const handleToggleBtnClick = () => {
    update5(bool => bool?false:true);
  }
  return (
    <div className = {theme?"container":"container dark"}>
    <Oscore score = {score.o} symbol = {symbol}/>
    <button className = "toggle-btn" onClick = {handleToggleBtnClick}>{theme?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
</svg>:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
</svg>}</button>
    <button className = "restart-btn" onClick = {handleRestartBtnClick}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
</button>
     <div className = "board">
       {
         arrOfSym.map((e,i) => <Box key = {`${e}${i}`} f1 = {handleBoxClick} index = {i} symbol = {e}/>)
       }
     </div>
     <Xscore score = {score.x} symbol = {symbol}/>
    </div>
  )
  
}