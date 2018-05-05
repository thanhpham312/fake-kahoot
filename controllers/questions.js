const opentdb = require('../models/opentdb')
const user = require('../models/users')
const pointPerQuestion = 500
const streakBonus = 200

/**
 *
 */
class Questions {
  /**
   *
   */
  constructor () {
    this.questionsList = []
    this.minimalquestionsList = []
  }

  /**
   * Gets a list of questions with the answer property removed.
   * @param numberofQuestions
   * @param category
   * @param difficulty
   * @param questionType
   * @returns {Promise<any>}
   */
  getQuestions (numberofQuestions = '10', category = '11', difficulty = 'medium', questionType = 'multiple') {
    return new Promise((resolve, reject) => {
      opentdb.getQuestions(numberofQuestions, category, difficulty, questionType).then((result) => {
        this.questionsList = result
        this.minimalquestionsList = []
        for (let i = 0; i < result.length; i++) {
          this.minimalquestionsList.push({
            'question': result[i].question,
            'option1': result[i].option1,
            'option2': result[i].option2,
            'option3': result[i].option3,
            'option4': result[i].option4
          })
        }
        resolve(this.minimalquestionsList)
      })
    })
  }

  /**
   * assessQuestionResult checks if user made the right choice by looking at the answer stored server-side.
   * @param userObject Object that contains current user's data including username, score, streak, etc.
   * @param questionNumber The current question to be assessed.
   * @param chosenAnswer The choice made by the user for the current question.
   * @returns {{result: boolean, currentUser: *}} Object dictating wether the answer if right or wrong and the current user's data.
   */
  assessQuestionResult (userObject, questionNumber, chosenAnswer) {
    if (this.questionsList[questionNumber].answers === Number(chosenAnswer)) {
      userObject.userScore += pointPerQuestion + streakBonus * userObject.currentStreak
      userObject.currentStreak++
      if (userObject.currentStreak > userObject.highestStreak) {
        userObject.highestStreak = userObject.currentStreak
      }

      return {
        'result': true,
        'currentUser': userObject
      }
    } else {
      userObject.currentStreak = 0
      return {
        'result': false,
        'currentUser': userObject
      }
    }
  }

  /**'
   * @deprecated using a database now
   * storeQuizResult store current user results with date, score, streak, username to the database
   * @param userObject Current user who played the game
   */
  storeQuizResult (userObject) {
    let date = new Date()
    let timeStamp = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    user.storeUser(userObject.username, userObject.userScore, userObject.highestStreak, timeStamp)
  }
}

/**
 * Exports the Questions Class
 * @type {{Questions: Questions}}
 */
module.exports = {
  Questions
}
