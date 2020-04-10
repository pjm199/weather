const request = require('postman-request')
const  geocode = (address, callback) => {

    //console.log(address)
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoiam0xOTkiLCJhIjoiY2s4cDAyc3lqMDA2MjNlbzN4NmpxYW4xMiJ9.wvD_eKRXX2kzgs44yaUklg'

    request({ url: geourl, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect ', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode