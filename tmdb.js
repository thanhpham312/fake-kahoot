const request = require('request');
const _ = require('lodash');

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
                reject('Invalid query.');
            }
            else {
                resolve(body);   
            }
        });
    });
};

var getMovieDetailList = (movieList) => {
    movieDetailList = [];
    selectedMovieList = _.sampleSize(movieList, 10)
    return new Promise((resolve, reject) => {
        movieCount = 0;
        currentFullMovieList = [];
        for (var i = 0; i < 10; i++) {
            getMovie(selectedMovieList[i].id).then((result) => {
                movieDetailList.push(result);
                movieCount++;
                if(movieCount == 10) {
                    resolve(movieDetailList);
                }
            })
        }
    });
}

var getMovieListByGenrePerPage = (genreID, pageCount) => {
    
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.themoviedb.org/3/discover/movie?api_key=686d996b7a847930b2a9d18cec90cad3&with_genres=' + encodeURIComponent(genreID) + '&page=' + encodeURIComponent(pageCount),
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Cannot connect to TMDB.');
            }
            else if(body.code == 400) {
                reject('Invalid query.');
            }
            else {
                resolve(body.results);   
            }
        });
    });
}

var getMovieListByGenre = () => {
    return new Promise((resolve, reject) => {
        pageCount = 0;
        currentFullMovieList = [];
        for (var i = 1; i <= 5; i++) {
            getMovieListByGenrePerPage(28, i).then((result) => {
                currentFullMovieList = currentFullMovieList.concat(result);
                pageCount++;
                if(pageCount == 5) {
                    resolve(currentFullMovieList)
                }
            });
        }
    });
}

module.exports = {
    getMovie,
    getMovieDetailList,
    getMovieListByGenrePerPage,
    getMovieListByGenre
}