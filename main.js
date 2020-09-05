var input = document.getElementById("search");
var button = document.getElementById("icon");
let locationName = document.getElementById("location-name");
let temparature = document.getElementById("temp");
let weather = document.getElementById("weather");
let image = document.getElementById("img");
let windSpeed = document.getElementById("windspeed");
let humidity = document.getElementById("humidity");
let time = document.getElementById("time");
const converter = (temp) => {
  return Math.floor(temp - 273.15);
};

const formatter = (datetime) => {
  const date = new Date(datetime * 1000);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const day = date.getDay();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  time.innerHTML = days[day - 1] + " at " + hours + ":" + minutes;
};

button.addEventListener("click", async function search() {
  try {
    console.log(input.value);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=a5f4b0fe9b2866e4571b89879fd57c60`
    );
    const data = await response.json();
    locationName.innerHTML = data.name;
    const realTemp = converter(data.main.temp);
    temparature.innerHTML = realTemp + "°C";
    weather.innerHTML = data.weather[0].main;
    windSpeed.innerHTML = data.wind.speed + "km/h";
    humidity.innerHTML = data.main.humidity + "%";
    const time = formatter(data.dt);
    image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    console.log(data);
    const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&
    exclude=hourly,daily&appid=a5f4b0fe9b2866e4571b89879fd57c60`);
    const data2 = await secondResponse.json();
    console.log(data2);
  } catch (error) {
    console.error(error);
  }
});
