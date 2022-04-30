//---------------------------------------------------------------------
// SHIM to be used with IMG-API
// https://github.com/sergioamr/img-api
//---------------------------------------------------------------------

// Node API Example to interface with IMG-API
//
// If you are learning how to handle images in python, node or just exploring.
// Here is a simple application that will let you interface against our api.
//

console.log("------------------------------------------")
console.log(" Img-API.com is your API to handle images")
console.log("------------------------------------------")

const ImgAPI = require('./lib/img-api.js');

var imgapi = new ImgAPI();

// Check if you can connect to the hello world API
// It should return a json file
//
// https://img-api.com/api/hello_world/

hello = imgapi.hello_world()

hello.then(json => {
    // Should return the hello world
    console.log(json)
}).catch(e => {
    // Check if there is an error on the API
    console.log(e)
})

// We wait for our previous call to finish and we start a new call

create_user = imgapi.create_user("testing", "password123", "test@engineer.blue")
create_user.then(json => {
    console.log(json)
}).catch(e => {
    console.log("! FAILED CREATING USER " + e)
})

