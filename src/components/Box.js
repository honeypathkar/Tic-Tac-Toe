import React, { useState, useEffect } from "react";
import "../App.css";

export default function Box() {
  const [mode, setMode] = useState(null); // null, 'PvC', 'PvP'
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

  useEffect(() => {
    if (mode === "PvC" && current === "O" && !winner) {
      const emptyIndexes = board.reduce((acc, value, index) => {
        if (value === "") acc.push(index);
        return acc;
      }, []);
      if (emptyIndexes.length > 0) {
        const randomIndex =
          emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        setTimeout(() => {
          handleBoxClick(randomIndex, "O");
        }, 800);
      }
    }
    // eslint-disable-next-line
  }, [current, board, winner, mode]);

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

  const handleBoxClick = (index, player = current) => {
    if (board[index] === "" && !winner) {
      let newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrent(player === "X" ? "O" : "X");
    }
  };

  const handleBoxStyle = (index) => {
    if (winner) {
      const winningChar = winner;
      const winningLineIndexes = winningLines.find((line) =>
        line.every((cellIndex) => board[cellIndex] === winningChar)
      );

      return winningLineIndexes &&
        winningLineIndexes.includes(index) &&
        winningChar === board[index]
        ? { color: "#69ff69" }
        : {};
    }
    return {};
  };

  const handleModeSelection = (selectedMode) => {
    setMode(selectedMode);
    resetGame(); // Reset the game whenever a new mode is selected
  };

  return (
    <div className="my-5 container">
      {!mode && (
        <div className="text-center">
          <h2>Select Game Mode</h2>
          <div className="d-flex justify-content-center">
            <button
              onClick={() => handleModeSelection("PvP")}
              className="btn btn-outline-dark my-2 mx-2"
            >
              Player vs Player
            </button>
            <button
              onClick={() => handleModeSelection("PvC")}
              className="btn btn-outline-dark my-2"
            >
              Player vs Computer
            </button>
          </div>
        </div>
      )}
      {mode && (
        <>
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
          {!winner && (
            <h2 className="my-3" style={{ textAlign: "center" }}>
              Current Player:{" "}
              {mode === "PvC"
                ? current === "X"
                  ? "Your Turn"
                  : "Computer turn"
                : current}
            </h2>
          )}
          {winner && (
            <h2 style={{ textAlign: "center" }} className="my-3">
              {winner === "Match Tie"
                ? `Result : ${winner}`
                : mode === "PvC"
                ? winner === "X"
                  ? `Result : You Won!`
                  : `Result : Computer Won!`
                : `Result : Player ${winner} Won!`}
            </h2>
          )}
          <div className="button-container">
            <button
              onClick={() => setMode(null)}
              className="btn btn-outline-dark button1 my-2"
            >
              &larr; Back
            </button>
            <button
              onClick={resetGame}
              className="btn btn-outline-dark button1 my-2 mx-2"
            >
              Reset Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}
