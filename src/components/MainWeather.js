import React, { useEffect, useState } from 'react';
import { 
    WiDayThunderstorm,
    WiDayShowers,
    WiDayRain,
    WiDaySnow, 
    WiDayCloudy,
    WiDaySunny, 
    WiDayFog,
    WiNightThunderstorm,
    WiNightShowers,
    WiNightRain,
    WiNightSnow,
    WiNightFog,
    WiNightClear,
    WiNightCloudy
} from 'react-icons/wi';

const weatherIconColor = 'rgb(245, 245, 245, 0.9)';
const weatherIconSize = 250;

export default function MainWeather(props) {

    const [weatherIndex, setWeatherIndex] = useState(0);

    const weatherIcons = [ // List of weather icons
        <WiDayThunderstorm size={weatherIconSize} color={weatherIconColor}/>,
        <WiDayShowers size={weatherIconSize} color={weatherIconColor}/>,
        <WiDayRain size={weatherIconSize} color={weatherIconColor}/>,
        <WiDaySnow size={weatherIconSize} color={weatherIconColor}/>,
        <WiDayFog size={weatherIconSize} color={weatherIconColor}/>,
        <WiDaySunny size={weatherIconSize} color={weatherIconColor}/>,
        <WiDayCloudy size={weatherIconSize} color={weatherIconColor}/>,
        <WiNightThunderstorm size={weatherIconSize} color={weatherIconColor}/>,
        <WiNightShowers size={weatherIconSize} color={weatherIconColor}/>,
        <WiNightRain size={weatherIconSize} color={weatherIconColor}/>,
        <WiNightSnow size={weatherIconSize} color={weatherIconColor}/>,
        <WiNightFog size={weatherIconSize} color={weatherIconColor}/>,
        <WiNightClear size={weatherIconSize} color={weatherIconColor}/>,
        <WiNightCloudy size={weatherIconSize} color={weatherIconColor}/>
    ]

    useEffect(() => { // Sets weather icon

        function getWeatherIcon() { // Set weather index according to weather and time
            const id = props.data.weather[0].id;
            
            if (id >= 200 && id < 300) {        // Thunderstorms
                props.isNightTime() ? setWeatherIndex(7) : setWeatherIndex(0);
            }
            else if (id >= 300 && id < 400) {   // Drizzle
                props.isNightTime() ? setWeatherIndex(8) : setWeatherIndex(1);
            }
            else if (id >= 500 && id < 600) {   // Rain
                props.isNightTime() ? setWeatherIndex(9) : setWeatherIndex(2);
            }
            else if (id >= 600 && id < 700) {   // Snow
                props.isNightTime() ? setWeatherIndex(10) : setWeatherIndex(3);
            }
            else if (id >= 700 && id < 800) {   // Foggy/Hazey
                props.isNightTime() ? setWeatherIndex(11) : setWeatherIndex(4);
            }
            else if (id === 800) {              // Clear
                props.isNightTime() ? setWeatherIndex(12) : setWeatherIndex(5);
            }
            else {                              // Cloudy
                props.isNightTime() ? setWeatherIndex(13) : setWeatherIndex(6);
            }
        }

        getWeatherIcon();
    }, [props.data.weather[0].id]);
    
    return (
        <main className='main-container'>
            <div className='main-temp-container'>
                <div className='main-temp-text'>
                    <h1 className='main-temp-hi-lo'>{
                    `Hi: ${(props.data.main.temp_max - 273).toFixed(1)}° •
                    Lo: ${(props.data.main.temp_min - 273).toFixed(1)}°`
                    }</h1>
                    <h1 className='main-temp'>{`${(props.data.main.temp - 273).toFixed(1)}°C`}</h1>
                    <h1 className='main-temp-feels'>{
                    `Feels like ${(props.data.main.feels_like - 273).toFixed(1)}°`}</h1>
                </div>
                <div className='main-icon'>
                    {weatherIcons[weatherIndex]}
                </div>
            </div>
            <h1 className='main-city'>{props.city !== '' && 
            props.city !== 'Does Not Exist' && 
            `${props.city}, ${props.state}`}</h1>
            <h1>{props.data.weather[0].main}</h1>
        </main>
    );
}