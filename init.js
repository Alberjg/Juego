startGame();

// Una rama, Una Pull Request --> Crear una funcion que sea la que dibuje el tablero
// Una rama, Una PR --> Mover correctamente los players
// Una rama, Una PR --> Eliminar el while
// Una rama, Una PR --> Modal Has ganado
// Una rama, Una PR --> Modal Has Perdido

// CUANDO HAYAS CORREGIDO TODO LO QUE TE HE COMENTADO....
// TENDREMOS QUE DIVIDIRLO EN MAS DE 1 ARCHIVO

const PLAYER_ONE = "X";
const PLAYER_TWO = "O";

function startGame() {
  const form = document.querySelector(".from-options");
  form.addEventListener("submit", getForm);
}

function getForm(event) {
  event.preventDefault();

  const tokenPlayer1 = document.querySelector(".token-player1").value;
  const tokenPlayer2 = document.querySelector(".token-player2").value;

  if (tokenPlayer1 !== tokenPlayer2) {
    const machine = document.querySelector(".machine-mode").checked;

    const gameInfo = {
      machine: machine,
      player1: tokenPlayer1,
      player2: tokenPlayer2,
    };

    disableOptionsEnableBoard();
    createBoard(gameInfo);
  }
  // Intenta sustituir else por if - return (Early return)
  else {
    infoDifferentPlayers();
  }
}

function infoDifferentPlayers() {
  const box = document.createElement("div");
  box.classList.add("box-modal");

  const message = document.createElement("h2");

  message.innerHTML = `Player 1's token must be different from player 2's.`;

  const buttonOk = document.createElement("button");
  buttonOk.innerHTML = "Ok";
  buttonOk.addEventListener("click", continueGame);
  box.appendChild(buttonOk);

  box.appendChild(nameWinner);

  modal(box);
}

function disableOptionsEnableBoard() {
  const options = document.querySelector(".container-options");
  const board = document.querySelector(".game");
  const buttonReset = document.querySelector(".reset-game");

  options.style.display = "none";
  board.style.display = "flex";
  buttonReset.style.display = "block";
}

function createBoard(gameInfo) {
  createPlayerScore("1");
  createBoardGame();
  createPlayerScore("2");
  clickFuncionalitySquare(gameInfo);

  const buttonReset = document.querySelector(".reset-game");
  buttonReset.addEventListener("click", resetGame);
}

function resetGame() {
  const box = document.createElement("div");
  box.classList.add("box-modal");
  const messageReset = document.createElement("h2");
  messageReset.innerHTML = "Do you want to restart the game?";
  box.appendChild(messageReset);

  const buttonConfirmReset = document.createElement("button");
  buttonConfirmReset.innerHTML = "Yes";
  buttonConfirmReset.addEventListener("click", resetPage);
  box.appendChild(buttonConfirmReset);

  const buttonCancelReset = document.createElement("button");
  buttonCancelReset.innerHTML = "No";
  buttonCancelReset.addEventListener("click", continueGame);
  box.appendChild(buttonCancelReset);
  console.log(box);

  modal(box);
}

function createBoardGame() {
  const NUMBER_OF_SQUARES = 9;
  const game = document.querySelector(".game");
  const board = document.createElement("div");
  board.classList.add("board");
  game.appendChild(board);

  for (let i = 0; i < NUMBER_OF_SQUARES; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.classList.add(`square${i}`);
    board.appendChild(square);
  }
}

function createPlayerScore(playerNumber) {
  const game = document.querySelector(".game");

  const player = document.createElement("div");
  player.classList.add("player");
  let namePlayer = document.createElement("h2");
  namePlayer.innerHTML = `Player ${playerNumber}`;
  player.appendChild(namePlayer);
  let scorePlayer = document.createElement("h3");
  scorePlayer.classList.add(`score-player${playerNumber}`);
  scorePlayer.innerHTML = "0";
  player.appendChild(scorePlayer);

  game.appendChild(player);
}

function clickFuncionalitySquare(gameInfo) {
  const squares = document.querySelectorAll(".square");
  let turn = 2;
  let scoreboard = [];

  squares.forEach((square) => {
    square.addEventListener("click", () => {
      // https://github.com/ryanmcdermott/clean-code-javascript
      const paintTokenInfo = {
        square: square,
        turn: turn,
        gameInfo: gameInfo,
        scoreboard: scoreboard,
        squares: squares,
      };
      const responsePaintToken = paintToken(paintTokenInfo);

      turn = responsePaintToken[0];
      scoreboard = responsePaintToken[1];

      paintScoreBoard(scoreboard);
    });
  });
}

