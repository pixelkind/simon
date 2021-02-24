let fields = [];
let activeColors = ["#00FF00", "#FF0000", "#FFFF00", "#0000FF"];
let inactiveColors = ["#baffc9", "#ffb3ba", "#ffffba", "#bae1ff"];
// green, red, yellow, blue,

let colors = [];
let usersTurn = false;
let gameIsRunning = false;
let userColors = [];
let points = 0;
let startButton;

function loadHandler() {
  console.log("Finished Loading");
  // first do all by hand, later on in a loop
  for (let i = 0; i < 4; i++) {
    let field = document.getElementById("field" + (i + 1));
    field.style.backgroundColor = inactiveColors[i];
    // field.addEventListener("click", clickHandler);
    field.addEventListener("mousedown", pressedHandler);
    field.addEventListener("mouseup", releasedHandler);
    fields.push(field);
  }
  startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startGame);
}

function pressedHandler(event) {
  if (usersTurn) {
    let id = event.target.id;
    let fieldIndex = parseInt(id[5]) - 1;

    fields[fieldIndex].style.backgroundColor = activeColors[fieldIndex];
  }
}

function releasedHandler(event) {
  if (usersTurn) {
    let id = event.target.id;
    let fieldIndex = parseInt(id[5]) - 1;

    fields[fieldIndex].style.backgroundColor = inactiveColors[fieldIndex];

    userColors.push(fieldIndex);
    let lastIndex = userColors.length - 1;
    if (colors[lastIndex] !== userColors[lastIndex]) {
      loseGame();
    } else if (colors.length === userColors.length) {
      usersTurn = false;
      points++;
      displayScore();
      setTimeout(nextRound, 1000);
      // nextRound();
    }
  }
}

function clickHandler(event) {
  if (usersTurn) {
    let id = event.target.id;
    let fieldIndex = parseInt(id[5]) - 1;
    userColors.push(fieldIndex);
    let lastIndex = userColors.length - 1;
    if (colors[lastIndex] !== userColors[lastIndex]) {
      loseGame();
    } else if (colors.length === userColors.length) {
      usersTurn = false;
      nextRound();
    }
  }
}

function nextRound() {
  userColors = [];
  colors.push(selectRandomValue());
  playColors(0);
}

function selectRandomValue() {
  let randomValue = Math.floor(Math.random() * 4);
  return randomValue;
}

function startGame() {
  if (!gameIsRunning) {
    gameIsRunning = true;
    points = 0;
    colors = [];
    userColors = [];
    colors.push(selectRandomValue());
    playColors(0);
    displayScore();
  }
}

function displayScore() {
  startButton.innerHTML = points + " Points";
}

function loseGame() {
  gameIsRunning = false;
  startButton.innerHTML = "Start the Game";
  alert("GAME OVER");
}

function playColors(index) {
  let fieldIndex = colors[index];
  fields[fieldIndex].style.backgroundColor = activeColors[fieldIndex];
  setTimeout(function () {
    resetColor(index);
    if (colors.length > index + 1) {
      setTimeout(function () {
        playColors(index + 1);
      }, 300);
    } else {
      usersTurn = true;
    }
  }, 1000);
}

function resetColor(index) {
  let fieldIndex = colors[index];
  fields[fieldIndex].style.backgroundColor = inactiveColors[fieldIndex];
}

window.addEventListener("load", loadHandler);
