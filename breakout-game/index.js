const canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d");

// Ball
let ballRadius = 9,
  ballX = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
  ballY = canvas.height - 40,
  dx = 2,
  dy = -2;

// Paddle
const paddleHeight = 12,
  paddleWidth = 72;
let paddleX = (canvas.width - paddleWidth) / 2,
  paddleY = canvas.height - paddleHeight;

// Bricks
const rowCount = 5,
  columnCount = 9,
  bricksWidth = 54,
  bricksHeight = 18,
  bricksGap = 12,
  bricksTop = 40,
  bricksLeft = 33;

let bricks = [];

for (let c = 0; c < columnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < rowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// score
let score = 0,
  scoreFont = "bold 16px sans-serif",
  scoreX = 8,
  scoreY = 24;

/* ----------- functions ----------- */
function drawScore() {
  ctx.font = scoreFont;
  ctx.fillStyle = "#333";
  ctx.fillText(`Score : ${score}`, scoreX, scoreY);
}

function drawPaddle() {
  ctx.beginPath();
  ctx.roundRect(paddleX, paddleY, paddleWidth, paddleHeight, 30);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < columnCount; c++) {
    for (let r = 0; r < rowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        b.x = c * (bricksWidth + bricksGap) + bricksLeft;
        b.y = r * (bricksHeight + bricksGap) + bricksTop;

        ctx.beginPath();
        ctx.roundRect(b.x, b.y, bricksWidth, bricksHeight, 30);
        ctx.fillStyle = "#333";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Handle Paddle
document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  // console.log("clientX",e.clientX)
  // console.log("relativeX",relativeX)
  // console.log("width",canvas.width)
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
    console.log("paddle",paddleX)
  }
}

function hitDetection() {
  for (let c = 0; c < columnCount; c++) {
    for (let r = 0; r < rowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          ballX > b.x &&
          ballX < b.x + bricksWidth &&
          ballY > b.y &&
          ballY < b.y + bricksHeight
        ) {
          b.status = 0;
          score++;
          dy = -dy;

          checkWin();
        }
      }
    }
  }
}

function GameInit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawScore();
  drawPaddle();
  drawBall();
  drawBricks();
  hitDetection();

  if (ballX + dx < ballRadius || ballX + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height - ballRadius) {
    if (ballX + dx > paddleX && ballX + dx < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      location.reload();
      alert("Game Over!");
    }
  }
  //  Move ball
  ballX += dx;
  ballY += dy;
}
setInterval(GameInit, 10);

function checkWin() {
  if (score === rowCount * columnCount) {
    alert("You Win!");
    location.reload();
  }
}

