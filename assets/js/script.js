var typeCityEl = document.querySelector(".inputValue");
var dContainer = document.querySelector("#daily-container")
var formEl = document.querySelector("#form");
var btnEl = document.querySelector(".btn");
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");

btnEl.addEventListener("click", function (event) {
    event.preventDefault();
    var api = "http://api.openweathermap.org/data/2.5/weather?q=" + typeCityEl.value + "&appid=51007bcd6af627372cf7b54eb1273ace";
    fetch(api)
  
    .then(response => response.json())
    .then(data => console.log(data))

    //.catch(error => alert("wrong city name"))
})
