const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const errorMessage = document.getElementById("errorMessage");

const OPEN_CAGE_API_KEY = "28a953ed96b047719cd53e729b652f55"; // ← 自分のAPIキーをここに

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("都市名を入力してください。");
    return;
  }

  try {
    // ① 都市名から緯度経度を取得（OpenCage）
    const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${OPEN_CAGE_API_KEY}&language=ja&pretty=1`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("位置情報が見つかりません。");
    }

    const { lat, lng } = geoData.results[0].geometry;

    // ② 緯度経度から天気を取得（Open-Meteo）
    // 例：天気取得 URL に “jma” モデルオプションを入れる
    const weatherUrl = `https://api.open-meteo.com/v1/jma?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      throw new Error("天気情報を取得できません。");
    }

    displayWeather(city, weatherData);
  } catch (err) {
    showError(err.message);
  }
});

function displayWeather(city, data) {
  errorMessage.classList.add("hidden");
  weatherResult.classList.remove("hidden");

  const current = data.current;
  if (!current) {
    showError("天気データが見つかりません。");
    return;
  }

  document.getElementById("cityName").textContent = city;
  document.getElementById("temp").textContent = Math.round(current.temperature_2m);
  document.getElementById("wind").textContent = current.wind_speed_10m;
  document.getElementById("humidity").textContent = current.relative_humidity_2m;

  const iconUrl = getWeatherIcon(current.weather_code);
  document.getElementById("weatherIcon").src = iconUrl;
}

// 天気コード → アイコンURLを返却する
function getWeatherIcon(code) {
  if (code === 0) return "https://openweathermap.org/img/wn/01d@2x.png"; // 快晴
  if (code === 1) return "https://openweathermap.org/img/wn/02d@2x.png"; // 晴れ
  if (code === 2) return "https://openweathermap.org/img/wn/03d@2x.png"; // 曇りがち
  if (code === 3) return "https://openweathermap.org/img/wn/04d@2x.png"; // 曇り
  if (code >= 45 && code <= 48) return "https://openweathermap.org/img/wn/50d@2x.png"; // 霧
  if (code >= 51 && code <= 67) return "https://openweathermap.org/img/wn/09d@2x.png"; // 小雨〜雨
  if (code >= 71 && code <= 77) return "https://openweathermap.org/img/wn/13d@2x.png"; // 雪
  if (code >= 80 && code <= 82) return "https://openweathermap.org/img/wn/10d@2x.png"; // にわか雨
  if (code >= 85 && code <= 86) return "https://openweathermap.org/img/wn/13d@2x.png"; // にわか雪
  if (code >= 95 && code <= 99) return "https://openweathermap.org/img/wn/11d@2x.png"; // 雷雨
  return "https://openweathermap.org/img/wn/01d@2x.png"; // デフォルト晴れ
}

function showError(msg) {
  weatherResult.classList.add("hidden");
  errorMessage.textContent = msg;
  errorMessage.classList.remove("hidden");
}
