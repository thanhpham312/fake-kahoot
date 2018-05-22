/* eslint-env jest */
const score = require.requireActual('../models/score')

let scoreInst

beforeEach(() => {
  scoreInst = new score.Score()
})

afterEach(() => {
  scoreInst = undefined
})

describe('Testing Score', () => {
  it('should return an object of score attributes', () => {
    expect(scoreInst.toJSON()).toEqual({
      userScore: expect.anything(),
      currentStreak: expect.anything(),
      highestStreak: expect.anything()
    })
  })

  it('should resolve HTML', async () => {
    await expect(scoreInst.getLeaderboardStats()).resolves.toBeTruthy()
  })
})