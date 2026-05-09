const playBoard = document.querySelector(".play__board"),
  boardSize = 30;
const scoreEl = document.querySelector(".score"),
  recordEl = document.querySelector(".record");

let snakeBody = [],
  gameInterval,
  snakeX = 5,
  snakeY = 10,
  stepX = 0,
  stepY = 0,
  foodX,
  foodY,
  score = 0,
  record = localStorage.getItem("record") || score;

function changeFoodPosition () {
  foodX = Math.floor(Math.random() * boardSize) + 1;
  foodY = Math.floor(Math.random() * boardSize) + 1;
}
function changeDirection(e) {
  if (e.key === "ArrowUp" && stepY !== 1) {
    stepX = 0;
    stepY = -1;
  } else if (e.key === "ArrowDown" && stepY !== -1) {
    stepX = 0;
    stepY = 1;
  } else if (e.key === "ArrowLeft" && stepX !== 1) {
    stepX = -1;
    stepY = 0;
  } else if (e.key === "ArrowRight" && stepX !== -1) {
    stepX = 1;
    stepY = 0;
  }
}
function handleGameOver() {
  clearInterval(gameInterval);
  if (!record || score > record) localStorage.setItem("record", score);
  location.reload();
  alert("Game Over!");
}
function GameInit() {
  let htmlMarkUp = `
        <div 
        class="food" 
        style="grid-area: ${foodY} / ${foodX}"
        ></div>
    `;

  snakeX += stepX;
  snakeY += stepY;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition ();
    snakeBody.push([foodX, foodY]);
    score++;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  if (snakeX <= 0 || snakeX > boardSize || snakeY <= 0 || snakeY > boardSize) {
    handleGameOver();
  }

  snakeBody.forEach((item, i) => {
    if (i > 1 && item[1] == snakeY && item[0] == snakeX) {
      handleGameOver();
    }
    htmlMarkUp += `
        <div 
        class="snake" 
        style="grid-area: ${item[1]} / ${item[0]}"
        ></div>
    `;
  });

  playBoard.innerHTML = htmlMarkUp;
  scoreEl.innerText = `Score: ${score}`;
  recordEl.innerText = `Record: ${record}`;
}
changeFoodPosition();
gameInterval = setInterval(GameInit, 125);
document.addEventListener("keydown", changeDirection);
