var typeCityEl = document.querySelector(".inputValue");
var dContainer = document.querySelector("#daily-container")
var formEl = document.querySelector("#form");
var btnEl = document.querySelector(".btn");
var cityName = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var minValues = document.querySelector(".minValues");
var maxValues = document.querySelector(".maxValues");
var currDate = "";
var hour="";

currDate=(new Date());
//hour= dayjs().hour();
//console.log(hour);
console.log(currDate);

btnEl.addEventListener("click", function (event) {
    event.preventDefault();
    var api = "http://api.openweathermap.org/data/2.5/weather?q=" + typeCityEl.value + "&appid=51007bcd6af627372cf7b54eb1273ace&units=imperial";
    fetch(api)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var nameInfo = data["name"];
        var tempInfo = data["main"]["temp"];
        var descInfo = data["weather"][0]["description"];
        cityName.innerHTML = nameInfo;
        temp.innerHTML = tempInfo;
        desc.innerHTML = descInfo;

    })
    var apiFive = "http://api.openweathermap.org/data/2.5/forecast?q=" + typeCityEl.value + "&appid=51007bcd6af627372cf7b54eb1273ace&units=imperial";
    fetch(apiFive)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (i=0; i<5;i++){ 
            var parentEl = document.getElementById('day' + (i + 1));
            var minEl =  parentEl.querySelector(".minValues");
            var maxEl =  parentEl.querySelector(".maxValues");
            var windEl = parentEl.querySelector(".wind");
            var humidEl = parentEl.querySelector(".humid");
            var iconEl = parentEl.querySelector(".imgClass")
            var list = data.list[i];
            var main = list.main;
            console.log(parentEl);
            minEl.textContent = "Min. Temp. : " + main.temp_min + " F";
            maxEl.textContent = "Max. Temp. : " + main.temp_max + " F";
            windEl.textContent = "Wind: " + list.wind.speed + " /mph.";
            humidEl.textContent = "Humidity: " + main.humidity;
            iconEl.src="http://openweathermap.org/img/wn/" + list.weather[0].icon +  ".png";
        }
     
    })

    //.catch(error => alert("wrong city name"))
})
