const request = require('request'),
    _ = require('lodash');

var getQuestionByCategory = (numberofQuestions = 10, category = 11, difficulty = 'medium', questionType = 'multiple') => {

    // if (page <= 0) {
    //     var page = String(Math.floor((Math.random()*50) + 1));
    // }
    
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
    getQuestionByCategory
};