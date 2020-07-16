const request = require("request")


const forecast = (latitude,longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=bd3b9156a47001c5e9812ebfb59884ac&query=" + latitude + "," +longitude 
    request({ url, json:true}, (error,{ body }) => {
        if (error) {
            callback("not connected", undefined)
        } else if (body.error) {
            callback("not location", undefined)
        } else {
            callback(undefined, body.current.temperature)
        }
    })
}


module.exports = forecast