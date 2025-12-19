const saveToLocalStorage = (city) => {
    let favoriteCityArray = getFromLocalStorage();

    if (!favoriteCityArray.includes(city)){
        favoriteCityArray.push(city);
    }

    localStorage.setItem("favoritedCities", JSON.stringify(favoriteCityArray));
};

const getFromLocalStorage = () => {
    let value = localStorage.getItem("favoritedCities");

    if (value === null){
        return [];
    }

    return JSON.parse(value)
};

const removeFromLocalStorage = () => {
    let favCityArr = getFromLocalStorage();

    let cityIndex = favCityArr.indexOf(city);

    cityIndex.splice(cityIndex, 1)
    localStorage.setItem("favoritedCities", JSON.stringify(favCityArr));
};

export {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage};