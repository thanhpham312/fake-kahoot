const request = require('request');

let secret = () => {
    return new Promise((resolve, reject) => {
        if (typeof lat === 'number' && typeof lon === 'number') {
            request({
                url: 'https://api.themoviedb.org/3/movie/550?api_key=686d996b7a847930b2a9d18cec90cad3'
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    let obj = {
                        'place': place,
                        'temp': body.currently.temperature,
                        'summary': body.currently.summary
                    };
                    resolve(obj)
                } else {
                    reject(body.error);
                }
            })
        } else {
            reject('REJECTED: Not numbers')
        }
    })
};

module.exports = {
    secret
};