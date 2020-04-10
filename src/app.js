const port = process.env.PORT || 3000

const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const geocode = require('./geocode')
//const forecast = require('./forecast')

const app = express()
const request = require('postman-request')
// Define path for Express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// ------------------
// Goecode function()
// ------------------
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
//--------------------
// Forecast function()
//--------------------
const forecast = (lat, lon, callback) => {

    console.log('Forecast just inside', lat, lon)

    const forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=379733c2156d0012a1f037c90e97a4d8'

    request({ url: forecastUrl, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect ', undefined)
        } else if (response.body.length === 0) {
            callback('Coordinate non correte!', undefined)
        } else {
            callback(undefined, {
                data: response.body.current.weather[0].main
            })
        }
    })
}

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
         res.render('index', {
             title: 'Weather App',
             name: 'Gino PinoLino'
         })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Meat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help page only for you',
        title: 'Help',
        name: 'Zio Giuseppe!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Devi inserire un Indirizzo Belina...'
        })
    }
    //console.log(req.query)
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
                latitudine: latitude,
                longitude: longitude
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Devi inserire una query...'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404'), {
        title: '404', 
        name: 'Andrew',
        errorMessage: 'Page not found.'
        
    }
})
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
app.listen(port, () => {
    console.log('Server up on port :'+ port)
})
