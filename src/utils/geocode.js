const request = require("request")


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWVobWV0dGVrIiwiYSI6ImNrY2lpYzRyNDB6bW8ycnFxdjdtNWF5OW8ifQ.50GXteuqZMp9iziUCcxHeA&limit=1"
    request({ url, json:true}, (error,{ body }) => {
        if (error) {
            callback("not connected", undefined)
        } else if (body.features.length === 0) {
            callback("not location", undefined)
        } else {
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name  
            })
        }
    })
}


module.exports = geocode