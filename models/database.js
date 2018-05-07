const {Client} = require('pg')

let executeQuery = (query) => {
  let client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(query, (err, res) => {
      if (err) {
        reject(new Error('DB Query failed'))
      } else {
        if (res.command === 'SELECT') {
          let result = JSON.stringify(res.rows)
          client.end()
          resolve(result)
        } else {
          client.end()
          resolve(true)
        }
      }
    })
  })
}

let getUsersList = () => {
  executeQuery('SELECT * FROM public."ACCOUNTS";').then(data => {
    let pdata = JSON.parse(data)
    // console.log(pdata[0].ACCOUNT_ID)
    // console.log(pdata[0].USERNAME)
    // console.log(pdata[0].PASSWORD)
  })
}

module.exports = {
  executeQuery,
  getUsersList
}
