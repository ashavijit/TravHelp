import { encodeUrl } from './urlEncoder'

const getPlaceImg = async(primaryObj, baseUrl, apiKey)=>{

    try{

        const enteredCity = primaryObj.city;
        const enteredCountry = primaryObj.country;
        const destination = encodeUrl(enteredCity);
        const countryDestination = encodeUrl(enteredCountry);

        const respOne = await fetch(`${baseUrl}?key=${apiKey}&q=${destination}&per_page=3&category=nature&safesearch=true&orientation=horizontal`)
        const respTwo = await fetch(`${baseUrl}?key=${apiKey}&q=${countryDestination}&per_page=3&category=nature&safesearch=true&orientation=horizontal`)

        try{

            const destinationImg = await respOne.json();
            primaryObj.destinationImg = destinationImg.hits[0].largeImageURL;
            console.log('primaryObj preview from Pixabay function', primaryObj);
            
        }catch(error){
            
            console.log('Error getting city image from Pixabay', error);
        }

        try{

            const countryImg = await respTwo.json();
            primaryObj.countryImg = countryImg.hits[0].largeImageURL;
            console.log('primaryObj preview from Pixabay function', primaryObj);
            return primaryObj;

        }catch(err){
            const replace = await respTwo.json();
            console.log('Error getting country image from Pixabay', err);
            return replace;
        }

    }catch(err){

        console.log('Error getting image from for the location informed', err)
    }
}

export { getPlaceImg }