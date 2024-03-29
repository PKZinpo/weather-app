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

    function setCity(cityObject) { // Set current city using city and state
        setCurrentCity({
            city: cityObject.city,
            state: cityObject.state
        });
    }

    function isNightTime() { // Gets the time in 24 hour time
        const timeInSeconds = (new Date().getTime()  / 1000) + locationData.dstOffset + locationData.rawOffset;
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
            />
            {weatherData.main !== undefined ? (
                <MainWeather
                    city={currentCity.city}
                    state={currentCity.state}
                    data={weatherData}
                    isNightTime={isNightTime}
                    locationData={{dstOff: locationData.dstOffset, rawOff: locationData.rawOffset}}
                />
            ) : <div className='weather-placeholder'><strong>Enter a city to get the current weather at that location</strong></div>}
        </div>
    );
}