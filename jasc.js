let loc = document.getElementById("location");
let tempIcon = document.getElementById("weather-icon");
let tempValue = document.getElementById("temperature-degree");
let climate = document.getElementById("temperature-description");
let iconFile;

window.addEventListener('load', ()=> {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1a30f089ccc08e40204fc421d9fa87e4`;
            fetch(api)
              .then((response) => {
                  return response.json();
              })
              .then(data => {
                  const {name} = data;
                  const {feels_like} = data.main;
                  const {id, main} = data.weather[0];
                  loc.textContent = name;
                  climate.textContent = main;
                  tempValue.textContent = Math.round(feels_like-273);
                  if (id < 250) {
                      tempIcon.src = "./icons/storm.svg"
                  }
                  if (id < 350) {
                    tempIcon.src = "./icons/drizzle.svg"
                }
                  if (id < 550) {
                    tempIcon.src = "./icons/rain.svg"
                }
                  if (id < 650) {
                    tempIcon.src = "./icons/snow.svg"
                }
                  if (id < 800) {
                    tempIcon.src = "./icons/atmosphere.svg"
                }
                  if (id === 800) {
                    tempIcon.src = "./icons/clear.svg"
                }
                  if (id > 800) {
                    tempIcon.src = "./icons/clouds.svg"
                }

                  console.log(data);
              })
        })
    }

});

// http://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&appid=1a30f089ccc08e40204fc421d9fa87e4