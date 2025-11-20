



// Forecast today, tomorrow, and day after tomorrow forecast in the home page index


const apiKey = '2fca515f35a96678f2eca2aafa881bc1';
const lat = 40.3147;
const lon = -112.0069;

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
  .then(response => response.json())
  .then(data => {
    const forecastDiv = document.getElementById('forecast');
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyData.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const temp = Math.round(day.main.temp);
      const desc = day.weather[0].description;
      const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

      forecastDiv.innerHTML += `
        <div class="day">
          <h4>${date}</h4>
          <img src="${icon}" alt="${desc}">
          <p>${desc}</p>
          <p><strong>${temp}°F</strong></p>
        </div>
      `;
    });
  });
