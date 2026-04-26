const h = document.getElementById("hour");
const m = document.getElementById("minute");
const s = document.getElementById("second");

function updateAnalogClock() {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDeg = (hours + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;
  //   const minuteDeg = minutes * 6;
  //   const hourDeg = hours * 30;

  s.style.transform = `rotateZ(${secondDeg}deg)`;
  m.style.transform = `rotateZ(${minuteDeg}deg)`;
  h.style.transform = `rotateZ(${hourDeg}deg)`;
}

setInterval(updateAnalogClock, 1000);
updateAnalogClock();
