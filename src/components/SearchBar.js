import React, { useEffect, useState } from 'react';

const dropdownAmount = 6;

export default function SearchBar(props) {
    
    const [cityQuery, setCityQuery] = useState('');
    const [citiesFiltered, setCitiesFiltered] = useState([]);
    const [searchElements, setSearchElements] = useState([]);

    function searchCityAndState(c) { // Searches for city/state using index of filtered cities array
        props.setCity(citiesFiltered[c]);
        setCityQuery('');
        setSearchElements([]);
    }

    function setCitySearch(c) { // Sets city search for filtered searching
        setCityQuery(c);
        if (/[a-zA-Z]/.test(c)) {
            const search = c.toLowerCase();
            setCitiesFiltered(props.cities.filter(city => city.city.toLowerCase().includes(search)));
        }
        else {
            setCitiesFiltered([]);
        }
    }
    
    function getCitySearchList() { // Returns array of filtered cities elements
        const array = [];
        for (let i = 0; i < dropdownAmount; i++) {
            if (i > citiesFiltered.length - 1 || citiesFiltered.length === 0) {
                break;
            }
            array.push(
                <li key={i} id={i} className='dropdown-item' onClick={(e) => searchCityAndState(e.currentTarget.id)}>
                    <div className='dropdown-item-button'>
                        <div className='dropdown-item-text'>{citiesFiltered[i].city}</div>
                        <div className='dropdown-item-text'>{citiesFiltered[i].state}</div>
                    </div>
                </li>);
        }
        return array;
    }

    useEffect(() => {
        setSearchElements(getCitySearchList());
    }, [citiesFiltered]);

    return (
        <div className='search-bar-container'>
            <input
                className='search-bar'
                type='text'
                placeholder='Enter City Name'
                onChange={(e) => setCitySearch(e.target.value)}
                value={cityQuery}
            />
            <ul className='search-bar-dropdown'>
                {searchElements}
            </ul>
            
        </div>
    );
}