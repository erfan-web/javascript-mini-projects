// Stopwatch
let stopwatchInterval;
let elapsedSeconds = 0;

const display = document.getElementById("display");
document.getElementById("start").onclick = () => {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    elapsedSeconds++;
    display.textContent = formatTime(elapsedSeconds);
  }, 1000);
};
document.getElementById("pause").onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
};
document.getElementById("reset").onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  elapsedSeconds = 0;
  display.textContent = "00:00:00";
};

function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}
