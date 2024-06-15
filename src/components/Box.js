import React, { useState } from "react";
import "../App.css";

export default function Box() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [current, setCurrent] = useState("X");
  const [winner, setWinner] = useState(null);
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentBoard) => {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        return;
      }
    }

    if (!currentBoard.includes("")) {
      setWinner("Match Tie");
    }
  };

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setCurrent("X");
    setWinner(null);
  };

  const handleBoxClick = (index) => {
    if (board[index] === "" && !winner) {
      let newBoard = [...board];
      newBoard[index] = current;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrent(current === "X" ? "O" : "X");
    }
  };

  const handleBoxStyle = (index) => {
    if (winner) {
      const winningChar = winner;
      const winningLineIndexes = winningLines.find(
        (line) => line.every((cellIndex) => board[cellIndex] === winningChar) // Check if all cells in line are winner's char
      );

      // Color change only for winning character's boxes in the winning line
      return winningLineIndexes &&
        winningLineIndexes.includes(index) &&
        winningChar === board[index]
        ? { color: "red" }
        : {};
    }
    return {}; // No color change by default
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
              style={handleBoxStyle(index)}
            >
              {value}
            </div>
          );
        })}
      </div>
      <h2 className="my-3" style={{ textAlign: "center" }}>
        Player: {current}
      </h2>
      {winner && (
        <h2 style={{ textAlign: "center" }}>
          {winner === "Match Tie"
            ? `Result : ${winner}`
            : `Result : Player ${winner} Won !`}
        </h2>
      )}
      <div className="button-container">
        <button
          onClick={resetGame}
          className="btn btn-outline-dark button1 my-2"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
