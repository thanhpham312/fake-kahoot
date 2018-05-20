class Score {
  /**
   * @summary Create an instance of the user's score data
   * @name Score
   * @class
   * @public
   *
   * @param userScore Score of the user
   * @param currentStreak Current streak the user has for the quiz
   * @param highestStreak Highest streak the user has for the quiz
   *
   * @example
   * let currentScore = new Score()
   */
  constructor (userScore = 0, currentStreak = 0, highestStreak = 0) {
    this.userScore = userScore
    this.currentStreak = currentStreak
    this.highestStreak = highestStreak
  }

  /**
   * @summary Converts this classes data to an object
   * @method
   * @public
   *
   * @returns {{
   *  userScore: (number|*),
   *  currentStreak: (number|*),
   *  highestStreak: (number|*)
   * }}
   */
  toJSON () {
    return {
      'userScore': this.userScore,
      'currentStreak': this.currentStreak,
      'highestStreak': this.highestStreak
    }
  }
}

/**
 * exports Score class
 * @type {{Score: Score}}
 */
module.exports = {
  Score
}
