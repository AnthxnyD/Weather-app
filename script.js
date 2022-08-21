// RECUPERATION DES ELEMENT NECESSAIRE FROM DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const container = document.querySelector('#main');
const previsions = document.querySelector('#previsions');

const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');

const form = document.querySelector('#locationInput');
const cities = document.querySelector('.cities');
const search = document.querySelector('#search');
const btn = document.querySelector('#submit');
const botDays = document.querySelector("#bot__days");

const API_UNSPLASH = "hCdgy8UiwcLDCFyKl4gT3PCnFg9BzDLoSkxjOwcVASw";
const API_WEATHER = '6b24e6eac2dc1d582b72109e295efed5';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]


async function weatherCall(city) {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_WEATHER}`);
    const data = await response.json();
    console.log(data)
    humidityOutput.innerText = data.list[0].main.humidity + "%";
    cloudOutput.innerText = data.list[0].clouds.all + "%";
    windOutput.innerText = data.list[0].wind.speed + "km/h";
    temp.innerText = Math.floor(data.list[0].main.temp) + "°c";
    nameOutput.innerText = city;
    const time = new Date();
    const day = time.getDay();
    const mois = time.getMonth();
    const minutes = (time.getUTCMinutes() < 10 ? '0' : '') + time.getUTCMinutes()
    const heures = time.getUTCHours() + 2;
    timeOutput.innerText = heures + ":" + minutes;
    console.log(data.list[0].weather);
    conditionOutput.innerText = data.list[0].weather[0].description;
    const image = data.list[0].weather[0].icon;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${image}@2x.png`)


    const arr = [data.list[32], data.list[24], data.list[16], data.list[8]]

    while (previsions.firstChild) {
        previsions.removeChild(previsions.lastChild);
    }
    arr.map(e => {

        const tempValue = Math.floor(e.main.temp) + "°c";
        const datetime = new Date(e.dt * 1000);
        const day = datetime.getDay();
        const dayinday = datetime.getDate();
        const mois = datetime.getMonth();
        const imageweek = document.createElement('img');
        const image = e.weather[0].icon;
        imageweek.setAttribute('src', `http://openweathermap.org/img/wn/${image}@2x.png`)

        const newDiv = document.createElement('div');
        const date = document.createElement('div');
        date.classList.add('card-date');
        date.innerText = `${days[day]} ${months[mois]} ${dayinday}`
        const cardTemp = document.createElement('div');
        cardTemp.innerText = tempValue;
        cardTemp.classList.add('card-temp');

        console.log(container);
        newDiv.append(imageweek)
        newDiv.append(date);
        newDiv.append(cardTemp);
        previsions.prepend(newDiv);
    })

}

function addCity(city) {
    let cityadd;
    const li = document.createElement('li');
    li.classList.add('city');
    li.innerText = city;
    li.addEventListener('click', () => {
        weatherCall(city);
    })

    if (window.localStorage.getItem('cities')) {
        cityadd = window.localStorage.getItem('cities');
        let tablecities = JSON.parse(cityadd);
        if (!tablecities.find(e => e == city)) {
            tablecities.push(city);
            window.localStorage.setItem('cities', JSON.stringify(tablecities));
            cities.append(li);
        };
    } else {
        cityadd = [];
        cityadd.push(city);
        window.localStorage.setItem('cities', JSON.stringify(cityadd));
        cities.append(li);
    }
}

function loadCities() {
    if (window.localStorage.getItem('cities')) {
        const cityadd = JSON.parse(window.localStorage.getItem('cities'));
        cityadd.map(e => {
            const li = document.createElement('li');
            li.classList.add('city');
            li.innerText = e;
            li.addEventListener('click', () => {
                weatherCall(e);
            })
            cities.append(li);
        })
    }

}

btn.addEventListener('click', () => {
    const city = search.value != "" ? search.value : "Brussels";
    weatherCall(city);
    addCity(city);
});

search.addEventListener('keyup', (e) => {
    switch (e.key) {
        case e.key == "Enter": {
            const city = search.value != "" ? search.value : "Brussels";
            weatherCall(city);
            addCity(city);
            break;
        }
    }
})

// weatherCall()
loadCities();