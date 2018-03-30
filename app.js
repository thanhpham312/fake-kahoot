const express = require('express');
const hbs = require('hbs');
const request = require('request');
const _ = require('lodash')
const tmdb = require('./tmdb');

let app = express();

var currentMovieList = []

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('dummy', () => {
    return undefined;
});

app.get('/', (request, response) => {
    response.render('index.hbs');
});

app.get('/test', (request, response) => {
    tmdb.getMovieListByGenre().then((result) => {
        return tmdb.getMovieDetailList(result);
    }).then((result) => {
        currentMovieList = result;
        response.send(currentMovieList);
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs');
});

app.listen(8080, () => {
    console.log(`Server is up on port 8080`);

    // Dummy code to generate a list of action movie
});
>>>>>>> 07202c8f1f49632bf2c7447150d4839f4cee2429
