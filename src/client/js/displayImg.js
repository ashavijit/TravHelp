function displayImg(primaryObj, id){

    try{
        const placeImg = primaryObj.destinationImg;
        const countryImg = primaryObj.countryImg;

        const travelDiv = document.querySelector(`[data-travel-number='${id}']`)

        if(placeImg === undefined && countryImg === undefined){

            const defaultImg = 'https://cdn.pixabay.com/photo/2018/09/26/20/20/workplace-3705534_1280.jpg';
            
            const newElement = document.createElement('img');
            newElement.setAttribute('alt', `picture of the destination`);
            newElement.setAttribute('src', `${defaultImg}`);
            newElement.setAttribute('class', 'travel-img');
            travelDiv.insertAdjacentElement("afterbegin",newElement);
            

        } else if(placeImg === undefined){

            const newElement = document.createElement('img');
            newElement.setAttribute('alt', `picture of the destination`);
            newElement.setAttribute('src', `${countryImg}`);
            newElement.setAttribute('class', 'travel-img');
            travelDiv.insertAdjacentElement("afterbegin",newElement);
            
        }else{

            
            const newElement = document.createElement('img');
            newElement.setAttribute('alt', `picture of the destination`);
            newElement.setAttribute('src', `${placeImg}`);
            newElement.setAttribute('class', 'travel-img');
            travelDiv.insertAdjacentElement("afterbegin",newElement);
        }
        
    } catch(err){
        
        console.log('Error to display destination image', err)
    }
}

export { displayImg }