let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerXMoves = [];
let playerOMoves = [];

function makeMove(cell, index) {
    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;

    if (currentPlayer === 'X') {
        managePlayerMoves(playerXMoves, index);
    } else {
        managePlayerMoves(playerOMoves, index);
    }

    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function managePlayerMoves(playerMoves, index) {
    if (playerMoves.length === 3) { // Prepara para a quarta jogada
        document.querySelectorAll('.cell')[playerMoves[0]].classList.add('saindo');
    }

    playerMoves.push(index); // Armazena o índice do movimento atual

    if (playerMoves.length > 3) { // Se houver mais de 3 movimentos
        const removeIndex = playerMoves.shift(); // Remove e obtém o índice do primeiro movimento
        const cellToRemove = document.querySelectorAll('.cell')[removeIndex];
        cellToRemove.classList.remove('saindo'); // Remove a classe saindo
        gameState[removeIndex] = ""; // Limpa o estado do jogo nesse índice
        cellToRemove.innerText = ""; // Limpa o texto na célula
    }
}

function checkResult() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        alert("Game draw!");
        gameActive = false;
        return;
    }
}
