const playBoard = document.querySelector(".play-board");
const scoreEl = document.querySelector(".score");
const recordEl = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");
let boardSize = 30;
let gameInterval;

let foodX, foodY;

let snakeX = 5,
  snakeY = 10;

let stepX = 0,
  stepY = 0;

let score = 0;
let record = localStorage.getItem("record") || 0;

scoreEl.innerText = `Score: ${score}`;
recordEl.innerText = `High Score: ${record}`;

let snakeBody = [];
function changeFoodPosition() {
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

controls.forEach((key) => {
  key.addEventListener("click", () =>
    changeDirection({ key: key.dataset.key }),
  );
});

const GameInit = () => {
  let htmlMarkUp = `
    <div
    class="food"
    style="grid-area:${foodY} / ${foodX}"
    ></div>
  `;
  snakeX += stepX;
  snakeY += stepY;

  // اگر مار به غذا رسید
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodY, foodX]);
    score++;
    scoreEl.innerText = `Score: ${score}`;
    record = score > record ? score : record;
    localStorage.setItem("record", record);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeY, snakeX];

  if (snakeX <= 0 || snakeX > boardSize || snakeY <= 0 || snakeY > boardSize) {
    gameOverHandle();
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (i !== 0 && snakeBody[i][0] == snakeY && snakeBody[i][1] == snakeX) {
      gameOverHandle();
    }
    htmlMarkUp += `
    <div
    class="snake"
    style="grid-area:${snakeBody[i][0]} / ${snakeBody[i][1]}"
    ></div>
  `;
  }
  playBoard.innerHTML = htmlMarkUp;
};
changeFoodPosition();
gameInterval = setInterval(GameInit, 125);
document.addEventListener("keydown", changeDirection);

function gameOverHandle() {
  clearInterval(gameInterval);
  recordEl.innerText = `high Score: ${record}`;
  alert("Game Over");
  location.reload();
}