function paintToken(paintTokenInfo) {
  // TODO ESTO DIVIDIR EN FUNCIONES MAS PEQUEÑAS
  let copyTurn = paintTokenInfo.turn;

  if (copyTurn == 2) {
    const scorePlayer1 = document.querySelector(".score-player1");
    const scorePlayer2 = document.querySelector(".score-player2");
    if (paintTokenInfo.gameInfo.player1 == "x") {
      copyTurn = 1;
      scorePlayer1.classList.add("token-x");
      scorePlayer2.classList.add("token-o");
    } else {
      copyTurn = 0;
      scorePlayer1.classList.add("token-o");
      scorePlayer2.classList.add("token-x");
    }
  }

  //----------------------------------------------

  if (
    copyTurn == 1 &&
    !paintTokenInfo.square.classList.contains("x") &&
    !paintTokenInfo.square.classList.contains("o")
  ) {
    paintTokenInfo.square.innerHTML = "x";
    paintTokenInfo.square.classList.add("x");
    copyTurn--;
    //------------------------------------------------------machine
    if (paintTokenInfo.gameInfo.machine) {
      copyTurn = playMachine(copyTurn);
    }
  } else if (
    copyTurn == 0 &&
    !paintTokenInfo.square.classList.contains("x") &&
    !paintTokenInfo.square.classList.contains("o") &&
    !paintTokenInfo.gameInfo.machine
  ) {
    paintTokenInfo.square.innerHTML = "o";
    paintTokenInfo.square.classList.add("o");
    copyTurn++;
  }

  let copyScoreboard = checkLines(
    paintTokenInfo.scoreboard,
    paintTokenInfo.squares
  );

  return [copyTurn, copyScoreboard];
}

function randomNumber() {
  const NUMBER_POSITIONS = 9;
  return Math.floor(Math.random() * NUMBER_POSITIONS);
}

function playMachine(turn) {
  const TIMEOUT = 1000;
  let number = randomNumber();
  let count = 0;

  let squarePaint = document.querySelector(".square" + number);

  // Buscamos alternativa al while
  while (
    (squarePaint.classList.contains("o") ||
      squarePaint.classList.contains("x")) &&
    count < 9
  ) {
    number = randomNumber();
    squarePaint = document.querySelector(".square" + number);
    count++;
  }

  setTimeout(() => {
    squarePaint.innerHTML = "o";
    squarePaint.classList.add("o");
    turn++;
  }, TIMEOUT);

  return turn;
}

function checkLines(scoreboard, squares) {
  let copyScoreboard = scoreboard;
  // En la medida de lo posible, eliminamos los if-else-if y los if-else

  if (checkWiner("x")) {
    infoToModal("X");
    copyScoreboard = addPoints("x", scoreboard);
    clearBoard(squares);
  }
  if (checkWiner("o")) {
    infoToModal("O");
    copyScoreboard = addPoints("o", scoreboard);
    clearBoard(squares);
  }

  return copyScoreboard;
}

function infoToModal(symbol) {
  const box = document.createElement("div");
  box.classList.add("box-modal");

  const nameWinner = document.createElement("h2");
  // nameWinner.classList.add("nameWinner");

  nameWinner.innerHTML = `The winner is ${symbol}!!`;

  const buttonContinueGame = document.createElement("button");
  // buttonContinueGame.classList.add("buttonContinueGame");
  buttonContinueGame.innerHTML = "Continue The Game";
  buttonContinueGame.addEventListener("click", continueGame);
  box.appendChild(buttonContinueGame);

  box.appendChild(nameWinner);

  modal(box);
}

function checkWiner(classToken) {
  const squares = document.querySelectorAll(".square");

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    if (checkWiningLines(squares, winningLines[i], classToken)) {
      return true;
    }
  }
}

function checkWiningLines(squares, lines, classToken) {
  if (
    squares[lines[0]].classList.contains(classToken) &&
    squares[lines[1]].classList.contains(classToken) &&
    squares[lines[2]].classList.contains(classToken)
  ) {
    return true;
  }
}

function addPoints(player, scoreboard) {
  let copyScoreboard = scoreboard;
  copyScoreboard.push(player);
  return copyScoreboard;
}

function paintScoreBoard(scoreboard) {
  let tokenX = 0;
  let tokenO = 0;
  scoreboard.forEach((token) => {
    token == "x" ? tokenX++ : tokenO++;
  });

  const playerTokenX = document.querySelector(".token-x");
  const playerTokenO = document.querySelector(".token-o");

  playerTokenX.innerHTML = tokenX;
  playerTokenO.innerHTML = tokenO;
}

function clearBoard(squares) {
  squares.forEach((square) => {
    square.innerHTML = "";
    square.classList.remove("x");
    square.classList.remove("o");
  });
}

function modal(box) {
  const body = document.querySelector("body");
  const blurredBackground = document.createElement("div");
  blurredBackground.classList.add("blurred-background");

  blurredBackground.appendChild(box);

  body.appendChild(blurredBackground);
}

function continueGame() {
  const modalWinner = document.querySelector(".blurred-background");
  modalWinner.remove();
}

function resetPage() {
  location.reload();
}
