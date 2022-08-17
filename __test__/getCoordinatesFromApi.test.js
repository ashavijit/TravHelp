import { getCoordinatesFromApi } from "../src/client/js/callGeonamesApi"

describe("Testing the value returned from API", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getCoordinatesFromApi() function", () => {

        // Define the input for the function, if any, in the form of variables/array
        const baseUrl = 'http://api.geonames.org/searchJSON?q=';
        const place = 'london';
        const apiKey = 'janainamj';

        expect(getCoordinatesFromApi(baseUrl, place, apiKey)).toBeDefined();
    }) 
});