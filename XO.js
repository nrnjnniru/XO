const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Create game cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  board.appendChild(cell);
}

board.addEventListener("click", handleCellClick);
resetBtn.addEventListener("click", resetGame);

function handleCellClick(e) {
  const clickedCell = e.target;
  const index = clickedCell.dataset.index;

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player X's Turn`;

  Array.from(board.children).forEach(cell => {
    cell.textContent = "";
  });
}
