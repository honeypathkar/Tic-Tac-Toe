import React, { useState } from "react";

export default function Box() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [current, setCurrent] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWinner = (currentBoard) => {
    const winPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
];
    for (const pattern of winPattern) {
      console.log(pattern);
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(current);
        //document.querySelector(".box9").style.color = 'red';
        return;
      }
    }
    if (!currentBoard.includes("")) {
     setWinner("Tie");
    }
  };

  const resetGame  = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setCurrent('X');
    setWinner(null);
    //document.body.style.color = 'black';
  }

  const handleBoxClick = (index) => {
    console.log(index);
    if (board[index] === "" && !winner) {
      let newBoard = [...board];
      newBoard[index] = current;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrent(current === "X" ? "O" : "X");
    }
  };

  return (
    <div className="my-5 container">
      <div className="box-container">
        {board.map((value, index) => {
          return (
            <div
              className="col-md-4 box9"
              onClick={() => handleBoxClick(index)}
              key={index}
            >
              {value}
            </div>
          );
        })}
      </div>
      <h2 className="my-3" style={{ textAlign: "center" }}>
        Player: {current}
      </h2>
      <h2 style={{ textAlign: "center" }}>Winner: {winner}</h2>
      <button onClick={resetGame} className="btn btn-dark button1 my-2">Reset Game</button>
      <style jsx="true">{`
        .box-container {
          display: inline-grid;
          grid-template-columns: repeat(${3}, 1fr);
          justisy-content: center;
          text-align: center;
          max-width: 100px;
          
        } 
        .box9 {
          width: 150px;
          height: 150px;
          margin: 0 0 -2px -2px;
          border: 2px solid #000;
          background-color: white;
          cursor: pointer;
          font-size: 80px;
      
        }
        @media screen and (max-width : 1750px){
          .box-container{
            margin-left: 420px;
          }
        }
        @media screen and (max-width : 1400px){
          .box-container {
            margin-left: 335px;
          }
        }
        @media screen and (max-width : 1200px){
          .box-container {
            margin-left: 250px;
          }
        }
        @media screen and (max-width : 991px){
          .box-container {
            margin-left: 135px;
          }
        }
        @media screen and (max-width : 768px){
          .box-container {
            margin-left: 50px;
          }
        }
        @media screen and (max-width : 380px){
          .box-container {
            margin-left: 0px;
          }
        }
        @media screen and (max-width : 510px){
          .box9 {
            width: 100px;
            height: 100px;
            font-size: 50px;
          }
        }
        @media screen and (max-width : 1750px){
          .button1 {
            margin-left: 590px;
          }
        }
        @media screen and (max-width : 1400px){
          .button1 {
            margin-left: 500px;
          }
        }
        @media screen and (max-width : 1200px){
          .button1 {
            margin-left: 410px;
          }
        }
        @media screen and (max-width : 991px){
          .button1 {
            margin-left: 290px;
          }
        }
        @media screen and (max-width : 768px){
          .button1 {
            margin-left: 200px;
          }
        }
        @media screen and (max-width : 450px){
          .button1 {
            margin-left: 145px;
          }
        }
      `}</style>
    </div>
  );
}
