function validateForm(){

    const inputPlace = document.getElementById('place').value;
    console.log('entered destination', inputPlace);
    const inputDate = document.getElementById('date').value;
    console.log('entered date', inputDate);

    if(inputPlace === "" || inputPlace === " "){
        return false;

    } else if(inputDate === NaN || inputDate === ""){
        return false;

    } else{
        return true;
    }
}

export { validateForm }