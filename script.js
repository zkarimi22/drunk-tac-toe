const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');

    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        alert(`Player ${currentPlayer} wins!`);
    } else if (gameBoard.every(cell => cell !== '')) {
        gameActive = false;
        alert("It's a draw!");
    } else {
        currentPlayer = 'O';
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    if (!gameActive) return;

    let availableMoves = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    if (availableMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        const computerChoice = availableMoves[randomIndex];

        gameBoard[computerChoice] = currentPlayer;
        cells[computerChoice].textContent = currentPlayer;

        if (checkWin()) {
            gameActive = false;
            alert(`Player ${currentPlayer} wins!`);
        } else if (gameBoard.every(cell => cell !== '')) {
            gameActive = false;
            alert("It's a draw!");
        } else {
            currentPlayer = 'X';
        }
    }
}

function checkWin() {
    return winningCombos.some(combo => {
        return combo.every(index => gameBoard[index] === currentPlayer);
    });
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);