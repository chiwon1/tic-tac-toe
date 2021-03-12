const $cells = document.querySelectorAll(".cell");
const turnsEnum = Object.freeze({ X: "X", O: "O" });
let currentTurn = turnsEnum.X;
let resultArray = ["", "", "", "", "", "", "", "", ""];
const resultShow = document.querySelector(".resultShow");
const resultMessage = document.querySelector(".resultMessage");
const restartButton = document.querySelector("#restartButton");
const startButton = document.querySelector("#startButton");
const whosTurn = document.querySelector(".whosturn");
restartButton.addEventListener("click", startGame);
startButton.addEventListener("click", startGame);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function switchTurn() {
  if (currentTurn === turnsEnum.X) {
    currentTurn = turnsEnum.O;
  }
  else {
    currentTurn = turnsEnum.X;
  }
  whosTurn.textContent = currentTurn + "'s turn";
}

function startGame() {
  resultShow.classList.remove("show");
  currentTurn = turnsEnum.X;
  whosTurn.textContent = currentTurn + "'s turn";
  for (let i = 0; i < $cells.length; i++) {
    $cells[i].textContent = "";
  }

  for (let i = 0; i < $cells.length; i++) {
    $cells[i].addEventListener("click", function (event) {
      if (event.target.textContent === "") {
        event.target.textContent = currentTurn;

        buildResultArray();

        if (calculateWinner(resultArray)) {
          endGame();
        }
        else if (isDraw()) {
          resultShow.classList.add("show");
          resultMessage.textContent = "Draw";
        }

        switchTurn();
      }
    });
  }
}

function buildResultArray() {
  for (let i = 0; i < $cells.length; i++) {
    resultArray[i] = $cells[i].textContent;
  }
}

function endGame() {
  if (currentTurn === turnsEnum.O) {
    resultMessage.textContent = turnsEnum.O + " Win!";
  }
  else {
    resultMessage.textContent = turnsEnum.X + " Win!";
  }
  resultShow.classList.add("show");
}

function isDraw() {
  let isDraw = true;
  for (let i = 0; i < $cells.length; i++) {
    if (resultArray[i] === "") {
      isDraw = false;
    }
  }
  return isDraw;
}
