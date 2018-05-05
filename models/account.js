const database = require('./database')
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
    return undefined
  }
}

module.exports = {
  Account
}
