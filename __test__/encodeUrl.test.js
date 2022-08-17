import { encodeUrl } from "../src/client/js/urlEncoder"

describe("Testing the text entered by the user", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the encodeUrl() function", () => {
        // Define the input for the function, if any, in the form of variables/array
        const userInput = "New York";
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(encodeUrl(userInput)).toBe("New%20York");
})});