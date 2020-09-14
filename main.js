let time = document.getElementById("currentTime");
let gridBox = document.getElementById("grid");
let forecast = document.getElementById("forecast");
var input = document.getElementById("search");
var button = document.getElementById("icon");
let locationName = document.getElementById("location-name");
let temparature = document.getElementById("temp");
let weather = document.getElementById("weather");
let image = document.getElementById("img");
let windSpeed = document.getElementById("windspeed");
let humidity = document.getElementById("humidity");
let placeTime = document.getElementById("time");
let foreCastImage = document.getElementById("forecastImg");
let daily = document.getElementById("daily");
let forecastTemp = document.getElementById("forecast-temp");
let result = document.getElementById("result");

let forecastData = async (lat, lon) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${await lat}&lon=${await lon}&
  exclude=hourly,daily&appid=a5f4b0fe9b2866e4571b89879fd57c60`);
    let dataForecast = await response.json();
    return dataForecast;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentDate = () => {
  const currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "Februaury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var day = days[currentDate.getDay()];
  var date = currentDate.getDate();
  var month = months[currentDate.getMonth()];
  var year = currentDate.getFullYear();
  var fullDate = day + " " + date + " " + month + " " + year;
  time.innerHTML = fullDate;
};

const formatter = (datetime) => {
  let date = new Date(datetime * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }

  return day + " " + "at" + " " + hours + ":" + minutes;
};

const getSingleDay = (fullTime) => {
  let date = new Date(fullTime * 1000);
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
};

const converter = (temp) => {
  return Math.floor(temp - 273.15);
};

const hide = () => {
  let result = document.getElementById("result");
  result.style.display = "none";
};

const deleteElements = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const deno = document.querySelector(element);
    if (deno) {
      deno.remove();
    }
  }
};

const createForecastCard = (arr) => {
  deleteElements([
    ".days",
    ".upper",
    ".day-name",
    ".icon-name",
    ".temparature",
    ".lower",
    ".cen",
    ".cen2",
    ".cen3",
    "#forecast",
  ]);
  forecast = document.createElement("div");
  forecast.id = "forecast";
  result.append(forecast);
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (i < 5) {
      let forecastCard = document.createElement("div");
      forecastCard.classList.add("days");
      forecast.append(forecastCard);
      let upperDiv = document.createElement("div");
      upperDiv.classList.add("upper");
      forecastCard.append(upperDiv);
      let dayName = document.createElement("h1");
      dayName.classList.add("day-name");
      let icon = document.createElement("img");
      icon.classList.add("icon-name");
      let temparature = document.createElement("h1");
      temparature.classList.add("temparature");
      temparature.innerHTML = converter(element.temp.max) + "°C";
      dayName.innerHTML = getSingleDay(element.dt);
      icon.src = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;
      upperDiv.append(dayName);
      upperDiv.append(temparature);
      upperDiv.append(icon);

      let lowerDiv = document.createElement("div");
      lowerDiv.classList.add("lower");
      forecastCard.append(lowerDiv);

      let cen = document.createElement("div");
      cen.classList.add("cen");
      lowerDiv.appendChild(cen);

      let cen2 = document.createElement("div");
      cen2.classList.add("cen2");
      lowerDiv.append(cen2);

      let cen3 = document.createElement("div");
      cen3.classList.add("cen3");
      lowerDiv.append(cen3);

      let humidity = document.createElement("h5");
      let humidityValue = document.createElement("small");
      humidity.innerHTML = "Humidity";
      humidityValue.innerHTML = element.humidity + " " + "%";
      cen.append(humidity);
      cen.append(humidityValue);

      let windSpeed = document.createElement("h5");
      let windSpeedValue = document.createElement("small");
      windSpeed.innerHTML = "Wind Speed";
      windSpeedValue.innerHTML = element.wind_speed + " " + "Km/h";
      cen3.append(windSpeed);
      cen3.append(windSpeedValue);

      let uvi = document.createElement("h5");
      let uviValue = document.createElement("small");
      uvi.innerHTML = "UVI";
      uviValue.innerHTML = Math.floor(element.uvi);
      cen2.append(uvi);
      cen2.append(uviValue);
    }
  }
};

const fetchCities = async () => {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=a5f4b0fe9b2866e4571b89879fd57c60",
      { origin: "cors" }
    );
    const data = await response.json();

    for (let i = 0; i < data.list.length; i++) {
      let element = data.list[i];
      let card = document.createElement("div");
      card.classList.add("single", "text-center", "m-2");
      gridBox.append(card);
      let location = document.createElement("h1");
      let currentDate = document.createElement("p");
      let icon = document.createElement("img");
      let temparature = document.createElement("h1");
      let desc = document.createElement("p");
      desc.innerHTML = element.weather[0].main;
      temparature.innerHTML = Math.floor(element.main.temp) + "°C";
      icon.src = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;
      currentDate.innerHTML = formatter(element.dt);
      location.innerHTML = element.name;
      card.append(location);
      card.append(currentDate);
      card.append(icon);
      card.append(temparature);
      card.append(desc);
    }
  } catch (error) {
    console.error(error);
  }
};

window.onload = function setUpEvents() {
  getCurrentDate();
  hide();
  fetchCities();

  button.addEventListener("click", async function search() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=a5f4b0fe9b2866e4571b89879fd57c60`
      );
      const data = await response.json();
      gridBox.style.display = "none";
      locationName.innerHTML = data.name;
      const realTemp = converter(data.main.temp);
      temparature.innerHTML = realTemp + "°C";
      weather.innerHTML = data.weather[0].main;
      windSpeed.innerHTML = data.wind.speed + "km/h";
      humidity.innerHTML = data.main.humidity + "%";
      placeTime.innerHTML = formatter(data.dt);
      image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      result.style.display = "grid";

      let data2 = forecastData(data.coord.lat, data.coord.lon);
      const weeklyData = await data2;

      createForecastCard(weeklyData.daily);
    } catch (error) {
      console.error(error);
    }
  });
};
