
import { weatherIcons } from "./assets/js/weatherIcons.js"

// API Key
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

// Dom Elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorMsg = document.getElementById("errorMsg");

// Event Listners
const searchWeather = () => {
  const city = cityInput.value;
  if (!city.trim()) {
    showError("Please enter a city name!");
    return;
  }
  getWeather(city);
}
searchBtn.addEventListener("click", searchWeather);
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchWeather()
})

// fetch Data
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IR&appid=${apiKey}&units=metric&lang=en`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("City not found. Try again!");
    }
    const data = await res.json();
    showWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

// Render
function showWeather(data) {
  errorMsg.classList.add("hidden");
  weatherResult.classList.remove("hidden");

  const { name, main, weather, wind } = data;

  // img path
  const iconCode = weather[0].icon;
  const iconFilename = weatherIcons[iconCode] || weatherIcons["default"]
  const iconPath = `assets/images/v2/${iconFilename}`;


  weatherResult.innerHTML = `
    <h2>${name}, Iran</h2>
    <div class="weather-card">
      <div class="weather-content">
        <img src="${iconPath}" alt="${weather[0].description}" />
        <div class="temp-container">
            <div class="temp-num">${Math.floor(main.temp)}</div>
            <div class="C-circle">°C</div>
        </div>
      </div>
        <div class="weather-details">
            <p> Humidity: ${main.humidity}%</p>
            <p> Wind: ${wind.speed} m/s</p>
        </div>
    </div>
  `;
}

function showError(message) {
  weatherResult.classList.add("hidden");
  errorMsg.classList.remove("hidden");
  errorMsg.textContent = message;
}