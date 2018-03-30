const express = require('express');
const hbs = require('hbs');
const request = require('request');
const _ = require('lodash');
const tmdb = require('./tmdb');
let app = express();

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
        response.send(result);
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs');
});

app.listen(8080, () => {
    console.log(`Server is up on port 8080`);
});