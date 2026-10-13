import { useState } from "react";
import Board from "./components/Board";

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

function calculateWinner(squares) {
  for (const line of winningLines) {
    const [a, b, c] = line;

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return {
        player: squares[a],
        line,
      };
    }
  }

  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const result = calculateWinner(squares);
  const isDraw = !result && squares.every(Boolean);

  function handleClick(index) {
    if (squares[index] || result || isDraw) return;

    const updatedSquares = [...squares];
    updatedSquares[index] = isXNext ? "X" : "O";

    setSquares(updatedSquares);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }
  let status;
  if (result) {
    status = `PLAYER ${result.player} WINS!`;
  } else if (isDraw) {
    status = "IT'S A DRAW!";
  } else {
    status = `PLAYER ${isXNext ? "X" : "O"}'S TURN`;
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <section className="game-card w-full max-w-md p-6 sm:p-8 text-center">
        <p className="text-sm tracking-[5px] text-indigo-300 mb-3">
           Let the Battle Begin!
        </p>

        <h1 className="game-title text-3xl sm:text-5xl mb-4">
          TIC TAC TOE
        </h1>

        <p className="text-sm text-slate-400 mb-7">
        
        </p>

        <div className="flex justify-center gap-4 mb-6">
          <div className="rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-5 py-3">
            <p className="text-xs text-cyan-300 mb-1">PLAYER 1</p>
            <p className="text-2xl font-bold text-cyan-300">X</p>
          </div>

          <div className="rounded-xl border border-pink-400/50 bg-pink-400/10 px-5 py-3">
            <p className="text-xs text-pink-300 mb-1">PLAYER 2</p>
            <p className="text-2xl font-bold text-pink-300">O</p>
          </div>
        </div>

        <p
          className={`game-status mb-5 ${
            result?.player === "X"
              ? "text-cyan-400"
              : result?.player === "O"
              ? "text-pink-400"
              : ""
          }`}
          aria-live="polite"
        >
          {status}
        </p>

        <Board
          squares={squares}
          onClick={handleClick}
          winningLine={result?.line ?? []}
        />

        <button
          type="button"
          className="restart-btn mt-7 w-full"
          onClick={resetGame}
        >
            🚀 Play Again
        </button>

        <p className="text-xs text-slate-500 mt-6">
           ⚡ Stay Sharp • Play Hard • Never Give Up ⚡
        </p>
        <p className="text-xs text-slate-500 mt-6">
              Crafted with ❤️ by Srik...
        </p>
      </section>
    </main>
  );
}

export default App;