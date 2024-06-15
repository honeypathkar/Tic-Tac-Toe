import React, { useState } from "react";
import "../App.css";

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

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setCurrent("X");
    setWinner(null);
    //document.body.style.color = 'black';
  };

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
              className="col-md-4 box"
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
      {winner && <h2 style={{ textAlign: "center" }}>Winner: {winner}</h2>}
      <div className="button-container">
        <button onClick={resetGame} className="btn btn-dark button1 my-2">
          Reset Game
        </button>
      </div>
    </div>
  );
}
