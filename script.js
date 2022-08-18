const currentCity = document.getElementById("currentCity");
const currentWeather = document.getElementById("currentWeather");
const botDays = document.getElementById("bot__days");

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = "f013d08632f75fab5f3d3211add116f0";

      // CURRENT WEATHER WORK
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      fetch(currentWeatherUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const currentCityName = data.name;
          const currentCityTemp = data.main.temp;

          currentCity.textContent = currentCityName;
          currentWeather.textContent = Math.round(currentCityTemp) + "°C";
        });

      // CURRENT WEATHER WORK
      const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
      fetch(forecastWeatherUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let dateList = data.list.map((date) => {
            date.dt_txt = `${date.dt_txt.split(" ")[0]} 12:00:00`;
            return date;
          });

          let uniqueDateObjects = [];
          let uniqueDateKeys = [];
          for (const d of dateList) {
            if (!uniqueDateKeys.includes(d.dt_txt)) {
              uniqueDateObjects.push(d);
              uniqueDateKeys.push(d.dt_txt);
            }
          }

          for (const item of uniqueDateObjects) {
            const newDivDayContent = document.createElement("div");
            newDivDayContent.classList.add("day__content");
            botDays.appendChild(newDivDayContent);

            const newPDayDate = document.createElement("p");
            newPDayDate.classList.add("day__date");
            const newPDayWeather = document.createElement("p");
            newPDayWeather.classList.add("day__weather");
            newDivDayContent.appendChild(newPDayDate);
            newDivDayContent.appendChild(newPDayWeather);

            let currentDate = new Date(item.dt_txt);
            let formatDate = `${currentDate.getDate()}/${
              currentDate.getMonth() + 1
            }`;
            newPDayDate.innerText = formatDate;
            newPDayWeather.innerText = Math.round(item.main.temp) + "°C";
          }
        });
    });
  }
});

// Modal Window
const modal = document.getElementById("modalWindow");
const butSearch = document.getElementById("butSearch");
let showModal = false;
butSearch.addEventListener("click", (e) => {
  showModal = !showModal;
  if (showModal) {
    modal.style.bottom = "0px";
  } else {
    modal.style.bottom = "-350px";
  }
});

// USER INPUT SUBMIT CITY
const butSubmit = document.getElementById("butSubmit");
const inputSearch = document.getElementById("inputSearch");
butSubmit.addEventListener("click", (e) => {
  const inputCity = inputSearch.value;

  //Current Weather by user input
  const inputLocation = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=f013d08632f75fab5f3d3211add116f0`;
  fetch(inputLocation)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const currentCityName = data.name;
      const currentCityTemp = data.main.temp;

      currentCity.textContent = currentCityName;
      currentWeather.textContent = Math.round(currentCityTemp - 273.15) + "°";
    });
});

// USER INPUT SEARCH CITY
// let cities = [];
// const citiesList = document.getElementById("citiesList");

// inputSearch.addEventListener("input", (e) => {
//   let inputValue = inputSearch.value;

//   const inputName = `https://api.teleport.org/api/cities/?search=${inputValue}`;
//   fetch(inputName)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       cities = data._embedded["city:search-results"];
//       cities.sort();
//     });
// });