const request = require("postman-request")
const log = console.log

const forecast = (lat, lon, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9e4303dc9d543faeebea16faad989ac2&query=" + lat + "," + lon 
    request({ url, json: true }, (error, {body}={}) => {
        if(error){
            callback("Unable to connect to weather forecast")
        }else if(body.error){
            callback("Unable to find the location")
        }else {
            const data = body.current
            callback(undefined, {
                desc: data.weather_descriptions[0], 
                temp: data.temperature, 
                precip: data.precip, 
                feelslike: data.feelslike,
                text: "It is currently " + data.weather_descriptions[0] + " with temperature being " + data.temperature + "C but it feels like " + data.feelslike + "C with " + data.precip + "% chance of rain"
            })
        }
    })
}
module.exports = forecast