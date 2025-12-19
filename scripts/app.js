import { API_Key } from "./environment.js";
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "./localstorage.js";

const currentUserLocationTemp = document.getElementById("currentUserLocationTemp");
const currentUserLocationHighsLowsText = document.getElementById("currentUserLocationHighsLowsText");
const currentWeatherIcon = document.getElementById("currentWeatherIcon");
const forecastDay1WeatherIcon = document.getElementById("forecastDay1WeatherIcon");
const forecastDay2WeatherIcon = document.getElementById("forecastDay2WeatherIcon");
const forecastDay3WeatherIcon = document.getElementById("forecastDay3WeatherIcon");
const forecastDay4WeatherIcon = document.getElementById("forecastDay4WeatherIcon");
const forecastDay5WeatherIcon = document.getElementById("forecastDay5WeatherIcon");
const forecastDay1WeekAbbreviation = document.getElementById("forecastDay1WeekAbbreviation");
const forecastDay2WeekAbbreviation = document.getElementById("forecastDay2WeekAbbreviation");
const forecastDay3WeekAbbreviation = document.getElementById("forecastDay3WeekAbbreviation");
const forecastDay4WeekAbbreviation = document.getElementById("forecastDay4WeekAbbreviation");
const forecastDay5WeekAbbreviation = document.getElementById("forecastDay5WeekAbbreviation");
const currentLocationText = document.getElementById("currentLocationText");
const searchBar = document.getElementById("searchBar");
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
const favoriteCitiesDiv = document.getElementById("favoriteCitiesDiv");
const addIcon = document.getElementById("addIcon");
const currentDate = document.getElementById("currentDate");
const currentTime = document.getElementById("currentTime");

const fetchCurrentLocationWeatherData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9575&lon=121.2925&appid=${API_Key}&units=imperial`) //For Stockton, CA lat long coords w/ imperial units
    const data = await response.json();
    return data;
};
fetchCurrentLocationWeatherData();

const getWeatherAPIDataFromSearch = async () => {
    let userSearchEntry = searchBar.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userSearchEntry},{state code},{country code}&appid=${API_Key}&units=imperial`);
    const data = await response.json();
    // searchBar.value = "";
    return data;
};

const getWeatherForecastWeatherDataFromSearch = async () => {
    let userSearchedEntry = searchBar.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userSearchedEntry},{state code},{country code}&appid=${API_Key}&units=imperial`);
    const data = await response.json();
    // searchBar.value = "";
    return data;
};

const displaySearchedJSONData = async () => {
    const getWeatherAPIJSONDataFromSearch = await getWeatherAPIDataFromSearch();
    currentUserLocationTemp.textContent = `${Math.floor(getWeatherAPIJSONDataFromSearch.main.temp)}°`
    currentLocationText.textContent = `${getWeatherAPIJSONDataFromSearch.name},${getWeatherAPIJSONDataFromSearch.sys.country}`
    currentUserLocationHighsLowsText.textContent = `H: ${Math.floor(getWeatherAPIJSONDataFromSearch.main.temp_max)}° | L: ${Math.floor(getWeatherAPIJSONDataFromSearch.main.temp_min)}°`;
    console.log(getWeatherAPIJSONDataFromSearch);
    if (getWeatherAPIJSONDataFromSearch.weather[0].main === "Clear") {
        currentWeatherIcon.src = "../assets/sun.png"
    }
    else if (getWeatherAPIJSONDataFromSearch.weather[0].main === "Clouds") {
        currentWeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (getWeatherAPIJSONDataFromSearch.weather[0].main === "Rain") {
        currentWeatherIcon.src = "../assets/weather.png"
    }
    else {
        currentWeatherIcon.src = "../assets/sun.png"
    }
};

const displaySearchedJSONForecastData = async () => {
    const getWeatherForecastJSONDataFromSearch = await getWeatherForecastWeatherDataFromSearch();
    forecastDay1HighTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[0].main.temp_max)}°`;
    forecastDay1LowTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[0].main.temp_min)}°`;
    forecastDay2HighTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[8].main.temp_max)}°`;
    forecastDay2LowTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[8].main.temp_min)}°`;
    forecastDay3HighTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[16].main.temp_max)}°`;
    forecastDay3LowTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[16].main.temp_min)}°`;
    forecastDay4HighTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[24].main.temp_max)}°`;
    forecastDay4LowTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[24].main.temp_min)}°`;
    forecastDay5HighTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[32].main.temp_max)}°`;
    forecastDay5LowTemp.textContent = `${Math.floor(getWeatherForecastJSONDataFromSearch.list[32].main.temp_min)}°`;
    //For Forecast Day 1
    if (getWeatherForecastJSONDataFromSearch.list[0].weather[0].main === "Clear") {
        forecastDay1WeatherIcon.src = "../assets/sun.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[0].weather[0].main === "Clouds") {
        forecastDay1WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[0].weather[0].main === "Rain") {
        forecastDay1WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay1WeatherIcon.src = "../assets/sun.png"
    };

    //For Forecast Day 2
    if (getWeatherForecastJSONDataFromSearch.list[8].weather[0].main === "Clear") {
        forecastDay2WeatherIcon.src = "../assets/sun.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[8].weather[0].main === "Clouds") {
        forecastDay2WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[8].weather[0].main === "Rain") {
        forecastDay2WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay2WeatherIcon.src = "../assets/sun.png"
    };

    //For Forecast Day 3
    if (getWeatherForecastJSONDataFromSearch.list[16].weather[0].main === "Clear") {
        forecastDay3WeatherIcon.src = "../assets/sun.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[16].weather[0].main === "Clouds") {
        forecastDay3WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[16].weather[0].main === "Rain") {
        forecastDay3WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay3WeatherIcon.src = "../assets/sun.png"
    };

    //For Forecast Day 4
    if (getWeatherForecastJSONDataFromSearch.list[24].weather[0].main === "Clear") {
        forecastDay4WeatherIcon.src = "../assets/sun.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[24].weather[0].main === "Clouds") {
        forecastDay4WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[24].weather[0].main === "Rain") {
        forecastDay4WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay4WeatherIcon.src = "../assets/sun.png"
    };

    //For Forecast Day 5
    if (getWeatherForecastJSONDataFromSearch.list[32].weather[0].main === "Clear") {
        forecastDay5WeatherIcon.src = "../assets/sun.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[32].weather[0].main === "Clouds") {
        forecastDay5WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (getWeatherForecastJSONDataFromSearch.list[32].weather[0].main === "Rain") {
        forecastDay5WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay5WeatherIcon.src = "../assets/sun.png"
    };
};
displaySearchedJSONForecastData();
getWeatherAPIDataFromSearch();

