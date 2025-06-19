startGame();

function startGame() {
    const buttonStart = document.querySelector('.buttonStart');
    buttonStart.addEventListener('click', disableOptionsEnableBoard);
}

function disableOptionsEnableBoard(event){
    event.preventDefault();
    const options = document.querySelector('.containerOptions');
    const board = document.querySelector('.game');
    const buttonReset = document.querySelector('.resetGame');

    options.style.display = 'none';
    board.style.display = 'flex';
    buttonReset.style.display = 'block';
}