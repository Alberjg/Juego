startGame();

function startGame() {
    const form = document.querySelector(".fromOptions");
    form.addEventListener("submit", getForm);
}

function getForm(event) {
    event.preventDefault();
    const machine = document.querySelector(".machineMode").checked;
    const tokenPlayer1 = document.querySelector(".tokenPlayer1").value;
    const tokenPlayer2 = document.querySelector(".tokenPlayer2").value;

    const gameInfo = {
        machine: machine,
        player1: tokenPlayer1,
        player2: tokenPlayer2,
    }

    if (tokenPlayer1 != tokenPlayer2) {
        disableOptionsEnableBoard(gameInfo);
    }
    else {
        alert("Player 1's token must be different from player 2's.");
    }

}

function disableOptionsEnableBoard(gameInfo) {
    const options = document.querySelector('.containerOptions');
    const board = document.querySelector('.game');
    const buttonReset = document.querySelector('.resetGame');

    options.style.display = 'none';
    board.style.display = 'flex';
    buttonReset.style.display = 'block';

    clickFuncionalitySquare(gameInfo);
    buttonResetFuncionality();
}


function clickFuncionalitySquare(gameInfo) {
    const squares = document.querySelectorAll('.square');
    let turn = 2;
    let scoreboard = [];
    let turnMachine = 1;

    squares.forEach(square => {
        square.addEventListener('click', (event) => {
            let resPaintToken = paintToken(square, turn, gameInfo, scoreboard, squares);

            turn = resPaintToken[0];
            scoreboard = resPaintToken[1];

            paintScoreBoard(scoreboard);
        });

    });

    // if (gameInfo.machine && turnMachine == 1) {
    //     let cube = document.querySelector('.square0');

    //     cube.cliclk();
    //     turnMachine--;

    // }

}

function paintToken(square, turn, gameInfo, scoreboard, squares) {

    if (turn == 2) {

        let scorePlayer1 = document.querySelector('.scorePlayer1');
        let scorePlayer2 = document.querySelector('.scorePlayer2');
        if (gameInfo.player1 == 'x') {
            turn = 1;
            scorePlayer1.classList.add('tokenX');
            scorePlayer2.classList.add('tokenO');
        }
        else {
            turn = 0;
            scorePlayer1.classList.add('tokenO');
            scorePlayer2.classList.add('tokenX');
        }

    }
    
    if (turn == 1 && !square.classList.contains('x') && !square.classList.contains('o')) {

        square.innerHTML = 'x';
        square.classList.add('x');
        turn--;
        // Saber si el check de computer esta activado
        if (gameInfo.machine) {
            turn = playMachine(turn);
            console.log('Aqui no deberia de llegar todavia')
        }


    }
    else if (turn === 0 && !square.classList.contains('x') && !square.classList.contains('o') && !gameInfo.machine) {
        
        square.innerHTML = 'o';
        square.classList.add('o');
        turn++;
    }


    scoreboard = checkLines(scoreboard, squares);

    return [turn, scoreboard]
}

function randomNumber() {
    const NUMBER_POSITIONS = 9
    return Math.floor(Math.random() * NUMBER_POSITIONS);
}


function playMachine(turn) {

    let num = randomNumber();



    let squarePaint = document.querySelector('.square' + num);

  
    if(squarePaint.classList.contains('o') || squarePaint.classList.contains('x')){
        playMachine(turn);
        console.log('iguala');
        return
        
    }
    console.log('AQUI NO ENTRA JUSTO DESPUES DEL IGUALA')
    squarePaint.innerHTML = "o";
    squarePaint.classList.add('o');
    turn++;
    
    return turn;
}


function checkLines(scoreboard, squares) {

    if (checkWiner('x')) {
        alert("X Wins!!");
        scoreboard = addPoints('x', scoreboard);
        clearBoard(squares);

    }
    else if (checkWiner('o')) {
        alert("O Wins!!");
        scoreboard = addPoints('o', scoreboard);
        clearBoard(squares)
    }
    return scoreboard;
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

function addPoints(player, scoreboard) {
    scoreboard.push(player);
    return scoreboard;
}

function buttonResetFuncionality() {
    const buttonReset = document.querySelector('.resetGame');
    buttonReset.addEventListener('click', resetGame);

}

function resetGame() {
    let reset = confirm("Do you want to restart the game?");

    if (reset) {
        location.reload();
    }
}

function paintScoreBoard(scoreboard) {
    let tokenX = 0;
    let tokenO = 0;
    scoreboard.forEach(token => {
        if (token == 'x') {
            tokenX++;
        }
        else if (token == 'o') {
            tokenO++;
        }
    });

    let playerTokenX = document.querySelector('.tokenX');
    let playerTokenO = document.querySelector('.tokenO');

    playerTokenX.innerHTML = tokenX;
    playerTokenO.innerHTML = tokenO;
}

function clearBoard(squares) {
    squares.forEach(square => {
        square.innerHTML = '';
        square.classList.remove('x');
        square.classList.remove('o');
    });
}