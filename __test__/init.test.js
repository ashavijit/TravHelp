import { init } from '../src/client/js/app'
import "regenerator-runtime/runtime";

describe("Testing the value returned from main function", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the init() function", () => {

        expect(init).toBeDefined();
    }) 
});