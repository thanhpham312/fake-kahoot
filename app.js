const express = require('express');
const hbs = require('hbs');
const request = require('request');
const _ = require('lodash')
const tmdb = require('./tmdb');

let app = express();

var currentMovieList = []

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('index.hbs');
});

app.get('/test', (request, response) => {
    response.send(currentMovieList);
});

app.get('/about', (request, response) => {
    response.render('about.hbs');
});

app.listen(8080, () => {
    console.log(`Server is up on port 8080`);

    // Dummy code to generate a list of action movie

    for (var i = 1; i <= 5; i++) {
        tmdb.getMovieListByGenre(28, i).then((result) => {
            currentMovieList = currentMovieList.concat(result);
        });
    }
});