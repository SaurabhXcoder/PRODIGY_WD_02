const playArea = document.querySelector('.play-area');
const winnerText = document.getElementById('winner');
const resetButton = document.getElementById('reset');
const playerCountSelect = document.getElementById('player-count');
const aiDifficultySelect = document.getElementById('ai-difficulty');

let currentPlayer = 'x';
let ai = { difficulty: 'easy', enabled: false };
let board = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(e) {
  const cell = e.target;
  const index = Array.from(playArea.children).indexOf(cell);

  if (board[index] === '' && !ai.enabled) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkForWin(board, currentPlayer)) {
      winnerText.textContent = `${currentPlayer} wins!`;
      disableBoard();
    } else if (isBoardFull(board)) {
      winnerText.textContent = 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
  }
}

function checkForWin(board, player) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.some(combo => {
    return combo.every(index => board[index] === player);
  });
}

function isBoardFull(board) {
  return board.every(cell => cell !== '');
}

function disableBoard() {
  Array.from(playArea.children).forEach(cell => {
    cell.removeEventListener('click', handleCellClick);
    cell.classList.add('disabled');
  });
}

function enableBoard() {
  Array.from(playArea.children).forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.classList.remove('disabled');
  });
}

function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'x';
  playArea.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    playArea.appendChild(cell);
  }
  enableBoard();
  winnerText.textContent = '';
}

resetButton.addEventListener('click', resetBoard);

playerCountSelect.addEventListener('change', () => {
  if (playerCountSelect.value === '1') {
    ai.enabled = true;
    ai.difficulty = 'easy';
    aiDifficultySelect.disabled = false;
  } else {
    ai.enabled = false;
    aiDifficultySelect.disabled = true;
  }
  resetBoard();
});

aiDifficultySelect.addEventListener('change', () => {
  ai.difficulty = aiDifficultySelect.value;
});

resetBoard();
