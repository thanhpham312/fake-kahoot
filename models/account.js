
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
    return new Promise((resolve,reject) => {
      db.executeQuery(`INSERT INTO public."ACCOUNTS"("USERNAME", "PASSWORD") VALUES ('${username}', '${password}');`).then((result) =>{
        resolve(result)
      })
    })
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

  validatePassword (pass) {
    var numbers = pass.match(/\d+/g);
    var uppers  = pass.match(/[A-Z]/);
    var lowers  = pass.match(/[a-z]/);
    var lengths = pass.length>=6;
    var valid = undefined;

    if (numbers === null || uppers === null || lowers === null || lengths === false)
        valid = false;

    if (numbers !== null && uppers !== null && lowers !== null && lengths)
        valid = true;

    return valid;
  }
}

module.exports = {
  Account
}
