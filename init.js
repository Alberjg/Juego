startGame();

function startGame() {
    const buttonStart = document.querySelector('.buttonStart');
    buttonStart.addEventListener('click', disableOptionsEnableBoard);
}

function disableOptionsEnableBoard(event) {
    event.preventDefault();
    const options = document.querySelector('.containerOptions');
    const board = document.querySelector('.game');
    const buttonReset = document.querySelector('.resetGame');

    options.style.display = 'none';
    board.style.display = 'flex';
    buttonReset.style.display = 'block';

    clickFuncionalitySquare();
}

function clickFuncionalitySquare() {
    const squares = document.querySelectorAll('.square');
    let turn = 0;

    squares.forEach(square => {
        square.addEventListener('click', (event) => {
            turn = paintToken(square, turn);
        });

    });

}

function paintToken(square, turn) {
    if (turn == 1) {
        square.innerHTML = 'X';
        square.classList.add('x');
        turn--;

    }
    else if (turn === 0) {
        square.innerHTML = 'O';
        square.classList.add('o');
        turn++;
    }

    return turn
}