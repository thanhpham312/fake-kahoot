const qriusity = require('./qriusity'),
    user = require('./user')
    pointPerQuestion = 500,
    streakBonus = 200;
/**
 * @desc function checks if user had given the right answer to a question and returns the result object
 * @param {Object} param.questionsObject - object contains question data
 * @param {Object} param.userObject - object contains user data
 * @param {number} param.questionNumber - number of a fakoot question
 * @param {number} param.chosenAnswer - number of a question that user chose as an answer
 * @return {Object} result of the fakoot round
 */
var assessQuestionResult = (questionsObject, userObject, questionNumber, chosenAnswer) => {

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

var storeQuizResult = (userObject) => {
    var date = new Date();
    timeStamp = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    user.storeUser(userObject.username, userObject.userScore, userObject.highestStreak, timeStamp)
}

module.exports = {
    assessQuestionResult,
    storeQuizResult
};