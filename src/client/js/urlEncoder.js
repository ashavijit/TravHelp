function encodeUrl(userInput){
    const uri = userInput;
    const encoded = encodeURIComponent(uri);
    return encoded;
}

export { encodeUrl }