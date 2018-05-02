/**
 * @desc Import module from open Trivia DB and assign opentdb as constant.
 * @type {Object}
 */
const opentdb = require('./controllers/opentdb')
/**
 * @desc Import express module and assign express as constant.
 * @type {*|createApplication}
 */
const express = require('express')
/**
 * @desc Import hbs module and assign hbs as constant.
 * @type {Instance}
 */
const hbs = require('hbs')
/**
 * @desc Import bodyparser module to create middleware.
 * @type {Parsers|*}
 */
const bodyParser = require('body-parser')
/**
 * @desc Import lodash library and assign _ as constant.
 * @type {function(*): Object}
 * @private
 */
const _ = require('lodash')
/**
 * @desc Import user library and assign users as constant.
 * @type {{Users: Users, User: User}}
 */
const users = require('./models/users')
/**
 * @desc Import Question library and assign questions as constant.
 * @type {{Questions: Questions}}
 */
const questions = require('./controllers/questions')
/**
 * @desc Import environment variable port module and assign port equal to 8080.
 * @type {*|number}
 */
const port = process.env.PORT || 8080

let app = express()

let playingUsers = {}

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
  let sessionCode = request.body.sessioncode
  if (_.includes(Object.keys(playingUsers), sessionCode)) {
    let userList = new users.Users()
    let userObject = playingUsers[sessionCode].user
    userList.storeUser(userObject)
    delete playingUsers[sessionCode]
    console.log(playingUsers)
    response.send('Quiz result stored successfully!')
  } else {
    response.send('Unable to store quiz result!')
  }
})

app.post('/login', (request, response) => {
  let date = new Date()
  let newUser = new users.User(request.body.username)
  let sessionCode = date.getTime().toString()
  playingUsers[sessionCode] = {}
  playingUsers[sessionCode].user = newUser
  response.send({
    'sessionCode': sessionCode,
    'userObject': newUser
  })
})

/**
 * @desc function send get request to render leaderboards.hbs page, successful responce renders the page
 * @param {Object} request - Node.js request object
 * @param {Object} response - Node.js response object
 */
app.get('/leaderboard', (request, response) => {
  let userList = new users.Users()
  response.render('leaderboard.hbs', {
    list_of_user_data: userList.displayTopUsers()
  })
})

/**
 *
 */
app.post('/getquestions', (request, response) => {
  let newQuestions = new questions.Questions()
  if (_.includes(Object.keys(playingUsers), request.body.sessioncode)) {
    playingUsers[request.body.sessioncode].questions = newQuestions
    newQuestions.getQuestions().then((result) => {
      response.send(result)
    })
  } else {
    response.send('Error')
  }
})

/**
 *
 */
app.post('/validateanswer', (request, response) => {
  if (_.includes(Object.keys(playingUsers), request.body.sessioncode)) {
    let sessionCode = request.body.sessioncode
    let userObject = playingUsers[sessionCode].user
    let questionsObject = playingUsers[sessionCode].questions

    let result = questionsObject.assessQuestionResult(
      userObject,
      request.body.questionNumber,
      request.body.chosenAnswer
    )
    response.send(result)
  } else {
    response.send(400)
  }
})
/**
 * @desc function send get request to render about.hbs page, successful responce renders the page
 * @param {Object} request - Node.js request object
 * @param {Object} response - Node.js response object
 */
app.get('/about', (request, response) => {
  response.render('about.hbs')
})

app.get('/signin', (request, response) => {
  response.render('signIn.hbs')
})

app.get('/signup', (request, response) => {
  response.render('signUp.hbs')
})

/**
 * @desc if requested page is not found function renders 404 error page
 * @param {Object} request - Node.js request object
 * @param {Object} response - Node.js response object
 */
app.get('*', (request, response) => {
  response.render('404.hbs')
})

/**
 * @desc function notifies port number of the local server
 */
app.listen(port, () => {
  console.log(`Server is up on port 8080`)
})
