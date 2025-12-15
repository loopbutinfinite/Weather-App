const fetchWeatherJSONData = async () => {
    const response = await fetch ("https://api.openweathermap.org/data/2.5/weather?lat=37.9575&lon=121.2925&appid=1251dca3c35b57068f0f66e1f77b0475&units=imperial") //For Stockton, CA lat long coords w/ imperial units
    const data = await response.json();
    console.log(`Current Temperature from API: ${Math.floor(data.main.temp)} Fahrenheit`) //12-15-25
    console.log(`Current Max temp from API: ${Math.floor(data.main.temp_max)} Fahrenheit`) //12-15-25
    console.log(`Current Min temp from API: ${Math.floor(data.main.temp_min)} Fahrenheit`) //12-15-25
    return data;
};
fetchWeatherJSONData();

const fetchForecastJSONData = async () => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=37.9575&lon=121.2925&appid=1251dca3c35b57068f0f66e1f77b0475&units=imperial"); //For Stockton, CA lat long coords w/ imperial units
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