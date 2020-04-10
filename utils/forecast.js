const request = require('postman-request')

const  forecast = (lat, lon, callback) => {

    console.log('just inside', lat, lon)

    const forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=379733c2156d0012a1f037c90e97a4d8'

    request({ url: forecastUrl, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect ', undefined)
        } else if (response.body.length === 0) {
            callback('Coordinate non correte!', undefined)
        } else {
            callback(undefined, {
                //data: response.body
                //data: response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.'
        
                //pressure: response.body.current.pressure,
                //temperature: response.body.current.temp,
                data: response.body.current.weather[0].main
                //timezone: response.body.timezone

                   
//
            })
        }
    })
}

module.exports = forecast