const apiKey = "f16d736a4b3960e89306b91239f6812e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDisplay = document.querySelector(".weather");
const error = document.querySelector(".error");

async function weatherUpdate(city){
    try {
        
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        let data = await response.json();
        if(response.status !== 200){
            error.innerHTML = "Invalid City Name";
            error.style.display = "block";
            weatherDisplay.style.display = "none";
            searchBox.value = "";
        }else{
            // console.log(data);
            error.style.display = "none";
            document.querySelector(".city-name").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            let weatherImg = data.weather[0].main;

            switch (weatherImg){
                case "Clouds" : weatherIcon.src = "images/clouds.png";
                break;
                case "Clear" : weatherIcon.src = "images/clear.png";
                break;
                case "Rain" : weatherIcon.src = "images/rain.png";
                break;
                case "Drizzle" : weatherIcon.src = "images/drizzle.png";
                break;
                case "Mist" : weatherIcon.src = "images/mist.png";
                break;
                case "Snow" : weatherIcon.src = "images/snow.png";
                break;
            }
            weatherDisplay.style.display = "block";
        }

        
    } catch (error) {
        alert("Something went wrong");
    }
}
 // for enter key to search

searchBox.addEventListener('keypress', function(event){
    searchBox.value == ""
    if(event.key === 'Enter'){
        event.preventDefault();
        searchBtn.click();
    }
})

function weatherFind (){
    if(searchBox.value == ""){
        error.innerHTML = "Please Enter a city name";
        error.style.display = "block";
        weatherDisplay.style.display = "none";
    }else{
     weatherUpdate(searchBox.value);
    }
}



