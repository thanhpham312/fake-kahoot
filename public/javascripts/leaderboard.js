let categoryType = document.getElementById('ltrivia_category')
let difficultyType = document.getElementById('ltrivia_difficulty')
let scoreDisplay = document.getElementById('scoreDisplay')

/**
 * @module
 */

/**
 * @function
 */
let displayQuizResultCateogry = () => {
  let diffType = difficultyType.options[difficultyType.selectedIndex].value
  let categType = categoryType.options[categoryType.selectedIndex].value
  serverRequest(
    'POST',
    '/leaderboardCategory',
    `chosenCategory=${categType}
    &chosenDifficulty=${diffType}`, (xmlhttp) => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        scoreDisplay.innerHTML = '<div class="scoreDisplayRow scoreDisplayRowHeader">\n' +
                '<div id="userRank" class="leaderboardDisplayColumn">\n' +
                '<p class="displayInfo">RANK</p>\n' +
                '</div>\n' +
                '<div id="userName" class="leaderboardDisplayColumn">\n' +
                '<p class="displayInfo", id="scoreTextSort">NAME</p>\n' +
                '</div>\n' +
                '<div id="userStreak" class="leaderboardDisplayColumn">\n' +
                '<p class="displayInfo">STREAK</p>\n' +
                '</div>\n' +
                '<div id="userScore" class="leaderboardDisplayColumn">\n' +
                '<p class="displayInfo">SCORE</p>\n' +
                '</div>\n' +
                '<div id="userDate" class="leaderboardDisplayColumn">\n' +
                '<p class="displayInfo">DATE</p>\n' +
                '</div>\n' +
                '</div>\n'
        console.log(scoreDisplay.innerHTML)
        scoreDisplay.innerHTML += xmlhttp.responseText
      }
    })
}

displayQuizResultCateogry()
