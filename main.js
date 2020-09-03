var input = document.getElementById("search");
var button = document.getElementById("icon");

button.addEventListener("click", async function search() {
  try {
    console.log(input.value);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=a5f4b0fe9b2866e4571b89879fd57c60`
    );
    const data = await response.json();
    console.log(data);
    const secondResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&
    exclude=hourly,daily&appid=a5f4b0fe9b2866e4571b89879fd57c60`);
    const data2 = await secondResponse.json();
    console.log(data2);
  } catch (error) {
    console.error(error);
  }
});
