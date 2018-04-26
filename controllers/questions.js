const opentdb = require('./opentdb'),
    user = require('../models/users')
    pointPerQuestion = 500,
    streakBonus = 200;

class Questions {
    constructor() {
        this.questionsList = []
        this.minimalquestionsList = []
    }

    getQuestions(numberofQuestions = 10, category = 11, difficulty = 'medium', questionType = 'multiple') {
        return new Promise((resolve, reject) => {
            opentdb.getQuestions(numberofQuestions, category, difficulty, questionType).then((result) => {
                this.questionsList = result;
                this.minimalquestionsList = []
                for (var i = 0; i < result.length; i++) {
                    this.minimalquestionsList.push({
                        "question": result[i].question,
                        "option1": result[i].option1,
                        "option2": result[i].option2,
                        "option3": result[i].option3,
                        "option4": result[i].option4,
                    });
                }
                resolve(this.minimalquestionsList)
            });
        });
    }

    /**
     * assessQuestionResult checks if user made the right choice by looking at the answer stored server-side. 
     */
    assessQuestionResult(userObject, questionNumber, chosenAnswer) {
        /**
         * @param {object} userObject - Object that contains current user's data including username, score, streak, etc.
         * @param {number} questionNumber - The current question to be assessed.
         * @param {number} chosenAnswer - The choice made by the user for the current question.
         * @returns {object} Object dictating wether the answer if right or wrong and the current user's data.
         */
        if (this.questionsList[questionNumber].answers == chosenAnswer) {
            
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
    storeQuizResult(userObject) {
        /**
         * @param {object} userObject - Current user who played the game
         */
        var date = new Date();
        timeStamp = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        user.storeUser(userObject.username, userObject.userScore, userObject.highestStreak, timeStamp)
    }
}




module.exports = {
    Questions,
};