//Importing helper functions
import { encodeUrl } from './urlEncoder'
import { getCoordinatesFromApi } from './callGeonamesApi'
import { callApiViaServerSide } from './postRequestToServer'
import { dayCounter } from './counter'
import { updateUI } from './updateUI'
import { validateForm } from './formValidator'
import { getHistoricWeather } from './getHistoricWeather'
import { getPlaceImg } from './getPlaceImg'
import { displayImg } from './displayImg'
import { scrollTo } from './footerButtons'

//Primary Object to hold data from GeoNames API
var primaryData = {};

//* APIs keys *//
const geoNamesBaseURL = 'https://secure.geonames.org/searchJSON?q='
const geoNamesKey = 'janainamj'
const weatherBitBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherBitKey = '723118fb280a46d5bc650aaaa26b3479'
const visualCrossingBaseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?'
const visualCrossingKey = 'ZQFMC9TG68TNK7BM2YRMJJFE2'
const pixabayImgBaseURL = 'https://pixabay.com/api/'
const pixabayKey = '22140600-67da7abf40f7e47eef517beac'

//start - global variable (helper function)
const buildHistoricApiURLs = (dateInput)=>{

    function setTravelDate(){

        //if the trip is within one year, use the travel date entered by the user to fetch historical weather
        if(dayCounter(dateInput) <= 365){
            return dateInput; //travel date entered by the user

        //if the trip is more than one year away, use a new set date (based on the current year) to fetch historical weather
        } else{
            let todayDate = new Date();
            const currentYear = todayDate.getFullYear();
            const travelDay = new Date(dateInput);
            const newTravelDate = travelDay.setFullYear(currentYear);
            return newTravelDate;
        }
    }

    const dt = setTravelDate();
    const geoPlace = primaryData.latitude + ',' + primaryData.longitude;
    const geoPlaceEncoded = encodeUrl(geoPlace);

    const oneYearAgo = ()=>{
        let setOneYear = new Date(dt);
        setOneYear.setFullYear(setOneYear.getFullYear() - 1);
        const oneYear = setOneYear.toISOString().split('.')[0];
        return oneYear;
    };

    const twoYearAgo = ()=>{
        let setTowYears = new Date(dt);
        setTowYears.setFullYear(setTowYears.getFullYear() - 2);
        const twoYears = setTowYears.toISOString().split('.')[0];
        return twoYears;
    };

    const threeYearAgo = ()=>{
        let setThreeYears = new Date(dt);
        setThreeYears.setFullYear(setThreeYears.getFullYear() - 3);
        const threeYears = setThreeYears.toISOString().split('.')[0];
        return threeYears;
    };

    const urls = {
        'apiURL1': `${visualCrossingBaseURL}&aggregateHours=24&startDateTime=${oneYearAgo()}&endDateTime=${oneYearAgo()}&unitGroup=metric&contentType=json&location=${geoPlaceEncoded}&locationMode=single&key=${visualCrossingKey}`,
        'apiURL2': `${visualCrossingBaseURL}&aggregateHours=24&startDateTime=${twoYearAgo()}&endDateTime=${twoYearAgo()}&unitGroup=metric&contentType=json&location=${geoPlaceEncoded}&locationMode=single&key=${visualCrossingKey}`,
        'apiURL3': `${visualCrossingBaseURL}&aggregateHours=24&startDateTime=${threeYearAgo()}&endDateTime=${threeYearAgo()}&unitGroup=metric&contentType=json&location=${geoPlaceEncoded}&locationMode=single&key=${visualCrossingKey}`
    }

    return urls;
} 

let travelNumber = 0;

const TravelNumberCounter = (counter)=>{
   
    counter+= 1;
    return counter;
}
//end - global variable (helper function)

//Wrapping functionalities in a init() function to be executed only after DOM is ready
function init(){

    // Footer button - Scroll to section on click
    document.querySelector('.footer-link').addEventListener('click', scrollTo);

    //Adding event listener to the 'form' DOM element (in the 'submit' button)
    document.getElementById('generate').addEventListener('click', performAction);

    //Executing a Callback function chaining promises 
    function performAction(event){

        event.preventDefault();
        //document.getElementById('results').innerHTML = `<div></div>`;
        

        if(validateForm() === true) {

            const travelDate = document.getElementById('date').value;
            const placeName = document.getElementById('place').value;
            const placeEncoded = encodeUrl(placeName); //encoding user entries to use in a url

            const section = document.getElementById('results');
            const divTripInfo = document.createElement('div');
            divTripInfo.setAttribute('class', 'trip-holder');
            travelNumber += 1;
            divTripInfo.setAttribute('data-travel-number', `${travelNumber}`);
            section.insertAdjacentElement('afterbegin', divTripInfo);

            //Using user inputs to call geoNames API and get Latitude and Longitude parameters
            getCoordinatesFromApi(geoNamesBaseURL, placeEncoded, geoNamesKey)

            .then(data => { //saving API data (latitude, longitude and country) into primary object

                console.log('API object received by the callGeoNames, showing in the promise chaining function', data);
                primaryData = data;
                getPlaceImg(primaryData, pixabayImgBaseURL, pixabayKey)
                .then(()=>{

                    displayImg(primaryData, travelNumber)
                })
                console.log('These are the data stored on primary obj:', primaryData);
                return primaryData;
            })

            .then(() => { 

                if(dayCounter(travelDate) < 0){ //if the date entered by the user is in the past

                    alert('Please, enter a valid date');

                } else if(dayCounter(travelDate) <= 7){ //If the date entered by the user is within a week

                    try{
                        //building url using 'lat' and 'long' parameters to call weatherBit API via server side
                        callApiViaServerSide('/callAPI', {urlBase: `${weatherBitBaseURL}lat=${primaryData.latitude}&lon=${primaryData.longitude}&key=${weatherBitKey}`})
                        
                        .then((newData) => {

                            updateUI(newData, travelDate, primaryData, travelNumber)
                        });
                    
                    } catch(err){

                        console.log('Error when building URL to callApiViaServerSide')
                    }
                    
                } else { //If the date entered by the user is in the future
 
                    try{
                        const apiUrls = buildHistoricApiURLs(travelDate);
                        const url1 = apiUrls.apiURL1;
                        const url2 = apiUrls.apiURL2;
                        const url3 = apiUrls.apiURL3;

                        getHistoricWeather(primaryData, url1, url2, url3)

                        .then(newObj =>{
                            
                            console.log('primary preview:', newObj)
                            updateUI(newObj, travelDate, primaryData, travelNumber)
                        });

                    }catch(err){

                        console.log('Error when building historical API URL', err)
                    }
                }
            })

        }else {
            alert('Please, fill in the empty fields')
        }
    }
}

export { init }
export { buildHistoricApiURLs }