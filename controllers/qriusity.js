const request = require('request');

var getQuestionByCategory = (categoryID, page = 0, limit = 10) => {

    if (page <= 0) {
        page = String(Math.floor((Math.random()*50) + 1));
    }
    
    return new Promise((resolve, reject) => {
        request({
            url: 'https://qriusity.com/v1/categories/' + encodeURIComponent(categoryID.toString()) + '/questions?page=' + encodeURIComponent(page.toString()) + '&limit=' + encodeURIComponent(limit.toString()),
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Cannot connect to TMDB.');
            }
            else if(body.code === 400) {
                reject('Invalid query.');
            }
            else {
                resolve(body);   
            }
        });
    });
};

let getQuestionsNewApi = (questionAmount, categoryType) => {
	return new Promise((resolve, reject) => {
		request({
			url: `https://opentdb.com/api.php?amount=${encodeURIComponent(questionAmount)}&category=${encodeURIComponent(categoryType)}&type=multiple`,
			json: true
		}, (error, response, body) => {
			if (error) {
				reject(`can't connect`)
			} else {
				resolve(body)
			}
			// console.log(response)
			// console.log(body)
		})
	})

}

module.exports = {
	getQuestionByCategory,
	getQuestionsNewApi
};