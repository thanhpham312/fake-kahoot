
const db = require('./database')
const bcrypt = require('bcrypt')
const saltRounds = 10

class Account {
  constructor () {
    this.username = undefined
    this.password = undefined
    this.userID = undefined
  }

  /**
   * @desc [To be determined]
   * @returns {undefined}
   */
  login (username, password) {
    return new Promise((resolve, reject) => {
      this.encryptPassword(password).then((result) => {
        db.executeQuery(`SELECT * FROM public."ACCOUNTS" WHERE "USERNAME" = '${username}' AND "PASSWORD" = '${result}';`).then((queryResult) => {
          if (queryResult.length > 0) {
            this.username = queryResult[0].USERNAME
            this.password = queryResult[0].PASSWORD
            this.userID = queryResult[0].ACCOUNT_ID
            resolve(true)
          } else {
            reject(false)
          }
        })
      })
    })
  }

  encryptPassword (password) {
    bcrypt.hash(password, saltRounds).then((hash) => {
      return hash
    })
  }

  /**
   * @desc [To be determined]
   * @returns {undefined}
   */
  register (username, password) {
    return new Promise((resolve, reject) => {
      this.encryptPassword(password).then((result) => {
        db.executeQuery(`INSERT INTO public."ACCOUNTS"("USERNAME", "PASSWORD") VALUES ('${username}', '${result}');`).then((result) => {
          resolve(result)
        })
      })
    })
  }

  validateUsername (USERNAME) {
    return new Promise((resolve, reject) => {
      db.executeQuery('SELECT "USERNAME" FROM "ACCOUNTS"').then((result) => {
        console.log(result)
        let userArray = JSON.parse(result)
        var found = userArray.some(function (el) {
          return el.USERNAME === USERNAME
        })
        resolve(!found)
      })
    })
  }

  validatePassword (pass) {
    var numbers = pass.match(/\d+/g)
    var uppers = pass.match(/[A-Z]/)
    var lowers = pass.match(/[a-z]/)
    var lengths = pass.length >= 6
    var valid = undefined

    if (numbers === null || uppers === null || lowers === null || lengths === false) valid = false

    if (numbers !== null && uppers !== null && lowers !== null && lengths) valid = true

    return valid
  }
}

module.exports = {
  Account
}
