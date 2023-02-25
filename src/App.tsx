import React, { useState } from "react";
import "./App.css";
import Timer from "react-compound-timer";
import Chessboard from "chessboardjsx";

import { ChessInstance, ShortMove } from "chess.js";

import { registerRootComponent } from "expo";

const Chess = require("chess.js");

const paddingStyle = {
  padding: 5,
};

const marginStyle = {
  margin: 5,
};

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    // Set initial state to FEN layout
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const [fen, setFen] = useState(chess.fen());

  // Logic for the setting up the random computer move.
  const handleMove = (move: ShortMove) => {
    // Line 29 validates the user move.
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        // Lines 33-28: Computer random move.
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);
      // Sets state of chess board
      setFen(chess.fen());
    }
  };

  return (
    <div className="flex-center">
      <h1>chess.xnft</h1>
      <Chessboard
        width={200}
        position={fen}
        // onDrop prop tracks everytime a piece is moved.
        // The rest is handled in the the handleMove function.
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            // This promotion attribute changes pawns to a queen if they reach the other side of the board.
            promotion: "q",
          })
        }
      />
      {/* Timer code */}
      <Timer initialTime={0} startImmediately={false}>
        {/* I thought this was weird. Definitely a better way to do this, but I just wanted it to work. */}
        {({
          start,
          resume,
          pause,
          stop,
          reset,
          timerState,
        }: {
          start: any;
          resume: any;
          pause: any;
          stop: any;
          reset: any;
          timerState: any;
        }) => (
          <>
            <div>
              <span style={paddingStyle}>
                <Timer.Minutes /> minutes
              </span>
              <span style={paddingStyle}>
                <Timer.Seconds /> seconds
              </span>
              <span style={paddingStyle}>
                <Timer.Milliseconds /> milliseconds
              </span>
            </div>
            <div style={paddingStyle}>{timerState}</div>
            <br />
            <div>
              <button style={marginStyle} onClick={start}>
                Start
              </button>
              <button style={marginStyle} onClick={pause}>
                Pause
              </button>
              <button style={marginStyle} onClick={resume}>
                Resume
              </button>
              <button style={marginStyle} onClick={stop}>
                Stop
              </button>
              <button style={marginStyle} onClick={reset}>
                Reset
              </button>
            </div>
          </>
        )}
      </Timer>
    </div>
  );
};

export default registerRootComponent(App);