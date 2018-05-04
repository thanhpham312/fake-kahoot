/* eslint-env jest */
const opentdb = require('../models/opentdb')
const promiseTest = opentdb.getQuestions()
const invalidPromiseTest = opentdb.getQuestions(
  numberofQuestions = 1,
  category = 1,
  difficulty = 1,
  questionType = 2
)

const invalidPromiseTest2 = opentdb.getQuestions

const testStructure = {
  question: expect.anything(),
  option1: expect.anything(),
  option2: expect.anything(),
  option3: expect.anything(),
  option4: expect.anything(),
  answers: expect.anything()
}

describe('Testing the Open Trivia Database API', () => {
  test('Check if API call is not undefined', () => {
    expect.assertions(1)
    return promiseTest.then(data => {
      expect(data[0]).toEqual(testStructure)
    })
  })
})

test('Promise test 2 (different way)', () => {
  expect.assertions(1)
  return invalidPromiseTest.catch(error => {
    console.log(error.message)
    expect(error.message).toBe('Invalid Parameter')
  })
})

describe.only('testDB', () => {
  test('db 2', () => {
    expect(invalidPromiseTest2(
      numberofQuestions = 1,
      category = 1,
      difficulty = 1,
      questionType = 2
    )).rejects.toThrow('Invalid Parameter')
  })
})
