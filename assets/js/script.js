var typeCity= document.querySelector("#typeCity");
var dContainer = document.querySelector("#daily-container")

var getCityWeather = function(city){
    var weatherApi = "https://accuweatherstefan-skliarovv1.p.rapidapi.com/get24HoursConditionsByLocationKey";
    
    fetch(weatherApi)
    .then(function(outcome){
        if (outcome.ok){
            outcome.json().then(function(data){
                console.log("city weather",data);
                displayWeather();
            });
        }else{
            alert("Error " + outcome.statusText);
        }
    })
    .catch(function(error){
        alert("unable to reach server");
    });
};

var formEnter = function(event){
    event.preventDefault();
    var nameCity= typeCity.ariaValueMax.trim();
    if(nameCity){
        getCityWeather(nameCity);
        dContainer.textContent="";
        nameCity.value="";
    }  else{
        alert("enter valid city");
    }
};