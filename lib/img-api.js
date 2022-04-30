const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

/*
const file = fs.createWriteStream("file.jpg");
const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
   });
});
*/

class ImgAPI {
    constructor() {
        this.api = "https://img-api.com/api/";
        console.log("+ Welcome to ImgAPI ");
        console.log("+ Your API address is " + this.api);
    }

    set_api_address(new_api) {
        console.log("+ New API address " + new_api)
        this.api = new_api;
    }

    api_call(resolve, reject, res) {
        // Helper to call our promise after we have finished
        if (res.statusCode < 200 || res.statusCode >= 300)
            return reject(new Error('statusCode=' + res.statusCode));

        let data = [];
        res.on('data', chunk => {
            data.push(chunk);
        });

        res.on('end', () => {
            try {
                resolve(JSON.parse(Buffer.concat(data).toString()));
            } catch (e) {
                reject(e)
            }
        });

        res.on('error', err => {
            console.log('Error: ', err.message);
            reject(err.message);
        });
    }

    async hello_world() {
        /*  Gets a promise to deliver a result on the API call
            This result will be the json object
            Call IMG-API to check if we can reach the hello world service
        */

        let api_call = "/hello_world/"
        let promise = new Promise((resolve, reject) => {
            const request = https.get(this.api + api_call, res => {
                this.api_call(resolve, reject, res)
            })
        })
        return await promise
    }

    async create_user(username, password, email) {
        /* Creates an user and will give you an object with an API token to use from that point on. */

        let api_call = "/user/create?"
        let credentials = "username=" + username + "&password=" + password + "&email=" + email

        let promise = new Promise((resolve, reject) => {
            const request = https.get(this.api + api_call + credentials, res => {
                this.api_call(resolve, reject, res)
            })
        })
        return await promise
    }
}

module.exports = ImgAPI