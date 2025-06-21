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
    
    if (turn == 1 && !square.classList.contains('x') && !square.classList.contains('o')) {
        square.innerHTML = 'X';
        square.classList.add('x');
        turn--;
    }
    else if (turn === 0 && !square.classList.contains('x') && !square.classList.contains('o')) {
        square.innerHTML = 'O';
        square.classList.add('o');
        turn++;        
    }
    checkLines();
    return turn
}

function checkLines(){
    if (checkWiner('x')) {
        alert("X Wins!!");
        
    }
    if (checkWiner('o')) {
        alert("O Wins!!");
    }
    
}

function checkWiner(classToken) {
    const squares = document.querySelectorAll('.square');

    if (squares[0].classList.contains(classToken) && squares[1].classList.contains(classToken) && squares[2].classList.contains(classToken)) {
        return true;
    } 
    else if (squares[3].classList.contains(classToken) && squares[4].classList.contains(classToken) && squares[5].classList.contains(classToken)) {
        return true;
    }
    else if (squares[6].classList.contains(classToken) && squares[7].classList.contains(classToken) && squares[8].classList.contains(classToken)) {
        return true;
    }
    else if (squares[0].classList.contains(classToken) && squares[3].classList.contains(classToken) && squares[6].classList.contains(classToken)) {
        return true;
    }
    else if (squares[1].classList.contains(classToken) && squares[4].classList.contains(classToken) && squares[7].classList.contains(classToken)) {
        return true;
    }
    else if (squares[2].classList.contains(classToken) && squares[5].classList.contains(classToken) && squares[8].classList.contains(classToken)) {
        return true;
    }
    else if (squares[0].classList.contains(classToken) && squares[4].classList.contains(classToken) && squares[8].classList.contains(classToken)) {
        return true;
    }
    else if (squares[2].classList.contains(classToken) && squares[4].classList.contains(classToken) && squares[6].classList.contains(classToken)) {
        return true;
    }
}