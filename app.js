const opentdb = require('./controllers/opentdb')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const _ = require('lodash')
const users = require('./models/users')
const questions = require('./controllers/questions')
const port = process.env.PORT || 8080

let app = express()

let playingUsers = {}
let date = new Date()

// let currentUser = {
//     "username": '',
//     "userScore": 0,
//     "currentStreak": 0,
//     "highestStreak": 0
// };

let currentQuestionList

hbs.registerPartials(`${__dirname}/views/partials`)

app.set('view engine', 'hbs')

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

hbs.registerHelper('dummy', () => {
  return undefined
})

app.get('/', (request, response) => {
  response.render('index.hbs')
})

app.post('/storeuser', (request, response) => {
  if (currentUser.username !== '') {
    questions.storeQuizResult(currentUser)
    currentUser = {
      'username': '',
      'userScore': 0,
      'currentStreak': 0,
      'highestStreak': 0
    }
    response.send('Quiz result stored successfully!')
  } else {
    response.send('Unable to store quiz result!')
  }
})

app.post('/login', (request, response) => {
  var newUser = new users.User(request.body.username)
  var sessionCode = date.getTime().toString()
  playingUsers[sessionCode] = {}
  playingUsers[sessionCode].user = newUser
  response.send({
    'sessionCode': sessionCode
  })
})
/**
 * @desc function send get request to render leaderboards.hbs page, successful responce renders the page
 * @param {Object} request - Node.js request object
 * @param {Object} response - Node.js response object
 */
app.get('/leaderboard', (request, response) => {
  response.render('leaderboard.hbs', {
    list_of_user_data: user.getUsers(user.sortScores('scoreData'))
  })
})

app.post('/getquestions', (request, response) => {
  newQuestions = new questions.Questions()
  if (_.includes(Object.keys(playingUsers), request.body.sessioncode)) {
    playingUsers[request.body.sessioncode].questions = newQuestions
    newQuestions.getQuestions().then((result) => {
      response.send(result)
    })
  } else {
    response.send('Error')
  }

  // opentdb.getQuestions().then((result) => {
  //     currentQuestionList = result;
  //     minimalQuestionList = []
  //     for (var i = 0; i < result.length; i++) {
  //         minimalQuestionList.push({
  //             "question": result[i].question,
  //             "option1": result[i].option1,
  //             "option2": result[i].option2,
  //             "option3": result[i].option3,
  //             "option4": result[i].option4,
  //         })
  //     }
  //     response.send(minimalQuestionList);
  // });
})

app.post('/validateanswer', (request, response) => {
  var result = question.assessQuestionResult(currentQuestionList, currentUser, request.body.questionNumber, request.body.chosenAnswer)
  response.send(result)
})
/**
 * @desc function send get request to render about.hbs page, successful responce renders the page
 * @param {Object} request - Node.js request object
 * @param {Object} response - Node.js response object
 */
app.get('/about', (request, response) => {
  response.render('about.hbs')
})

/**
 * @desc if requested page is not found function renders 404 error page
 * @param {Object} request - Node.js request object
 * @param {Object} response - Node.js response object
 */
app.get('*', function (request, response) {
  response.render('404.hbs')
})
/**
 * @desc function notifies port number of the local server
 */
app.listen(port, () => {
  console.log(`Server is up on port 8080`)
})
