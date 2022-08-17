//GET request to 'GEONAMES' API
const getCoordinatesFromApi = async(baseUrl, place, apiKey)=>{

    const res = await fetch(baseUrl + place + "&maxRows=10&username=" + apiKey)

    try{

        const apiData = await res.json();
        const data = {
            latitude: apiData.geonames[0].lat,
            longitude: apiData.geonames[0].lng,
            country: apiData.geonames[0].countryName,
            city: apiData.geonames[0].toponymName
        }
        console.log('API object received by the GeoNames function', apiData);
        return data;

    }catch(error){

        console.log('Error getting object from API', error);
        alert('Please enter a valid location');
    }
}

export { getCoordinatesFromApi }