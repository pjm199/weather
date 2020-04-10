console.log('Zio porco is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#msgOne')
const messageTwo = document.querySelector('#msgTwo')
// const map = L.mapbox.map('map')
//     		        .setView([data.longitude, data.latitudine], 11)
//     		    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
//messageOne.textContent = 'from js'
//messageTwo.textContent = 'Message two'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading ....'
    messageTwo.textContent = 'zio porco'

    //fetch('http://localhost:3333/weather?address=' + location).then((response) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            
            if (data.error) {
                messageOne.textContent = data.error
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.data
                console.log(data.longitude,' ',  data.latitudine)
                console.log(data)

                L.mapbox.accessToken = 'pk.eyJ1Ijoiam0xOTkiLCJhIjoiY2s4cDAyc3lqMDA2MjNlbzN4NmpxYW4xMiJ9.wvD_eKRXX2kzgs44yaUklg';
		        const map = L.mapbox.map('map')
    		        .setView([data.longitude, data.latitudine], 13)
    		    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
            }
        })
    })
})