/* eslint-env jest */
const userQuestions = require.requireActual('../models/userQuestions')
const db = require.requireActual('../models/database')

beforeAll(async () => {
  await db.executeQuery(
    `INSERT INTO public."ACCOUNTS" VALUES ($1, $2, $3);`, ['0', 'test', 'test'])
    .then(result => {
      return result
    })
})

afterAll(async () => {
  await db.executeQuery(
    `DELETE FROM public."QUESTIONS" WHERE "QUESTION_CONTENT" =` +
    `'What is my name?';`, [])
  await db.executeQuery(
    `DELETE FROM public."ACCOUNTS" WHERE "USERNAME" = 'test';`, [])
})

test('Test if createQuestion works', async () => {
  await userQuestions.createQuestion(
    'What is my name?',
    'Shanyu',
    'Pedram',
    'Derek',
    'Maksym',
    0
  ).then(result => {
    expect.assertions(1)
    expect(result).toBeTruthy()
  })
})

test('Test if createQuestion validation works (empty input)', async () => {
  await userQuestions.createQuestion(
    'What is my name?',
    '',
    'Pedram',
    'Derek',
    'Maksym',
    0
  ).then(result => {
    expect.assertions(1)
    expect(result).toBeFalsy()
  })
})

test('Test if createQuestion validation works (same answers)', async () => {
  await userQuestions.createQuestion(
    'What is my name?',
    'Shanyu',
    'Shanyu',
    'Derek',
    'Maksym',
    0
  ).then(result => {
    expect.assertions(1)
    expect(result).toBeFalsy()
  })
})

it('should ', () => {
  db.executeQuery(
    `SELECT * FROM public."ACCOUNTS";`
  ).then(res1 => {
    expect.assertions(2)
    expect(res1).toBeTruthy()
  })
})

test('Test if getRandomQuestions() works', async () => {
  expect.assertions(1)
  await expect(userQuestions.getRandomQuestions()).resolves.toBeTruthy()
})
