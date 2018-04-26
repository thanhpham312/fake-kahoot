const fs = require('fs');

class Users {
    constructor(fileName = './models/users_data.json') {
        this.fileName;
        this.userList = [];
        this.userList = this.loadUsers();
    }

    /**
     * loadUsers loads the user data from the database, if there is no file it will be created.
     */
    loadUsers() {
        /**
         * @param {string} filename - JSON file with user objects
         */
        if (fs.existsSync(this.filename)) {
            return JSON.parse(fs.readFileSync(this.filename));
        } else {
            let object = {
                "user": []
            }
            fs.writeFileSync(this.filename, JSON.stringify(object, null, 4), 'utf8')
        }
    };


    /**
    * It's a function that saves users' info into a file.
    * @param {string} filename - the path of a file to which you want to write users' info into.
    * @param {object} object - the object that contains all users' info.
    */
    saveUsers() {
        fs.writeFileSync(this.filename, JSON.stringify(this.userList, null, 4), 'utf8');
    };

    /**
     * storeUser stores user data to a file.
     */
    storeUser(userObject) {
        /**
         * @param {string} newUserData - The current user's username.
         * @param {string} newScoreData - The current user's score.
         * @param {string} newStreakData - The current user's streak.
         * @param {string} timeStamp - The current user's visit time.
         */

        var date = new Date();
        var timeStamp = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        this.userList.user.push({
            userData: userObject.username,
            scoreData: userObject.userScore,
            streakData: userObject.highestStreak,
            date: timeStamp
        });
        saveUsers()
    };

    /**
     * @desc Sort user information with sortOption as keyword.
     * @param {string} sortOption - keyword for sorting
     * @return A sorted object contains user information
     */
    sortScores(sortOption) {
        var userInfo = this.userList.user.splice();
        userInfo.sort((a, b)=> {
            return b[sortOption] - a[sortOption];
        });
        return userInfo
    };

    /**
     * @desc Display top 10 users with their rank, user name, highest streak and scores.
     * @param {list} userList - a list contains all user names. 
     * @return A string contains rank, user name, highest streak and scores of a user.
     */
    displayTopUsers() {
        var displayString = "";
        var rankCounter = 1;
        for (var i=0; i < this.userList.length; i++ ){
            displayString += '<div class="scoreDisplayRow">\n\t';
            
            displayString += '<div class="leaderboardDisplayColumn">\n';
            displayString += `<p class="displayInfo"> ${rankCounter} </p>\n`;
            displayString += '</div>\n';
            
            displayString += '<div class="leaderboardDisplayColumn">\n';
            displayString += `<p class="displayInfo"> ${this.userList[i].userData} </p>\n`;
            displayString += '</div>\n';

            displayString += '<div class="leaderboardDisplayColumn">\n';
            displayString += `<p class="displayInfo"> ${this.userList[i].streakData} </p>\n`;
            displayString += '</div>\n';

            displayString += '<div class="leaderboardDisplayColumn">\n';
            displayString += `<p class="displayInfo"> ${this.userList[i].scoreData} </p>\n`;
            displayString += '</div>\n';

            displayString += '<div class="leaderboardDisplayColumn">\n';
            displayString += `<p class="displayInfo"> ${this.userList[i].date} </p>\n`;
            displayString += '</div>\n</div>\n';

            if (rankCounter >= 10){
                break;
            }

            rankCounter++;

        }
        return displayString;
    };
}

class User {
    constructor(username = '', userScore = 0, currentStreak = 0, highestStreak = 0) {
        this.username = username;
        this.userScore = userScore;
        this.currentStreak = currentStreak;
        this.highestStreak = highestStreak;
    }
}

module.exports = {
    Users,
    User
};