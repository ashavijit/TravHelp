import { callApiViaServerSide } from "./postRequestToServer"

/* The 3 years of historical weather data are being fetched in 3 separate GET requests due to the
free API registration plan limitation */
const getHistoricWeather = async (obj, apiUrl1, apiUrl2, apiUrl3)=>{

    const respOne = await callApiViaServerSide('/callAPI', {urlBase:apiUrl1})
    const respTwo = await callApiViaServerSide('/callAPI', {urlBase:apiUrl2})
    const respThree = await callApiViaServerSide('/callAPI', {urlBase:apiUrl3})

    try{

        const storeDataOne = await respOne;

        obj.oneYearPredictions = {
            date: storeDataOne.location.values[0].datetimeStr,
            conditions: storeDataOne.location.values[0].conditions,
            maxT: storeDataOne.location.values[0].maxt,
            minT: storeDataOne.location.values[0].mint,
            snow: storeDataOne.location.values[0].snowdepth,
            precipitation: storeDataOne.location.values[0].precip,
            precipitationCover: storeDataOne.location.values[0].precipcover
        }

        const storeDataTwo = await respTwo;

        obj.twoYearPredictions = {
            date: storeDataTwo.location.values[0].datetimeStr,
            conditions: storeDataTwo.location.values[0].conditions,
            maxT: storeDataTwo.location.values[0].maxt,
            minT: storeDataTwo.location.values[0].mint,
            snow: storeDataTwo.location.values[0].snowdepth,
            precipitation: storeDataTwo.location.values[0].precip,
            precipitationCover: storeDataTwo.location.values[0].precipcover
        }

        const storeDataThree = await respThree;

        obj.threeYearPredictions = {
            date: storeDataThree.location.values[0].datetimeStr,
            conditions: storeDataThree.location.values[0].conditions,
            maxT: storeDataThree.location.values[0].maxt,
            minT: storeDataThree.location.values[0].mint,
            snow: storeDataThree.location.values[0].snowdepth,
            precipitation: storeDataThree.location.values[0].precip,
            precipitationCover: storeDataThree.location.values[0].precipcover
        }

        return obj;

    } catch(err){
        console.log('Error trying to get historical weather', err);
        alert("Sorry, we couldn't complete your request. Please try again")
    }
}

export { getHistoricWeather }