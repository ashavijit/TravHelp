import { dayCounter } from './counter'
import { buildHistoricApiURLs } from './app'
import { getHistoricWeather } from './getHistoricWeather'

function updateUIHistoricWeather(apiObject, id){

    const historicalDate = (dte)=>{
        const td = new Date(dte);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[td.getMonth()];
        const newDayFormat = `${td.getDate()} ${month} ${td.getFullYear()}`;
        return newDayFormat;
    };
    const setSnowResult = (snowData)=>{
        const zeroSnow = '0';

        if(snowData === null){
            return zeroSnow;
        } else{
            return snowData;
        }
    };

    const oneYearAgo = apiObject.oneYearPredictions.date;
    const oneYearDescription = apiObject.oneYearPredictions.conditions;
    const oneYearMaxTemp = apiObject.oneYearPredictions.maxT;
    const oneYearMinTemp = apiObject.oneYearPredictions.minT;
    //const oneYearRain = apiObject.oneYearPredictions.precipitation;
    const oneYearRainPercent = apiObject.oneYearPredictions.precipitationCover;
    const oneYearSnow =apiObject.oneYearPredictions.snow;
    const oneYearSnowResult = setSnowResult(oneYearSnow);

    const twoYearsAgo = apiObject.twoYearPredictions.date;
    const twoYearsDescription = apiObject.twoYearPredictions.conditions;
    const twoYearsMaxTemp = apiObject.twoYearPredictions.maxT;
    const twoYearsMinTemp = apiObject.twoYearPredictions.minT;
    //const twoYearsRain = apiObject.twoYearPredictions.precipitation;
    const twoYearsRainPercent = apiObject.twoYearPredictions.precipitationCover;
    const twoYearsSnow =apiObject.twoYearPredictions.snow;
    const twoYearsSnowResult = setSnowResult(twoYearsSnow);

    const threeYearsAgo = apiObject.threeYearPredictions.date;
    const threeYearsDescription = apiObject.threeYearPredictions.conditions;
    const threeYearsMaxTemp = apiObject.threeYearPredictions.maxT;
    const threeYearsMinTemp = apiObject.threeYearPredictions.minT;
    //const threeYearsRain = apiObject.threeYearPredictions.precipitation;
    const threeYearsRainPercent = apiObject.threeYearPredictions.precipitationCover;
    const threeYearsSnow = apiObject.threeYearPredictions.snow;
    const threeYearsSnowResult = setSnowResult(threeYearsSnow);

    //const section = document.getElementById('travel-info-historical');
    const section = document.querySelector(`[weather-travel-number='${id}']`);
    const newElement = document.createElement('div');
    newElement.setAttribute('class', 'weather-holder');
    newElement.innerHTML = `<h3 class="result-subtitle">Historical weather on this same day for the past 3 years:</h3>

        <div class="past-years-holder">
            <div class="weather-past-years">
                <i class="icon-travel-weather far fa-calendar"></i>
                <h4 class="result-year">${historicalDate(oneYearAgo)}</h4>
            </div>
            <p class="low-temp">Low: ${oneYearMinTemp} °C</p>
            <p class="high-temp">High: ${oneYearMaxTemp} °C</p>
            <p class="chance-of-rain">Rain record: It rained over ${oneYearRainPercent}% of the day.</p>
            <p class="snow-record">Snow record: ${oneYearSnowResult} cm</p>
            <div class="weather-description">
                <i class="icon-travel-weather fas fa-cloud"></i>
                <p class="round-box large-box"> ${oneYearDescription}</p>
            </div>
        </div>

        <div class="past-years-holder">
            <div class="weather-past-years">
                <i class="icon-travel-weather far fa-calendar"></i>
                <h4 class="result-year">${historicalDate(twoYearsAgo)}</h4>
            </div>
            <p class="low-temp">Low: ${twoYearsMinTemp} °C</p>
            <p class="high-temp">High: ${twoYearsMaxTemp} °C</p>
            <p class="chance-of-rain">Rain record: It rained over ${twoYearsRainPercent}% of the day.</p>
            <p class="snow-record">Snow record: ${twoYearsSnowResult} cm</p>
            <div class="weather-description">
                <i class="icon-travel-weather fas fa-cloud"></i>
                <p class="round-box large-box"> ${twoYearsDescription}</p>
            </div>
        </div>

        <div class="past-years-holder">
            <div class="weather-past-years">
                <i class="icon-travel-weather far fa-calendar"></i>
                <h4 class="result-year">${historicalDate(threeYearsAgo)}</h4>
            </div>
            <p class="low-temp">Low: ${threeYearsMinTemp} °C</p>
            <p class="high-temp">High: ${threeYearsMaxTemp} °C</p>
            <p class="chance-of-rain">Rain record: It rained over ${threeYearsRainPercent}% of the day.</p>
            <p class="snow-record">Snow record: ${threeYearsSnowResult} cm</p>
            <div class="weather-description">
                <i class="icon-travel-weather fas fa-cloud"></i>
                <p class="round-box large-box"> ${threeYearsDescription}</p>
            </div>
        </div>`;

        section.insertAdjacentElement('beforeend', newElement);
}

