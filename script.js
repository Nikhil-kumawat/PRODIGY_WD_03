let currentPlayer = 'X';
let gameMode = 'player'; // 'player' or 'ai'
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

function handleMove(cellIndex) {
    if (gameBoard[cellIndex] === '' && !checkWinner()) {
        gameBoard[cellIndex] = currentPlayer;
        document.getElementById(cellIndex).innerText = currentPlayer;
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
        } else if (gameBoard.every(cell => cell !== '')) {
            alert("It's a tie!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'ai' && currentPlayer === 'O') {
                aiMove();
            }
        }
    }
}

function checkWinner() {
    return winningCombos.some(combo => {
        return combo.every(index => gameBoard[index] === currentPlayer);
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

function toggleMode() {
    gameMode = gameMode === 'player' ? 'ai' : 'player';
    resetGame();
}

function aiMove() {
    // Implement AI move logic (optional) for player vs AI mode
    // Example: Randomly select an empty cell
    let emptyCells = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    setTimeout(() => handleMove(randomIndex), 1000); // simulate AI delay
}

// Event listeners for user clicks on cells
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        handleMove(parseInt(cell.id));
    });
});
