const log = console.log
const request = require("postman-request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWx5YW56YWhpZCIsImEiOiJja2hpanB2M3cwbnZkMnpwNnNwaWhnd3ZhIn0.Pm9HxBeq8U00rSX0k_BlKA&limit=1"

    request({url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback("Unable to connect to location services")
        }else if (body.features.length === 0){
            callback("Unable to find location")
        }else{
            callback(undefined, {
                lat: body.features[0].center[1], 
                lon: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
    })
} 
module.exports = geocode