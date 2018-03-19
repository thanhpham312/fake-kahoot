const express = require('express');
const hbs = require('hbs');
const request = require('request');

let app = express();



hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(`${__dirname}/public`));

app.get('/', (request, response) => {
    response.render('main.hbs', {
        title: 'Login'
    })
});

app.get('/app', (request, response) => {
    response.render('app.hbs', {
        title: 'App'
    })
});

app.listen(8080, () => {
    console.log(`Server is up on port 8080`)
});
