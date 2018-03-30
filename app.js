const express = require('express');
const hbs = require('hbs');
const request = require('request');
const _ = require('lodash');
const tmdb = require('./tmdb');
const q_gen = require('./question_generator');

let app = express();

let currentMovieList = [];

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('dummy', () => {
    return undefined
});

app.get('/questions', (request, response) => {
    tmdb.getMovieListByGenre().then((result) => {
        return tmdb.getMovieDetailList(result)
    }).then((result) => {
        return q_gen.question_generator(result)
    }).then((result) => {
        // console.log(result);
        response.send(result)
    });
});

app.get('/', (request, response) => {
    response.render('index.hbs');
});

app.get('/about', (request, response) => {
    response.render('about.hbs');
});

app.listen(8080, () => {
    console.log(`Server is up on port 8080`);

    // Dummy code to generate a list of action movie
});