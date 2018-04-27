const request = require('request')

/**
 * @deprecated use getQuestionByCategory instead of this
 */
var getQuestionByCategory = (categoryID, page = 0, limit = 10) => {
/**
 *
 * @param   {number} categoryID - this is the cateogry ID for the questions you want use. We use 17 which is movies
 * @param   {number} page - the page you want to pull questions from, 0 means random page
 * @param   {number} limit - the number of questions you want to pull, 10 questions for our case
 * @throws  {connection error} Cannot reach qriusity
 * @return  {object} A llist of questions.
 */
  if (page <= 0) {
    page = String(Math.floor((Math.random() * 50) + 1))
  }

  return new Promise((resolve, reject) => {
    request({
      url: 'https://qriusity.com/v1/categories/' + encodeURIComponent(categoryID.toString()) + '/questions?page=' + encodeURIComponent(page.toString()) + '&limit=' + encodeURIComponent(limit.toString()),
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Cannot connect to TMDB.')
      } else if (body.code === 400) {
        reject('Invalid query.')
      } else {
        resolve(body)
      }
    })
  })
}

/**
 * @deprecated use getQuestionByCategory in opentdb.js instead of this
 */
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
}
