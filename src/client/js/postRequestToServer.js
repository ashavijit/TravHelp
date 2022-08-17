//POST request client side
const callApiViaServerSide = async (url='', data={})=>{

    const response = await fetch(url, {
        method: 'POST',
        credential: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) //transform data into string to server side
    });

    try{
        const newData = await response.json();
        console.log("data being sent to the server:", data)
        console.log('Server response:', newData);
        return newData;
    }catch(error){
        console.log('Error creating object for server side', error);
    }
}

export { callApiViaServerSide }