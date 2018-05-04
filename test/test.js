/* eslint-env jest */
const opentdb = require('../models/opentdb')
const questions = require('../controllers/questions')
const promiseTest = opentdb.getQuestions()
const invalidPromiseTestCatch = opentdb.getQuestions(
  numberofQuestions = 1,
  category = 1,
  difficulty = 1,
  questionType = 2
)

const invalidPromiseTest = opentdb.getQuestions

const testStructure = {
  question: expect.anything(),
  option1: expect.anything(),
  option2: expect.anything(),
  option3: expect.anything(),
  option4: expect.anything(),
  answers: expect.anything()
}

describe.skip('Testing the Open Trivia Database API', () => {
  test('Check data structure', () => {
    expect.assertions(1)
    return promiseTest.then(data => {
      expect(data[0]).toEqual(testStructure)
    })
  })

  test('Test Invalid Parameter Rejection', () => {
    expect(invalidPromiseTest(
      numberofQuestions = 1,
      category = 1,
      difficulty = 1,
      questionType = 2
    )).rejects.toThrow('Invalid Parameter')
  })

  test('Promise test 2 (different way)', () => {
    expect.assertions(1)
    return invalidPromiseTestCatch.catch(error => {
      console.log(error.message)
      expect(error.message).toBe('Invalid Parameter')
    })
  })
})

describe('Testing getQuestions from questions.js', () => {
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

test('', () => {

})