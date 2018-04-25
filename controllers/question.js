const qriusity = require('./qriusity'),
    user = require('./user')
    pointPerQuestion = 500,
    streakBonus = 200;

/**
 * assessQuestionResult checks if user made the right choice by looking at the answer stored server-side. 
 */
var assessQuestionResult = (questionsObject, userObject, questionNumber, chosenAnswer) => {
    /**
     * @param {object} questionsObject - Object that contains question data stored server-side.
     * @param {object} userObject - Object that contains current user's data including username, score, streak, etc.
     * @param {number} questionNumber - The current question to be assessed.
     * @param {number} chosenAnswer - The choice made by the user for the current question.
     * @returns {object} Object dictating wether the answer if right or wrong and the current user's data.
     */
    if (questionsObject[questionNumber].answers == chosenAnswer) {
        
        userObject.userScore += pointPerQuestion + streakBonus*userObject.currentStreak;
        userObject.currentStreak++;
        if (userObject.currentStreak > userObject.highestStreak) {
            userObject.highestStreak = userObject.currentStreak;
        }

        return {
            "result": true,
            "currentUser": userObject
        };
    }
    else {
        userObject.currentStreak = 0;
        return {
            "result": false,
            "currentUser": userObject
        };
    }
}
/**
 *  storeQuizResult store current user results with date, score, streak, username to the database
 */
var storeQuizResult = (userObject) => {
    /**
     * 
     * @param {object} userObject - Current user who played the game
     */
    var date = new Date();
    timeStamp = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    user.storeUser(userObject.username, userObject.userScore, userObject.highestStreak, timeStamp)
}

module.exports = {
    assessQuestionResult,
    storeQuizResult
};