function Board({ squares, onClick, winningLine = [] }) {
  return (
    <div className="game-board">
      {squares.map((square, index) => {
        const markClass =
          square === "X"
            ? "mark-x"
            : square === "O"
            ? "mark-o"
            : "";

        const winnerClass = winningLine.includes(index)
          ? "winning-cell"
          : "";

        return (
          <button
            key={index}
            type="button"
            className={`game-cell ${markClass} ${winnerClass}`}
            onClick={() => onClick(index)}
            disabled={Boolean(square)}
            aria-label={`Square ${index + 1}${square ? `: ${square}` : ", empty"}`}
          >
            {square}
          </button>
        );
      })}
    </div>
  );
}

export default Board;