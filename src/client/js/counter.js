//day counter to the travel date
function dayCounter(userInputDate){

    //new date instance created dynamically with JS
    let d = new Date();
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const month = months[d.getMonth()];
    const day = `0${d.getDate()}`.slice(-2);

    const today = `${d.getFullYear()}-${month}-${day}`;
    const travelDate = userInputDate;

    let differenceInMs = new Date(travelDate) - new Date(today);
    let differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    return differenceInDays;
}

export { dayCounter }