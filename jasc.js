let loc = document.getElementById("location");
let tempIcon = document.getElementById("weather-icon");
let tempValue = document.getElementById("temperature-degree");
let climate = document.getElementById("temperature-description");
let iconFile;
let degreeSpan = document.querySelector(".degree-section span");
// console.log(loc, tempIcon, tempValue, climate)
window.addEventListener('load', () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // console.log(lat,long);
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1a30f089ccc08e40204fc421d9fa87e4`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { name } = data;
          const { feels_like } = data.main;
          const { id, main, icon } = data.weather[0];
          celsius = Math.floor(feels_like - 273);
          fahrenheit = Math.floor((celsius * (9 / 5)) + 32);
          loc.innerText = name;

          climate.innerText = main;
          tempValue.innerText = `${celsius}°`;

          tempIcon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

          tempValue.addEventListener("click", () => {
            // console.log(degreeSpan.innerText)
            if (degreeSpan.innerText === "C") {
              degreeSpan.innerText = "F"
              tempValue.innerText = `${fahrenheit}°`;
            }
            else {
              degreeSpan.innerText = "C"
              tempValue.innerText = `${celsius}°`;


            }
          })
          // console.log(degreeSpan.innerText==="C");
        })
    })
  }

});

// http://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&appid=1a30f089ccc08e40204fc421d9fa87e4