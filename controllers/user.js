const fs = require('fs');

var loadUserFile = (filename) => {
	  if (fs.existsSync(filename)) {
		  return JSON.parse(fs.readFileSync(filename));
	  } else {
	      let object = {
	          "user": []
        }
	      fs.writeFileSync(filename, JSON.stringify(object, null, 4), 'utf8')
    }
};


/**
* It's a function that saves users' info into a file.
* @param {string} filename - the path of a file to which you want to write users' info into.
* @param {object} object - the object that contains all users' info.
*/
var saveUsers = (filename, object) => {
	// fs.writeFile(path, data, { flag: 'wx' }, function (err) {
	// 	if (err) throw err;
	// 	console.log("It's saved!");
	// });
    fs.writeFileSync(filename, JSON.stringify(object, null, 4), 'utf8');
};

var storeUser = (newUserData, newScoreData, newStreakData, timeStamp) => {
    var currentUserFile = loadUserFile('./models/users_data.json');
    currentUserFile.user.push({
        userData: newUserData,
        scoreData: newScoreData,
        streakData: newStreakData,
        date: timeStamp
    });
    saveUsers('./models/users_data.json', currentUserFile)
};

var sortScores = (sortOption) => {
    var userInfo = loadUserFile("models/users_data.json").user;
    userInfo.sort((a, b)=> {
        return b[sortOption] - a[sortOption];
    });
    return userInfo
};

var getUsers = (userList) => {
    var displayString = "";
    var rankCounter = 1;
    for (var i=0; i < userList.length; i++ ){
        displayString += '<div class="scoreDisplayRow">\n\t';
        
        displayString += '<div class="leaderboardDisplayColumn">\n';
        displayString += `<p class="displayInfo"> ${rankCounter} </p>\n`;
        displayString += '</div>\n';
        
        displayString += '<div class="leaderboardDisplayColumn">\n';
        displayString += `<p class="displayInfo"> ${userList[i].userData} </p>\n`;
        displayString += '</div>\n';

        displayString += '<div class="leaderboardDisplayColumn">\n';
        displayString += `<p class="displayInfo"> ${userList[i].streakData} </p>\n`;
        displayString += '</div>\n';

        displayString += '<div class="leaderboardDisplayColumn">\n';
        displayString += `<p class="displayInfo"> ${userList[i].scoreData} </p>\n`;
        displayString += '</div>\n';

        displayString += '<div class="leaderboardDisplayColumn">\n';
        displayString += `<p class="displayInfo"> ${userList[i].date} </p>\n`;
        displayString += '</div>\n</div>\n';

        if (rankCounter >= 10){
            break;
        }

        rankCounter++;

    }
    return displayString;
};

module.exports = {
    loadUserFile,
    saveUsers,
    sortScores,
    storeUser,
    getUsers
};