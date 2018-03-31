const express = require('express'),
    request = require('request'),
    fs = require('fs');
    hbs = require('hbs'),
    darksky = require('./darksky.js'),

    port = process.env.PORT || 8080;

var app = express();
var weather = ''; //variable to hold the weather info

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getTime', () => {
    date = new Date();
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
});

hbs.registerHelper('upper', (text) => {
    return text.toUpperCase();
})

app.use(express.static(__dirname + '/public'));

// app.use((request, response, next) => {
//     var time = new Date().toString();
//     var log = `${time}: ${request.method} ${request.url}`;
//     fs.appendFile('server.log',  log + '\n', (error) => {
//         if (error) {
//             console.log('Unable to log message.')
//         }
//     })
//     next();
// });

// app.use((request, response, next) => {
//     response.render('maintenance.hbs', {
//         title: 'Index'
//     });
//     // next();
// });

app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: 'Index',
        name: 'Thanh Pham',
        studentNumber: 'A01028828'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        welcome: 'Hello.',
        name: 'Thanh Pham',
        studentNumber: 'A01028828'
    })
});

app.get('/weather', (request, response) => {
    response.render('weather.hbs', {
        title: 'Weather',
        name: 'Thanh Pham',
        studentNumber: 'A01028828',
        status: weather.status.toLowerCase(),
        temp: weather.temp,
        background: 'https://www.burgessyachts.com/media/adminforms/locations/l/o/london-1900x1080.jpg'
    })
});

app.get('/404', (request, response) => {
    response.send('Page not found!')
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
    // here add the logic to return the weather based on the statically provided location and save it inside the weather variable
    darksky.getWeather(51.509865, -0.118092).then((result) => {
        weather = result;
    });
});