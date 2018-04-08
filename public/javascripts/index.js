// Page elements:
var questionViewWrap = document.getElementById('questionViewWrap'),
    userInfo = document.getElementById('userInfo'),
    questionNumber = document.getElementById('questionNumber'),
    questionContent = document.getElementById('questionContent'),
    answer1 = document.getElementById('answer1'),
    answer2 = document.getElementById('answer2'),
    answer3 = document.getElementById('answer3'),
    user_name = document.getElementById('greetBoxUsernameInput'),
    answer4 = document.getElementById('answer4');

// Server requests and display:
const pointPerQuestion = 500,
    streakBonus = 200;

var currentQuestion = 0,
    questionList = [],
    streakList = [],
    currentStreak = 0,
    username = '',
    userScore = 0;

var assessQuestionResult = (option) => {
    if (option === questionList[currentQuestion].answers) {
        userScore += pointPerQuestion + streakBonus*currentStreak;
        currentStreak++;
    }
    else {
        streakList.push(currentStreak);
        currentStreak = 0;
    }
};

var assessQuizResult = () => {
    var quizTime = new Date().getDate();
    var userHighestStreak = Math.max(streakList);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","/storeuser", true);
    xmlhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () =>{
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
        }
    };
    console.log("username=" + encodeURIComponent(user_name.value) + "&score=" + encodeURIComponent(userScore) +
        "&highestStreak=" + encodeURIComponent(userHighestStreak) + "&quizTime=" + encodeURIComponent(quizTime));
    xmlhttp.send("username=" + encodeURIComponent(username) + "&score=" + encodeURIComponent(userScore) +
        "&highestStreak=" + encodeURIComponent(userHighestStreak) + "&quizTime=" + encodeURIComponent(quizTime));
};

var nextQuestion = () => {
    if (currentQuestion < 9) {
        currentQuestion++;
        displayQuestion();
    }
    else {
        assessQuizResult();
    }
    
};

var fetchQuestions = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","/getquestions", true);
    xmlhttp.onreadystatechange = () =>{
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // document.getElementById('questionNumber').innerHTML = 'QUESTION ' + currentQuestion.toString();
            questionList = JSON.parse(xmlhttp.responseText);
            console.log(questionList);

            displayQuestion();
        }
    };
    xmlhttp.send();
};

let fetchingUsername = () => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","/username", true);
    xmlhttp.setRequestHeader('Content-type',"application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = () =>{
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
            fetchQuestions();
            // // document.getElementById('questionNumber').innerHTML = 'QUESTION ' + currentQuestion.toString();
            // questionList = JSON.parse(xmlhttp.responseText);
            // console.log(questionList)

        }
    };
    xmlhttp.send(`user_name=${user_name.value}`);
};

var displayQuestion = () => {
    questionViewWrap.style.top = '-100vh';
    setTimeout(() => {
        userInfo.innerHTML = userScore;
        questionNumber.innerHTML = 'QUESTION ' + (currentQuestion + 1);
        questionContent.innerHTML = questionList[currentQuestion].question;
        answer1.innerHTML = questionList[currentQuestion].option1;
        answer2.innerHTML = questionList[currentQuestion].option2;
        answer3.innerHTML = questionList[currentQuestion].option3;
        answer4.innerHTML = questionList[currentQuestion].option4;
        questionViewWrap.style.top = "50vh"
    }, 300)
};


