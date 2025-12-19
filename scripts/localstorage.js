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

const removeFromLocalStorage = (city) => {
    let favCityArr = getFromLocalStorage();

    const updatedArr = favCityArr.filter((c) => c !== city);

    localStorage.setItem("favoritedCities", JSON.stringify(updatedArr));
};

export {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage};