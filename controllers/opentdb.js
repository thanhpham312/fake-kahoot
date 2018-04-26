const request = require('request'),
    _ = require('lodash');

/**
 * getQuestions fetches question from the Open Trivia Database and returns the results in s formstted object.
 */
var getQuestions = (numberofQuestions = 10, category = 11, difficulty = 'medium', questionType = 'multiple') => {
    /**
     * @param {number} numberofQuestions - Number of questions to be generated.
     * @param {number} category - Category of questions.
     * @param {string} difficulty - Questions diffuculty. Could either be 'easy', 'medium', or 'hard'.
     * @param {string} questionType - Type of questions. Could either be 'multiple' or 'booleon'.
     * @throws {failed connection} Could not connect to opentdb.
     * @throws {invalid query} Invalid query.
     * @returns {object} A object with information about questions fetched from the API.
     */
    return new Promise((resolve, reject) => {
        request({
            url: `https://opentdb.com/api.php?amount=${encodeURIComponent(numberofQuestions)}&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}&type=${encodeURIComponent(questionType)}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Cannot connect to Open Trivia Database.');
            }
            else if(body.response_code == 400) {
                reject('Invalid query.');
            }
            else {
                // console.log(body.results)
                questionList = []
                for (var i = 0; i < body.results.length; i++) {
                    answerArray = body.results[i].incorrect_answers.slice()
                    answerArray.push(body.results[i].correct_answer)
                    answerArray = _.shuffle(answerArray)
                    questionList.push({
                        "question": body.results[i].question,
                        "option1": answerArray[0],
                        "option2": answerArray[1],
                        "option3": answerArray[2],
                        "option4": answerArray[3],
                        "answers": _.indexOf(answerArray, body.results[i].correct_answer) + 1
                    });
                }
                resolve(questionList);
            }
        });
    });
};

module.exports = {
    getQuestions
};