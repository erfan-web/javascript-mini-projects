function updateAnalogClock() {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDeg = (hours + minutes/60) * 30; // 360/12 = 30
  const minuteDeg = (minutes + seconds/60) * 6; // 360/60 = 6
  const secondDeg = seconds * 6;

  document.getElementById("hour").style.transform = `rotateZ(${hourDeg}deg)`;
  document.getElementById("minute").style.transform = `rotateZ(${minuteDeg}deg)`;
  document.getElementById("second").style.transform = `rotateZ(${secondDeg}deg)`;
}

setInterval(updateAnalogClock, 1000);
updateAnalogClock();
