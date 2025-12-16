import { API_Key } from "./environment.js";

const currentUserLocationTemp = document.getElementById("currentUserLocationTemp");
const currentUserLocationHighsLowsText = document.getElementById("currentUserLocationHighsLowsText");
const currentWeatherIMG = document.getElementById("currentWeatherIMG");
const currentLocationText = document.getElementById("currentLocationText");
const forecastDay1HighTemp = document.getElementById("forecastDay1HighTemp");
const forecastDay1LowTemp = document.getElementById("forecastDay1LowTemp");
const forecastDay2HighTemp = document.getElementById("forecastDay2HighTemp");
const forecastDay2LowTemp = document.getElementById("forecastDay2LowTemp");
const forecastDay3HighTemp = document.getElementById("forecastDay3HighTemp");
const forecastDay3LowTemp = document.getElementById("forecastDay3LowTemp");
const forecastDay4HighTemp = document.getElementById("forecastDay4HighTemp");
const forecastDay4LowTemp = document.getElementById("forecastDay4LowTemp");
const forecastDay5HighTemp = document.getElementById("forecastDay5HighTemp");
const forecastDay5LowTemp = document.getElementById("forecastDay5LowTemp");
const output = document.getElementById("output");
const favoriteCitiesDiv = document.getElementById("favoriteCitiesDiv");
const addIcon = document.getElementById("addIcon");
const removeIcon = document.getElementById("removeIcon");
let latitude;
let longitude;

const fetchCurrentLocationWeatherData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9575&lon=121.2925&appid=${API_Key}&units=imperial`) //For Stockton, CA lat long coords w/ imperial units
    const data = await response.json();
    console.log(`Current Temperature from API: ${Math.floor(data.main.temp)} Fahrenheit`) //12-15-25
    console.log(`Current Max temp from API: ${Math.floor(data.main.temp_max)} Fahrenheit`) //12-15-25
    console.log(`Current Min temp from API: ${Math.floor(data.main.temp_min)} Fahrenheit`) //12-15-25
    return data;
};
fetchCurrentLocationWeatherData();

const fetchForecastJSONData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=37.9575&lon=121.2925&appid=${API_Key}&units=imperial`); //For Stockton, CA lat long coords w/ imperial units
    const data = await response.json();
    // 1st Day forecast (12-16-25 00:00:00)\\
    console.log(`First Day Max Temp: ${Math.floor(data.list[0].main.temp_max)} Fahrenheit`)
    console.log(`First Day Min Temp: ${Math.floor(data.list[0].main.temp_min)} Fahrenheit`)
    // End of 1st Day forecast (12-16-25 00:00:00)\\

    // 2nd Day forecast (12-17-25 00:00:00)\\
    console.log(`Second Day Max Temp: ${Math.floor(data.list[8].main.temp_max)} Fahrenheit`)
    console.log(`Second Day Min Temp: ${Math.floor(data.list[8].main.temp_min)} Fahrenheit`)
    // End of 2nd Day forecast (12-17-25 00:00:00)\\

    // 3rd Day forecast (12-18-25 00:00:00)\\
    console.log(`Third Day Max Temp: ${Math.floor(data.list[16].main.temp_max)} Fahrenheit`)
    console.log(`Third Day Min Temp: ${Math.floor(data.list[16].main.temp_min)} Fahrenheit`)
    // End of 3rd Day forecast (12-19-25 00:00:00)\\

    // 4th Day forecast (12-19-25 00:00:00)\\
    console.log(`Fourth Day Max Temp: ${Math.floor(data.list[24].main.temp_max)} Fahrenheit`)
    console.log(`Fourth Day Min Temp: ${Math.floor(data.list[24].main.temp_min)} Fahrenheit`)
    // End of 4th Day forecast (12-19-25 00:00:00)\\

    // 5th Day forecast (12-20-25 00:00:00)\\
    console.log(`Fifth Day Max Temp: ${Math.floor(data.list[32].main.temp_max)} Fahrenheit`)
    console.log(`Fifth Day Min Temp: ${Math.floor(data.list[32].main.temp_min)} Fahrenheit`)
    // End of 5th Day forecast (12-20-25 00:00:00)\\
    return data;
};
fetchForecastJSONData();

addIcon.addEventListener("click", () => {

});

removeIcon.addEventListener("click", () => {

});

window.addEventListener("DOMContentLoaded", () => {
    getUserLocation();
});

const getUserLocation = () => {
    if (!navigator.geolocation) {
        output.textContent = "Geolocation is not supported by your browser.";
        return;
    }

    output.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            console.log(`Latitude: ${Math.floor(latitude)}, Longitude: ${Math.floor(longitude)}`);
            output.textContent = `Lat: ${Math.floor(latitude)}, Long: ${Math.floor(longitude)}`;
        },

        // Error callback
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    output.textContent = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    output.textContent = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    output.textContent = "The request to get user location timed out.";
                    break;
                default:
                    output.textContent = "An unknown error occurred.";
            }
        }
    );
};

const displayCurrentLocationWeatherData = async () => {
    const fetchCurrentLocationWeatherJSONData = await fetchCurrentLocationWeatherData();
    currentUserLocationTemp.textContent = `${Math.floor(fetchCurrentLocationWeatherJSONData.main.temp)}°`;
    currentUserLocationHighsLowsText.textContent = `H: ${Math.floor(fetchCurrentLocationWeatherJSONData.main.temp_max)}° | L: ${Math.floor(fetchCurrentLocationWeatherJSONData.main.temp_min)}°`;

};
displayCurrentLocationWeatherData();

const displayForecastLocationWeatherData = async () => {
    const fetchForecastLocationWeatherJSONData = await fetchForecastJSONData();
    forecastDay1HighTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[0].main.temp_max)}°`;
    forecastDay1LowTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[0].main.temp_min)}°`;
    forecastDay2HighTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[8].main.temp_max)}°`;
    forecastDay2LowTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[8].main.temp_min)}°`;
    forecastDay3HighTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[16].main.temp_max)}°`;
    forecastDay3LowTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[16].main.temp_min)}°`;
    forecastDay4HighTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[24].main.temp_max)}°`;
    forecastDay4LowTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[24].main.temp_min)}°`;
    forecastDay5HighTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[32].main.temp_max)}°`;
    forecastDay5LowTemp.textContent = `${Math.floor(fetchForecastLocationWeatherJSONData.list[32].main.temp_min)}°`;
};
displayForecastLocationWeatherData();