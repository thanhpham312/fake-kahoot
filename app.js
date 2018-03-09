const express = require('express');
const request = require('request');

let app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/', (request, response) => {
   response.send()
});

app.listen(8080, () => {
    console.log(`Server is up on port 8080`)
});
