/* eslint-env jest */
const opentdb = require('../models/opentdb')
const questions = require('../controllers/questions')
const usersM = require('../models/users')
const promiseTest = opentdb.getQuestions()
const invalidPromiseTestCatch = opentdb.getQuestions(
  numberofQuestions = 1,
  category = 1,
  difficulty = 1,
  questionType = 2
)

const invalidPromiseTest = opentdb.getQuestions

describe('Testing the Open Trivia Database API', () => {
  test('Check data structure', () => {
    let testStructure = {
      question: expect.anything(),
      option1: expect.anything(),
      option2: expect.anything(),
      option3: expect.anything(),
      option4: expect.anything(),
      answers: expect.anything()
    }
    expect.assertions(1)
    return promiseTest.then(data => {
      console.log(data[0])
      expect(data[0]).toEqual(testStructure)
    })
  })

  test('Test Invalid Parameter Rejection using reject', () => {
    expect(invalidPromiseTest(
      numberofQuestions = 1,
      category = 1,
      difficulty = 1,
      questionType = 2
    )).rejects.toThrow('Invalid Parameter')
  })

  test('Promise test 2 by catching error and comparing the message', () => {
    expect.assertions(1)
    return invalidPromiseTestCatch.catch(error => {
      console.log(error.message)
      expect(error.message).toBe('Invalid Parameter')
    })
  })

  test('test getQuestions', () => {
    let testStructure = {
      question: expect.anything(),
      option1: expect.anything(),
      option2: expect.anything(),
      option3: expect.anything(),
      option4: expect.anything()
    }
    let instanceQuestions = new questions.Questions()
    expect.assertions(1)
    return instanceQuestions.getQuestions().then(data => {
      expect(data[0]).toEqual(testStructure)
    })
  })
})

describe('Testing user registration/login', () => { 
  // Template for registration test
  test('Registering users work as expected', async () => {
    let username = 'jestUser',
        password = 'jestUser';
    await expect(Account.register(username, password)).resolves.toEqual({
      reason: 'You have successfully registered!',
    });
  })

  // Template for login test
  test('Login work as expected', async () => {
    let username = 'jestUser',
        password = 'jestUser';
    await expect(Account.login(username, password)).resolves.toEqual(true);
  }) 
}) 

  