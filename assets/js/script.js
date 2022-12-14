var typeCityEl = document.querySelector(".inputValue");
var dContainer = document.querySelector("#daily-container")
var formEl = document.querySelector("#form");
var btnEl = document.querySelector(".btn");
var cityName = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");
var minValues = document.querySelector(".minValues");
var maxValues = document.querySelector(".maxValues");
var dateEl = document.querySelector(".date");
var btnOldEl= document.querySelector(".btnOld");
var fiveDayEl= document.querySelector(".fiveDayTitle");
var currDate = "";
var nameInfo = "";
var tempInfo = "";
var descInfo = "";
var storedIn="";
var storedOut="";
var apiInfo = "";


//local storage output trial
storedOut = JSON.parse( localStorage.getItem("apiInfo")) || [];
btnOldEl.textContent = storedOut["cityName"];
btnOldEl.addEventListener("click",function(event){
    event.preventDefault();
        cityName.textContent = storedOut["cityName"];
        dateEl.textContent = "Last searched on "+ storedOut["dateEl"];
        temp.textContent =  storedOut["temp"] + " F";
        desc.textContent = storedOut["desc"];
        typeCityEl.value = storedOut["cityName"];
        btnEl.textContent = "Click For Current Weather";
})

currDate=(new Date().toDateString());
console.log(currDate);

btnEl.addEventListener("click", function (event) {
    
    event.preventDefault();
    
    var api = "https://api.openweathermap.org/data/2.5/weather?q=" + typeCityEl.value + "&appid=51007bcd6af627372cf7b54eb1273ace&units=imperial";
    fetch(api)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        nameInfo = data["name"];
        tempInfo = data["main"]["temp"];
        descInfo = data["weather"][0]["description"];
        fiveDayEl.textContent = "Five Day Forecast";
        cityName.textContent = nameInfo;
        temp.textContent = tempInfo + " F";
        desc.textContent = descInfo;
        dateEl.textContent=currDate;
        btnOldEl.textContent= nameInfo;
        //local storage input trial
         apiInfo = {
            btnOldEl : nameInfo,
            cityName : nameInfo,
            temp : tempInfo,
            desc : descInfo,
            dateEl : currDate,
        }
        storedIn = localStorage.setItem("apiInfo", JSON.stringify(apiInfo));
    })
    var apiFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + typeCityEl.value + "&appid=51007bcd6af627372cf7b54eb1273ace&units=imperial";
    fetch(apiFive)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (j=0;j<40;j++){
            if (j===8 || j===16 || j===24 || j===32 || j===40){
            for (i=0; i<5;i++){ 
                var parentEl = document.getElementById('day' + (i + 1));
                var minEl =  parentEl.querySelector(".minValues");
                var maxEl =  parentEl.querySelector(".maxValues");
                var windEl = parentEl.querySelector(".wind");
                var humidEl = parentEl.querySelector(".humid");
                var iconEl = parentEl.querySelector(".imgClass");
                var descriptionEl = parentEl.querySelector(".description");
                var list = data.list[i];
                var main = list.main;
                descriptionEl.textContent = list.weather[0].description;
                minEl.textContent = "Min. Temp. : " + main.temp_min + " F";
                maxEl.textContent = "Max. Temp. : " + main.temp_max + " F";
                windEl.textContent = "Wind: " + list.wind.speed + " /mph.";
                humidEl.textContent = "Humidity: " + main.humidity;
                iconEl.src="https://openweathermap.org/img/wn/" + list.weather[0].icon +  ".png";
                parentEl.style.backgroundColor = "gray";
            }
            }
        }
       
     
    })

    .catch(error => alert("wrong city name"))
})
