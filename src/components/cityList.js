import cityData from './city.list.json';

const data = () => {
    const array = [];
    for (let i = 0; i < cityData.length; i++) {
        if (cityData[i].country === 'US') {
            array.push({
                city: cityData[i].name,
                state: cityData[i].state
            });
        }
    }
    return array;
}

const cityList = data();

export default cityList;