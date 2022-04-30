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

let main = async () => {
    console.log("\n------------------------------")
    console.log("API CHECK - HELLO WORLD")

    let hello = await imgapi.hello_world()
    console.log(hello)

    console.log("\n------------------------------")
    console.log("CREATE USER")

    let user = await imgapi.create_user("testing", "password123", "test@engineer.blue")
    console.log(user)

    console.log("\n------------------------------")
    console.log("USER TOKEN ")

    let token = user.token

    console.log("\n------------------------------")
    console.log("IMAGE UPLOAD ")

    let upload = await imgapi.upload_image(token, "test/rock.jpg")
    console.log(upload)

}

main()