function updateUI(apiObject, userInputDate, primaryDataObj, id){

    const country = primaryDataObj.country;
    const city = primaryDataObj.city;
    const travelDiv = document.querySelector(`[data-travel-number='${id}']`)

    const removeTrip = ()=>{

        const section = document.getElementById('results')
        const travelDiv = document.querySelector(`[data-travel-number='${id}']`)
        section.removeChild(travelDiv);
        //console.log('testaaaaaando')
        
    }

    function appendHistoricalWeather(){

        const apiUrls = buildHistoricApiURLs(userInputDate);
        const url1 = apiUrls.apiURL1;
        const url2 = apiUrls.apiURL2;
        const url3 = apiUrls.apiURL3;
    
        getHistoricWeather(primaryDataObj, url1, url2, url3)
    
        .then(newObj =>{
            
            console.log('primaryData obj preview:', newObj);
            updateUIHistoricWeather(newObj, id);
        });
    }

    const travelDay = function(){
        const td = new Date(userInputDate);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[td.getMonth()];
        const newDayFormat = `${month} ${td.getDate()}, ${td.getFullYear()}`;
        return newDayFormat;
    };
    
    const daysAway = function(){

        if(dayCounter(userInputDate) == 1){

            const oneDay = `${dayCounter(userInputDate)} day away!`;
            return oneDay;

        } else {

            const severalDays = `${dayCounter(userInputDate)} days away!`;
            return severalDays;
        }
    };

    if(dayCounter(userInputDate) <= 7){

        const apiForecastDates = apiObject['data'];
    
        try{

            for(const day of apiForecastDates){

                const apiDate = day['valid_date'];

                if(apiDate === userInputDate){

                    const sunriseUTC = day['sunrise_ts'];
                    const sunrise = function(){
                        let sunriseUnixTimestamp = sunriseUTC * 1000;
                        const sunriseDate = new Date(sunriseUnixTimestamp);
                        const sunriseTime = sunriseDate.toLocaleTimeString('en-UK', {hour: '2-digit', minute: '2-digit', timeZone: `${apiObject['timezone']}`});
                        return sunriseTime;
                    };
                    
                    const sunsetUTC = day["sunset_ts"];
                    const sunset = function(){
                        let sunsetUnixTimestamp = sunsetUTC * 1000;
                        const sunsetDate = new Date(sunsetUnixTimestamp);
                        const sunsetTime = sunsetDate.toLocaleTimeString('en-UK', {hour: '2-digit', minute: '2-digit', timeZone: `${apiObject['timezone']}`});
                        return sunsetTime;
                    };

                    //const travelDiv = document.getElementById('travel-info');
                    const fragment = document.createDocumentFragment();
                    const newElement = document.createElement('div');
                    newElement.setAttribute('class', 'holder info-holder');
                    newElement.setAttribute('weather-travel-number', `${id}`);
                    newElement.innerHTML = `<div class="holder result-header">
                        <div class="travel-data">
                            <i class="icon-travel-info fas fa-map-marker-alt"></i>
                            <h2 class="travel-summary"><span class="travel-summary-info">My trip to: </span>${city}, ${country}</h2>
                        </div>
                        <div class="travel-data">
                            <i class="icon-travel-info far fa-calendar-check"></i>
                            <h2 class="travel-summary"><span class="travel-summary-info">Departing: </span>${travelDay(userInputDate)}</h2>
                        </div>
                    </div>
                    <div class="result-body">
                        <div class="counter">
                            <i class="counter-icon far fa-clock"></i>
                            <p class="counter-text">${city}, ${country} is ${daysAway()}</p>
                        </div>
                    
                        <div class="weather-holder">
                            <h3 class="result-subtitle">Weather forecast for then is:</h3>
                            <p class="low-temp">Low: ${day["min_temp"]} °C</p>
                            <p class="high-temp">High: ${day["max_temp"]} °C</p>
                            <p class="chance-of-rain">Chance of Rain: ${day.pop}%</p>
                            <p class="snow-record">Snowfall: ${day.snow} mm/hr</p>
                            <p class="sunrise">Sunrise: ${sunrise()}</p>
                            <p class="sunset">Sunset: ${sunset()}</p>
                            <div class="weather-description">
                                <i class="icon-travel-weather fas fa-cloud"></i>
                                <h4 class="round-box large-box">${day.weather.description}</h4>
                            </div>
                        </div>
                        <button id="btn-get-historical">check past years</button>
                        <div id="travel-info-historical" class="holder entry-holder"></div>
                    </div>`;

                    const button = document.createElement('button');
                    button.setAttribute('class', 'remove-trip');
                    button.innerText = 'Delete Trip';
                    button.onclick=removeTrip;
                    fragment.appendChild(newElement);
                    fragment.appendChild(button);
                    travelDiv.appendChild(fragment);

                    document.getElementById('btn-get-historical').addEventListener('click', appendHistoricalWeather)
                    //const btn = document.querySelector('.remove-trip');
                    //btn.addEventListener('click', removeTrip);
                    document.querySelector('.remove-trip').addEventListener('click', removeTrip)
                }
            }

        } catch(error){
            console.log('Error when updating the UI', error);
        }

    } else {

        const historicalDate = (dte)=>{
            const td = new Date(dte);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = months[td.getMonth()];
            const newDayFormat = `${td.getDate()} ${month} ${td.getFullYear()}`;
            return newDayFormat;
        };
        const setSnowResult = (snowData)=>{
            const zeroSnow = '0';

            if(snowData === null){
                return zeroSnow;
            } else{
                return snowData;
            }
        };

        const oneYearAgo = apiObject.oneYearPredictions.date;
        const oneYearDescription = apiObject.oneYearPredictions.conditions;
        const oneYearMaxTemp = apiObject.oneYearPredictions.maxT;
        const oneYearMinTemp = apiObject.oneYearPredictions.minT;
        const oneYearRain = apiObject.oneYearPredictions.precipitation;
        const oneYearRainPercent = apiObject.oneYearPredictions.precipitationCover;
        const oneYearSnow =apiObject.oneYearPredictions.snow;
        const oneYearSnowResult = setSnowResult(oneYearSnow);

        const twoYearsAgo = apiObject.twoYearPredictions.date;
        const twoYearsDescription = apiObject.twoYearPredictions.conditions;
        const twoYearsMaxTemp = apiObject.twoYearPredictions.maxT;
        const twoYearsMinTemp = apiObject.twoYearPredictions.minT;
        const twoYearsRain = apiObject.twoYearPredictions.precipitation;
        const twoYearsRainPercent = apiObject.twoYearPredictions.precipitationCover;
        const twoYearsSnow =apiObject.twoYearPredictions.snow;
        const twoYearsSnowResult = setSnowResult(twoYearsSnow);

        const threeYearsAgo = apiObject.threeYearPredictions.date;
        const threeYearsDescription = apiObject.threeYearPredictions.conditions;
        const threeYearsMaxTemp = apiObject.threeYearPredictions.maxT;
        const threeYearsMinTemp = apiObject.threeYearPredictions.minT;
        const threeYearsRain = apiObject.threeYearPredictions.precipitation;
        const threeYearsRainPercent = apiObject.threeYearPredictions.precipitationCover;
        const threeYearsSnow = apiObject.threeYearPredictions.snow;
        const threeYearsSnowResult = setSnowResult(threeYearsSnow);

        //const travelDiv = document.getElementById('travel-info');
        const fragment = document.createDocumentFragment();
        const newElement = document.createElement('div');
        newElement.setAttribute('class', 'holder info-holder');
        newElement.id = 'travel-info-historical';
        
        newElement.innerHTML = `<div class="holder result-header">
            <div class="travel-data">
                <i class="icon-travel-info fas fa-map-marker-alt"></i>
                <h2 class="travel-summary"><span class="travel-summary-info">My trip to: </span>${city}, ${country}</h2>
            </div>
            <div class="travel-data">
                <i class="icon-travel-info far fa-calendar-check"></i>
                <h2 class="travel-summary"><span class="travel-summary-info">Departing: </span>${travelDay(userInputDate)}</h2>
            </div>
        </div>

        <div class="result-body">
            <div class="counter">
                <i class="counter-icon far fa-clock"></i>
                <p class="counter-text">${city}, ${country} is ${daysAway()}</p>
            </div>
            
            <div class="weather-holder">
                <h3 class="result-subtitle">Historical weather on this same day for the past 3 years:</h3>
                <div class="past-years-holder">
                    <div class="weather-past-years">
                        <i class="icon-travel-weather far fa-calendar"></i>
                        <h4 class="result-year">${historicalDate(oneYearAgo)}</h4>
                    </div>
                    <p class="low-temp">Low: ${oneYearMinTemp} °C</p>
                    <p class="high-temp">High: ${oneYearMaxTemp} °C</p>
                    <p class="chance-of-rain">Rain record: It rained over ${oneYearRainPercent}% of the day.</p>
                    <p class="snow-record">Snow record: ${oneYearSnowResult} cm</p>
                    <div class="weather-description">
                        <i class="icon-travel-weather fas fa-cloud"></i>
                        <p class="round-box large-box"> ${oneYearDescription}</p>
                    </div>
                </div>
                <div class="past-years-holder">
                    <div class="weather-past-years">
                        <i class="icon-travel-weather far fa-calendar"></i>
                        <h4 class="result-year">${historicalDate(twoYearsAgo)}</h4>
                    </div>
                    <p class="low-temp">Low: ${twoYearsMinTemp} °C</p>
                    <p class="high-temp">High: ${twoYearsMaxTemp} °C</p>
                    <p class="chance-of-rain">Rain record: It rained over ${twoYearsRainPercent}% of the day.</p>
                    <p class="snow-record">Snow record: ${twoYearsSnowResult} cm</p>
                    <div class="weather-description">
                        <i class="icon-travel-weather fas fa-cloud"></i>
                        <p class="round-box large-box"> ${twoYearsDescription}</p>
                    </div>
                </div>
                <div class="past-years-holder">
                    <div class="weather-past-years">
                        <i class="icon-travel-weather far fa-calendar"></i>
                        <h4 class="result-year">${historicalDate(threeYearsAgo)}</h4>
                    </div>
                    <p class="low-temp">Low: ${threeYearsMinTemp} °C</p>
                    <p class="high-temp">High: ${threeYearsMaxTemp} °C</p>
                    <p class="chance-of-rain">Rain record: It rained over ${threeYearsRainPercent}% of the day.</p>
                    <p class="snow-record">Snow record: ${threeYearsSnowResult} cm</p>
                    <div class="weather-description">
                        <i class="icon-travel-weather fas fa-cloud"></i>
                        <p class="round-box large-box"> ${threeYearsDescription}</p>
                    </div>
                </div>
            </div>
        </div>
        <button class="remove-trip">Delete Trip</button>`;

        fragment.appendChild(newElement);
        travelDiv.appendChild(fragment);

        document.querySelector('.remove-trip').addEventListener('click', removeTrip)
    }
}

export { updateUI }