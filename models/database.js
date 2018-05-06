const {Client} = require('pg')

let executeQuery = (query) => {
  let client = new Client({
    connectionString: process.env.DATABASE_URL
  })
  // console.log(process.env.DATABASE_URL)
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(query, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        if (res.command === 'SELECT') {
          let result = JSON.stringify(res.rows)
          client.end()
          resolve(result)
        } else {
          client.end()
          reject(new Error('get off my back'))
        }
      }
    })
  })
}

let getUsersList = () => {
  executeQuery('SELECT * FROM public."ACCOUNTS";').then(data => {
    let pdata = JSON.parse(data)
    console.log(pdata[0].ACCOUNT_ID)
    console.log(pdata[0].USERNAME)
    console.log(pdata[0].PASSWORD)
  })
}
getUsersList()

module.exports = {
  executeQuery,
  getUsersList
}
