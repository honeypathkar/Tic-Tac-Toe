import React, { useState, useEffect } from "react";
import "../App.css";
import ClickSound from "./sounds/click_sound.wav";
import StartSound from "./sounds/start.wav";

export default function Box() {
  const [mode, setMode] = useState(null); // null, 'PvC', 'PvP'
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [current, setCurrent] = useState("X");
  const [winner, setWinner] = useState(null);
  const [click] = useState(new Audio(ClickSound));
  const [start] = useState(new Audio(StartSound));

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

  //If playing against computer then this function runs otherwise not
  useEffect(() => {
    //checking for empty cells
    if (mode === "PvC" && current === "O" && !winner) {
      const emptyIndexes = board.reduce((acc, value, index) => {
        if (value === "") acc.push(index);
        return acc;
      }, []);
      //if empty cells find then automatically added "O" there
      if (emptyIndexes.length > 0) {
        const randomIndex =
          emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        setTimeout(() => {
          handleBoxClick(randomIndex, "O");
        }, 1020);
      }
    }
    // eslint-disable-next-line
  }, [current, board, winner, mode]);

  //Checking winner function
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

    //no one wins then it return "Match Tie"
    if (!currentBoard.includes("")) {
      setWinner("Match Tie");
    }
  };

  //Reset game function
  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setCurrent("X");
    setWinner(null);
  };

  // Box click function for click "X" and "O"
  const handleBoxClick = (index, player = current) => {
    if (board[index] === "" && !winner) {
      let newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrent(player === "X" ? "O" : "X");
      click.play();
    }
  };

  //Changing color of box on winnig condition
  const handleBoxStyle = (index) => {
    //Finding winnig conditon boxes
    if (winner) {
      const winningChar = winner;
      const winningLineIndexes = winningLines.find((line) =>
        line.every((cellIndex) => board[cellIndex] === winningChar)
      );

      //If winning condition satisfy than change the color else no
      return winningLineIndexes &&
        winningLineIndexes.includes(index) &&
        winningChar === board[index]
        ? { color: "red" }
        : {};
    }
    return {};
  };

  //Mode selecting fuction for selecting mode
  const handleModeSelection = (selectedMode) => {
    setMode(selectedMode);
    resetGame(); // Reset the game whenever a new mode is selected
    start.play();
  };

  return (
    <div className="my-5">
      {/* If mode not selected show this */}
      {!mode && (
        <div className="text-center my-5" style={{ marginTop: "60px" }}>
          <h2>Select Game Mode</h2>
          <div
            className="d-grid justify-content-center"
            style={{ marginTop: "60px" }}
          >
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
      {/* If have selected show this */}
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
          {/* Showing turn only if no one is winner */}
          {!winner && (
            <h2 className="my-3 text-center">
              Current Player:{" "}
              {mode === "PvC"
                ? current === "X"
                  ? "Your Turn"
                  : "Computer turn"
                : current}
            </h2>
          )}
          {/* Showing winner according to mode if mode is  "PvC" Then computer wins or You won and if mode is "PvP" Then X won or O won */}
          {winner && (
            <h2 className="my-3 text-center">
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
            {/* Going back to mode selction */}
            <button
              onClick={() => setMode(null)}
              className="btn btn-outline-dark button1 my-2"
            >
              &larr; Back
            </button>
            {/* If not of winner then button is disabled */}
            <button
              onClick={resetGame}
              disabled={winner ? false : true}
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
