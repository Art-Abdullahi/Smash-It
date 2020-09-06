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

const converter = (temp) => {
  return Math.floor(temp - 273.15);
};

const hide = () => {
  let result = document.getElementById("result");
  result.style.display = "none";
};

window.onload = function setUpEvents() {
  hide();
  var input = document.getElementById("search");
  var button = document.getElementById("icon");
  let locationName = document.getElementById("location-name");
  let temparature = document.getElementById("temp");
  let weather = document.getElementById("weather");
  let image = document.getElementById("img");
  let windSpeed = document.getElementById("windspeed");
  let humidity = document.getElementById("humidity");
  let time = document.getElementById("time");
  let gridBox = document.getElementById("grid");

  button.addEventListener("click", async function search() {
    try {
      console.log(input.value);
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
      time.innerHTML = formatter(data.dt);
      image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      result.style.display = "grid";
      console.log(data);

      const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&
      exclude=hourly,daily&appid=a5f4b0fe9b2866e4571b89879fd57c60`);
      const data2 = await secondResponse.json();
      console.log(data2);
      for (let i = 0; i < data2.daily.length; i++) {
        const element = data2.daily[i];
        console.log(element);
      }
    } catch (error) {
      console.error(error);
    }
  });
};
