var input = document.getElementById("search");
var button = document.getElementById("icon");
const locationName = document.getElementById("location-name");
const temparature = document.getElementById("temp");
const weather = document.getElementById("weather");
const converter = (temp) => {
  return Math.floor(temp - 273.15);
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
    console.log(data);
    const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&
    exclude=hourly,daily&appid=a5f4b0fe9b2866e4571b89879fd57c60`);
    const data2 = await secondResponse.json();
    console.log(data2);
  } catch (error) {
    console.error(error);
  }
});
