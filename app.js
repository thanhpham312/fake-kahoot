const qriusity = require('./controllers/qriusity'),
    express = require('express'),
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    request = require('request'),
    _ = require('lodash'),
    user = require('./controllers/user'),
    question = require('./controllers/question');

const port = process.env.PORT || 8080;

let app = express();
let currentUser = {
    "username": '',
    "userScore": 0,
    "currentStreak": 0,
    "highestStreak": 0
};

let currentQuestionList = undefined;

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

app.post('/storeuser', (request, response) => {
    // var reqBody = request.body,
    //     score = reqBody.score,
    //     username = reqBody.username,
    //     highestStreak = reqBody.highesgttStreak,
    //     quizTime = reqBody.quizTime;

    // console.log(reqBody);
    // user.storeUser(username, score, highestStreak, quizTime);
    if (currentUser.username != '') {
        question.storeQuizResult(currentUser);
        currentUser = {
            "username": '',
            "userScore": 0,
            "currentStreak": 0,
            "highestStreak": 0
        };
        response.send('Quiz result stored successfully!')
    }
    else {
        response.send('Unable to store quiz result!')
    }
});

app.post('/login', (request, response) => {
    currentUser.username = request.body.username;
    response.send('Login successful!')
})


app.get('/leaderboard', (request, response) => {
    response.render('leaderboard.hbs', {
        list_of_user_data: user.getUsers(user.sortScores("scoreData"))
    })
});

app.post('/getquestions', (request, response) => {
    qriusity.getQuestionByCategory(17, 0).then((result) => {
        currentQuestionList = result;
        minimalQuestionList = []
        for (var i = 0; i < result.length; i++) {
            minimalQuestionList.push({
                "question": result[i].question,
                "option1": result[i].option1,
                "option2": result[i].option2,
                "option3": result[i].option3,
                "option4": result[i].option4,
            })
        }
        response.send(minimalQuestionList);
    });
});

app.post('/validateanswer', (request, response) => {
    var result = question.assessQuestionResult(currentQuestionList, currentUser, request.body.questionNumber, request.body.chosenAnswer);
    response.send(result)
})

app.get('/about', (request, response) => {
    response.render('about.hbs');
});

app.get('*', function(request, response){
    response.render('404.hbs');
});

app.listen(port, () => {
    console.log(`Server is up on port 8080`);
});