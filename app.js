const express = require('express');
const hbs = require('hbs');
const request = require('request');
const _ = require('lodash');
const tmdb = require('./controllers/tmdb');
const qriusity = require('./controllers/qriusity');
const bodyParser = require('body-parser')
const userScoreInfo = require('./models/users_data.json')
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));



app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

hbs.registerHelper('dummy', () => {
    return undefined;
});

app.get('/', (request, response) => {
    response.render('index.hbs');
});

app.post('/username', (request, response) => {
    user_name = request.body.user_name;

    if (user_name !== '') {
        response.send(user_name)
    }
    else {
        response.send('gfdgf')
    }
});

app.post('/storeuser', (request, response) => {
    return undefined;
})

app.get('/leaderboard', (request, response) => {
    user_data = 
    response.render('leaderboard.hbs')
});

app.post('/getquestions', (request, response) => {
    qriusity.getQuestionByCategory(17, 0).then((result) => {
        response.send(result);
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs');
});

app.listen(8080, () => {
    console.log(`Server is up on port 8080`);
});