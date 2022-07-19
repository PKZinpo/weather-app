import React, { useEffect, useState } from 'react';
import MainWeather from './components/MainWeather';
import SearchBar from './components/SearchBar';
import Background from './components/Background';
import cityList from './components/cityList';
import PageTitle from './components/PageTitle';

export default function App() {

    const [weatherData, setWeatherData] = useState({});
    const [locationData, setLocationData] = useState({});
    const [currentCity, setCurrentCity] = useState({city: '', state: ''});
    
    useEffect(() => { // Get Weather API Data
        if (currentCity.city !== '' && currentCity.city !== 'Does Not Exist') {
            fetch(`${process.env.REACT_APP_OPEN_WEATHER_URL}weather?q=${currentCity.city}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`)
                .then(res => res.json())
                .then(result => setWeatherData(result));
        }
    }, [currentCity]);

    useEffect(() => { // Get Location API Data
        if (currentCity.city !== '' && currentCity.city !== 'Does Not Exist') {
            const time = new Date().getTime() / 1000;
            fetch(`${process.env.REACT_APP_GOOGLE_URL}json?location=${weatherData.coord.lat}%2C${weatherData.coord.lon}&timestamp=${time}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
                .then(res => res.json())
                .then(result => setLocationData(result));
        }
    }, [weatherData]);

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
        const timeInSeconds = (new Date().getTime() + locationData.dstOffset + locationData.rawOffset) / 1000;
        if (timeInSeconds >= weatherData.sys.sunrise && timeInSeconds < weatherData.sys.sunset) {
            return false;
        }
        return true;
    }

    return (
        <div className='app-container'>
            <PageTitle />
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
                    isNightTime={isNightTime}
                />
            ) : <div className='weather-placeholder'><strong>Enter a city to get the current weather at that location</strong></div>}
        </div>
    );
}