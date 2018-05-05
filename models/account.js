
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
    return undefined
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
    exe.then((result) =>{
      return result
    })
    return undefined
  }


  validateUsername (USERNAME) {
    return new Promise((resolve,reject) => {
      db.executeQuery('SELECT "USERNAME" FROM "ACCOUNTS"').then((result) => {
        console.log(result)
        let user_array = JSON.parse(result)
        var found = user_array.some(function (el) {
          return el.USERNAME === USERNAME;
        });
        resolve(!found)
      })
      
    })
  }
}

module.exports = {
  Account
}
