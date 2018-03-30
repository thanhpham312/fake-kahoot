const fs = require('fs');


var userFileJson = {
    user = []
};


var readFile = () => {
    var readUserFile = fs.readFileSync('user_data.json');
    userFileJson = JSON.parse(readUserFile)
}

var writeToFile = (user) =>{
    var writeUser = JSON.stringify(user)
    fs.writeToFile('users_data.json', writeUser)
}

var addNewUser = (user, score, streak, time) => {
    readFile()
    newUser = {
        userData = user,
        scoreData = score,
        streakData = streak,
        timeData = time
    }
    userFileJson.user.push(newUser)
    writeToFile(userFileJson)
};

var displayAllUsers = () => {
    readFile()
    var userList = userFileJson.user
    for (user = 0; user <= userList.length; user++) {

    }
};

var sort = (sortOption) =>{
    listofUser = readFile()
    listofUser.sort((a, b)=> {
    return a[sortOption].localeCompare(b[sortOption]);
    })
}
