const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupButton = document.getElementById('popup-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = [...cells].indexOf(cell);

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin(currentPlayer)) {
            endGame(`Player ${currentPlayer} wins!`);
        } else if (isDraw()) {
            endGame("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWin(player) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winCombos.some(combination =>
        combination.every(index => gameBoard[index] === player)
    );
}

function isDraw() {
    return gameBoard.every(cell => cell !== '');
}

function endGame(message) {
    gameActive = false;
    status.textContent = '';
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('D', 'Z');
    });
    status.textContent = `Player ${currentPlayer}'s turn`;
    popup.style.display = 'none';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
popupButton.addEventListener('click', restartGame);

restartGame();
