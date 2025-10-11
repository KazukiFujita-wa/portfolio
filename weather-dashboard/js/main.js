const apiKey = "YOUR_API_KEY"; // OpenWeatherMapのAPIキーをここに記載
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("都市名を入力してください。");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`
    );

    if (!res.ok) throw new Error("都市が見つかりません。");

    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  }
});

function displayWeather(data) {
  errorMessage.classList.add("hidden");
  weatherResult.classList.remove("hidden");

  document.getElementById("cityName").textContent = data.name;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("temp").textContent = Math.round(data.main.temp);
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = data.wind.speed;

  const iconCode = data.weather[0].icon;
  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showError(msg) {
  weatherResult.classList.add("hidden");
  errorMessage.textContent = msg;
  errorMessage.classList.remove("hidden");
}
