const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const request = require('request');



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

    hello_world() {
        /*  Gets a promise to deliver a result on the API call
            This result will be the json object
            Call IMG-API to check if we can reach the hello world service
        */

        let api_call = "/hello_world/"
        return new Promise((resolve, reject) => {
            const request = https.get(this.api + api_call, res => {
                this.api_call(resolve, reject, res)
            })
        })
    }

    create_user(username, password, email) {
        /* Creates an user and will give you an object with an API token to use from that point on. */

        let api_call = "/user/create?"
        let credentials = "username=" + username + "&password=" + password + "&email=" + email

        return new Promise((resolve, reject) => {
            const request = https.get(this.api + api_call + credentials, res => {
                this.api_call(resolve, reject, res)
            })
        })
    }

    api_post(api_call, file_path, resolve, reject) {
        const formData = {
            my_field: 'my_value',
            my_buffer: Buffer.from([1, 2, 3]),
            image: fs.createReadStream(file_path),
        };
        request.post({
            url: api_call,
            formData: formData
        }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                console.error('Upload failed:', err);
                return reject(err)
            }

            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(e)
            }
        });
    }

    api_download(api_call, output_file_path, resolve, reject) {
        const file = fs.createWriteStream(output_file_path);
        const request = https.get(api_call, function(response) {
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                console.log("Download Completed");
                resolve(file)
            });
        }).on('error', function(err) {
            reject(err)
        });
    }

    upload_image(token, file_path) {
        /* Uploads an image into the service */

        let api_call = this.api + "/media/upload?key=" + token

        return new Promise((resolve, reject) => {
            this.api_post(api_call, file_path, resolve, reject);
        })
    }

    download_image(token, media_id, new_extension, output_file_path) {
        /* Downloads a converted image from the service given a media_id */

        let api_call = this.api + "/media/get/" + media_id + "." + new_extension + "?key=" + token

        return new Promise((resolve, reject) => {
            this.api_download(api_call, output_file_path, resolve, reject);
        })
    }
}

module.exports = ImgAPI