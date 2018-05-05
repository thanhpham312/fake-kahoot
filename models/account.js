const db = require('./database')

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
