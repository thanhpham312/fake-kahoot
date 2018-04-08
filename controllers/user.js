const fs = require('fs');

var loadUserFile = (filename) => {
    return JSON.parse(fs.readFileSync(filename));
}

var saveUsers = (filename, object) => {
    fs.writeFileSync(filename, JSON.stringify(object), 'utf8');
}

var storeUser = (newUserData, newScoreData, newStreakData) => {
    currentUserFile = loadUserFile('./models/users_data.json');
    currentUserFile.user.push({
        userData: newUserData,
        scoreData: newScoreData,
        streakData: newStreakData,
        date: new Date().getTime()
    });
}