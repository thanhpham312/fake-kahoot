const {Client} = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL
})

let executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(query, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        if (res.command === 'SELECT') {
          resolve(JSON.stringify(res.rows))
        } else {
          resolve(true)
        }
      }
    })
  })
}

module.exports = {
  executeQuery
}
