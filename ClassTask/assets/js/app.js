let btn = document.getElementById('btn');
btn.addEventListener('click', function(e) {
  e.preventDefault();

  const input = document.getElementById('city-input');
  const city = input.value;
  const ApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
  const info = document.getElementById('card');


  fetch(ApiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
    
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true&timezone=Europe/London`)
          .then(response => response.json())
          .then(weatherData => {
            console.log(weatherData)
          
              info.innerHTML = `
                <div id="weather-info" class="animate__animated animate__fadeIn">
                  <h3 id="city-name">${data.results[0].name}</h3>
                  <p id="temperature">temperature: ${weatherData.current_weather.temperature}°C</p>
                  <p id="weather">weather: ${weatherData.current_weather.weathercode}</p>
                  <p id="wind-speed">wind speed: ${weatherData.current_weather.windspeed} km/h</p>
                </div>
              `;
            
          });
        }})});