searchBar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeatherAPIDataFromSearch();
        getWeatherForecastWeatherDataFromSearch();
        displaySearchedJSONData();
        displaySearchedJSONForecastData();
    }
});

const fetchForecastJSONData = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=37.9575&lon=121.2925&appid=${API_Key}&units=imperial`); //For Stockton, CA lat long coords w/ imperial units
    const data = await response.json();
    return data;
};
fetchForecastJSONData();

addIcon.addEventListener("click", () => {
    let cityEntry = searchBar.value;
    saveToLocalStorage(cityEntry);
    displayFavoriteCities();
});

favoriteCitiesDiv.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".removeIcon");
    if (!removeBtn) return;
    const cityToRemove = removeBtn.dataset.city;
    removeFromLocalStorage(cityToRemove);
    displayFavoriteCities();
    console.log("Firing");
});

const displayFavoriteCities = async () => {
    favoriteCitiesDiv.innerHTML = "";

    const fetchJSONSearchData = await getWeatherAPIDataFromSearch();
    console.log(fetchJSONSearchData);
    console.log(fetchJSONSearchData.name)
    console.log(Math.floor(fetchJSONSearchData.main.temp))
    const favoriteCities = getFromLocalStorage();

    favoriteCities.forEach((city) => {
        const p = document.createElement("p");
        p.classList.add("favoriteCitiesEntry");

        p.innerHTML = `<img class="removeIcon mx-3 removeIconIMGStyling" data-city="${city}" src="./assets/remove.png" alt="remove icon"> ${city} <span id="favCityCurrentTemp" class="tempPositioning">${Math.floor(fetchJSONSearchData.main.temp)}°</span>`;

        favoriteCitiesDiv.appendChild(p);
    });
};

window.addEventListener("DOMContentLoaded", () => {
    getUserLocation();
    grabCurrentTime();
    grabCurrentDate();
    displayCurrentDateTime();
});

const getUserLocation = () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
        },

        // Error callback
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                default:
                    alert("An unknown error occurred.");
            }
        }
    );
};

const displayCurrentLocationWeatherData = async () => {
    const fetchCurrentLocationWeatherJSONData = await fetchCurrentLocationWeatherData();
    currentUserLocationTemp.textContent = `${Math.floor(fetchCurrentLocationWeatherJSONData.main.temp)}°`;
    currentUserLocationHighsLowsText.textContent = `H: ${Math.floor(fetchCurrentLocationWeatherJSONData.main.temp_max)}° | L: ${Math.floor(fetchCurrentLocationWeatherJSONData.main.temp_min)}°`;
    if (fetchCurrentLocationWeatherJSONData.weather[0].main === "Clear") {
        currentWeatherIcon.src = "../assets/sun.png"
    }
    else if (fetchCurrentLocationWeatherJSONData.weather[0].main === "Clouds") {
        currentWeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (fetchCurrentLocationWeatherJSONData.weather[0].main === "Rain") {
        currentWeatherIcon.src = "../assets/weather.png"
    }
    else {
        currentWeatherIcon.src = "../assets/sun.png"
    }
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
    //For Forecast Day 1
    if (fetchForecastLocationWeatherJSONData.list[0].weather[0].main === "Clear") {
        forecastDay1WeatherIcon.src = "../assets/sun.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[0].weather[0].main === "Clouds") {
        forecastDay1WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[0].weather[0].main === "Rain") {
        forecastDay1WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay1WeatherIcon.src = "../assets/sun.png"
    };

    //For Forecast Day 2
    if (fetchForecastLocationWeatherJSONData.list[8].weather[0].main === "Clear") {
        forecastDay2WeatherIcon.src = "../assets/sun.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[8].weather[0].main === "Clouds") {
        forecastDay2WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[8].weather[0].main === "Rain") {
        forecastDay2WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay2WeatherIcon.src = "../assets/sun.png"
    };

    //For Forecast Day 3
    if (fetchForecastLocationWeatherJSONData.list[16].weather[0].main === "Clear") {
        forecastDay3WeatherIcon.src = "../assets/sun.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[16].weather[0].main === "Clouds") {
        forecastDay3WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[16].weather[0].main === "Rain") {
        forecastDay3WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay3WeatherIcon.src = "../assets/sun.png"
    };

    //For Forecast Day 4
    if (fetchForecastLocationWeatherJSONData.list[24].weather[0].main === "Clear") {
        forecastDay4WeatherIcon.src = "../assets/sun.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[24].weather[0].main === "Clouds") {
        forecastDay4WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[24].weather[0].main === "Rain") {
        forecastDay4WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay4WeatherIcon.src = "../assets/sun.png"
    };

    //For Forecast Day 5
    if (fetchForecastLocationWeatherJSONData.list[32].weather[0].main === "Clear") {
        forecastDay5WeatherIcon.src = "../assets/sun.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[32].weather[0].main === "Clouds") {
        forecastDay5WeatherIcon.src = "../assets/partly-cloudy.png"
    }
    else if (fetchForecastLocationWeatherJSONData.list[32].weather[0].main === "Rain") {
        forecastDay5WeatherIcon.src = "../assets/weather.png"
    }
    else {
        forecastDay5WeatherIcon.src = "../assets/sun.png"
    };
};
displayForecastLocationWeatherData();

const grabCurrentTime = () => {
    const currentTime = new Date();
    const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // Explicitly request 12-hour format
    });
    return timeString;
};
grabCurrentTime();

const grabCurrentDate = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    // Example output: "Wednesday, December 17, 2025"
    return formattedDate;
};
grabCurrentDate();

const grabForecastDay1Abbreviations = () => {
    const date = new Date(); // Gets the current date/time

    date.setDate(date.getDate() + 1);
    // Get the three-letter abbreviation for the current day in the US English locale
    const options = { weekday: 'short' };
    const abbreviatedDay = date.toLocaleDateString('en-US', options);

    return abbreviatedDay;
};
grabForecastDay1Abbreviations();

const grabForecastDay2Abbreviations = () => {
    const date = new Date(); // Gets the current date/time

    date.setDate(date.getDate() + 2);
    // Get the three-letter abbreviation for the current day in the US English locale
    const options = { weekday: 'short' };
    const abbreviatedDay = date.toLocaleDateString('en-US', options);

    return abbreviatedDay;
};
grabForecastDay2Abbreviations();

const grabForecastDay3Abbreviations = () => {
    const date = new Date(); // Gets the current date/time

    date.setDate(date.getDate() + 3);
    // Get the three-letter abbreviation for the current day in the US English locale
    const options = { weekday: 'short' };
    const abbreviatedDay = date.toLocaleDateString('en-US', options);

    return abbreviatedDay;
};
grabForecastDay3Abbreviations();

const grabForecastDay4Abbreviations = () => {
    const date = new Date(); // Gets the current date/time

    date.setDate(date.getDate() + 4);
    // Get the three-letter abbreviation for the current day in the US English locale
    const options = { weekday: 'short' };
    const abbreviatedDay = date.toLocaleDateString('en-US', options);

    return abbreviatedDay;
};
grabForecastDay4Abbreviations();

const grabForecastDay5Abbreviations = () => {
    const date = new Date(); // Gets the current date/time

    date.setDate(date.getDate() + 5);
    // Get the three-letter abbreviation for the current day in the US English locale
    const options = { weekday: 'short' };
    const abbreviatedDay = date.toLocaleDateString('en-US', options);

    return abbreviatedDay;
};
grabForecastDay5Abbreviations();

const displayCurrentDateTime = () => {
    currentDate.textContent = grabCurrentDate();
    currentTime.textContent = grabCurrentTime();
    forecastDay1WeekAbbreviation.textContent = grabForecastDay1Abbreviations();
    forecastDay2WeekAbbreviation.textContent = grabForecastDay2Abbreviations();
    forecastDay3WeekAbbreviation.textContent = grabForecastDay3Abbreviations();
    forecastDay4WeekAbbreviation.textContent = grabForecastDay4Abbreviations();
    forecastDay5WeekAbbreviation.textContent = grabForecastDay5Abbreviations();
};
displayCurrentDateTime();

setInterval(grabCurrentTime, 1000);

setInterval(grabCurrentDate, 1000);

setInterval(displayCurrentDateTime, 1000);