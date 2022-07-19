import React, { useEffect, useState } from 'react';
import MainWeather from './components/MainWeather';
import SearchBar from './components/SearchBar';
import Background from './components/Background';
import cityData from './city.list.json';


const apiWeather = {
    key: '1eb28502f13bc97e5cd62cbf568b7713',
    base: 'https://api.openweathermap.org/data/2.5/'
}
const apiLocation = {
    key: 'AIzaSyA9qoKVJ2kJuZFJUPRfByvf9Gpnl_nWUFo',
    base: 'https://maps.googleapis.com/maps/api/timezone/'
}

export default function App() {

    const [weatherData, setWeatherData] = useState({});
    const [locationData, setLocationData] = useState({});
    const [currentCity, setCurrentCity] = useState({city: '', state: ''});
    const [cityList, setCityList] = useState([]);
    
    useEffect(() => { // Get Weather API Data
        if (currentCity.city !== '' && currentCity.city !== 'Does Not Exist') {
            fetch(`${apiWeather.base}weather?q=${currentCity.city}&appid=${apiWeather.key}`)
                .then(res => res.json())
                .then(result => setWeatherData(result));
        }
    }, [currentCity]);

    useEffect(() => { // Get Location API Data
        if (currentCity.city !== '' && currentCity.city !== 'Does Not Exist') {
            const time = new Date().getTime() / 1000;
            fetch(`${apiLocation.base}json?location=${weatherData.coord.lat}%2C${weatherData.coord.lon}&timestamp=${time}&key=${apiLocation.key}`)
                .then(res => res.json())
                .then(result => setLocationData(result));
        }
    }, [weatherData]);

    useEffect(() => { // Populate list of cities
        const array = [];
        for (let i = 0; i < cityData.length; i++) {
            if (cityData[i].country === 'US') {
                array.push({
                    city: cityData[i].name,
                    state: cityData[i].state
                });
            }
        }
        setCityList(array);
    }, []);

    function isCityInList(cityName) { // Check if city is in list
        return cityList.some(c => c.city === cityName);
    }

    function setCity(c) { // Set current city using only city
        if (isCityInList(c)) {
            for (let i = 0; i < cityList.length; i++) {
                if (cityList[i].city === c) {
                    setCurrentCity({
                        city: cityList[i].city,
                        state: cityList[i].state
                    });
                    break;
                }
            }
        }
        else {
            setCurrentCity({
                city: 'Does Not Exist', 
                state: 'Does Not Exist'
            });
        }
    }

    function setCityAndState(cityObject) { // Set current city using city and state
        setCurrentCity({
            city: cityObject.city,
            state: cityObject.state
        });
    }

    function isNightTime() { // Gets the time in 24 hour time
        const timeInMilliseconds = new Date().getTime() + locationData.dstOffset + locationData.rawOffset;
        if (timeInMilliseconds >= weatherData.sys.sunrise && timeInMilliseconds < weatherData.sys.sunset) {
            return false;
        }
        return true;
        // if (timeInSeconds + locationData.dstOffset + locationData.rawOffset < 0) {
        //     return 86400 - (timeInSeconds + locationData.dstOffset + locationData.rawOffset);
        // }
        // else {
        //     return timeInSeconds + locationData.dstOffset + locationData.rawOffset;
        // }
        
    }

    return (
        <div className='app-container'>
            <Background />
            <SearchBar
                cities={cityList}
                setCity={setCity}
                setCityAndState={setCityAndState}
            />
            {weatherData.main !== undefined ? (
                <MainWeather
                    city={currentCity.city}
                    state={currentCity.state}
                    data={weatherData}
                    getTimeOfDay={isNightTime}
                />
            ) : <div className='weather-placeholder'><strong>Enter a city name for current weather</strong></div>}
        </div>
    );
}