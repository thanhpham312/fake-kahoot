const request = require('request');

var getMovie = (movieID = 0) => {

    if (movieID === 0) {
        var movieID = String(Math.floor((Math.random()*500) + 11));
    }
    
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.themoviedb.org/3/movie/' + movieID + '?api_key=686d996b7a847930b2a9d18cec90cad3',
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Cannot connect to TMDB.');
            }
            else if(body.code == 400) {
                reject('The given location is invalid.');
            }
            else {
                resolve(body);   
            }
        });
    });
};

var getMovieListByGenre = (genreID, pageCount) => {
    
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.themoviedb.org/3/discover/movie?api_key=686d996b7a847930b2a9d18cec90cad3&with_genres=' + encodeURIComponent(genreID) + '&page=' + encodeURIComponent(pageCount),
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Cannot connect to TMDB.');
            }
            else if(body.code == 400) {
                reject('The given location is invalid.');
            }
            else {
                resolve(body.results);   
            }
        });
    });
}

module.exports = {
    getMovie,
    getMovieListByGenre
}