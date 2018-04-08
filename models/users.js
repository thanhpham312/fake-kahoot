const fs = require('fs');


var userFileJson = {
    user : []
};


var readFile = () => {
    var readUserFile = fs.readFileSync('users_data.json');
    userFileJson = JSON.parse(readUserFile);
    console.log(readUserFile);
    return userFileJson
};

var writeFile = (user) =>{
    var writeUser = JSON.stringify(user, null, 4);
    fs.writeFileSync('users_data.json', writeUser)
};

var addNewUser = (new_user, score, streak) => {
    var userFileJson = readFile();
    var newUser = {
        "userData" : new_user,
        "scoreData" : score,
        "streakData" : streak,
        "date" : ""
        };
    userFileJson.user.push(newUser);
    writeFile(userFileJson);
};

var displayAllUsers = () => {
    readFile();
    var userList = userFileJson.user;
    for (user = 0; user <= userList.length; user++) {

    }
};

var sortScoresDescending = (sortOption) =>{
    let listofUser = readFile();
    listofUser.user.sort((a, b)=> {
        return b[sortOption] - a[sortOption];
    });
    return listofUser.user
};

var sortScoresAscending = (sortOption) =>{
    let listofUser = readFile();
    let sort = listofUser.user.sort((a, b)=> {
        return a[sortOption] - b[sortOption];
    });
    return listofUser.user
};

module.exports = {
    addNewUser,
    displayAllUsers,
    sortScoresAscending,
    sortScoresDescending,
    readFile,
    writeFile
};