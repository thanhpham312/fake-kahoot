let createQuizOverlay = document.getElementById('createQuizOverlay')
let quizNameInput = document.getElementById('quizNameInput')
let createQuizWrap = document.getElementById('createQuizWrap')

createQuizOverlay.addEventListener('click', () => {
  createQuizOverlay.style.backgroundColor = 'rgba(236, 239, 241, 0)'
  createQuizWrap.style.top = '-100vh'
  setTimeout(() => {
    createQuizOverlay.style.display = 'none'
  }, 300)
})

createQuizWrap.addEventListener('click', (event) => {
  event.stopPropagation()
})

let showCreateQuizWindow = () => {
  let selectedQuestions = []
  let createdQuestionCheckBox = document.getElementsByClassName('createdQuestionCheckBox')
  for (let i = 0; createdQuestionCheckBox[i]; ++i) {
    if (createdQuestionCheckBox[i].checked) {
      selectedQuestions.push(parseInt(createdQuestionCheckBox[i].value))
    }
  }
  if (selectedQuestions.length > 0) {
    createQuizOverlay.style.display = 'block'
    setTimeout(() => {
      createQuizOverlay.style.backgroundColor = 'rgba(236, 239, 241, 0.5)'
      createQuizWrap.style.top = '15vh'
    }, 10)
  } else {
    swal({
      type: 'error',
      title: 'Please select at least one of your questions',
      showConfirmButton: false,
      timer: 1000
    })
  }
}

let createCustomQuiz = () => {
  let selectedQuestions = []
  let createdQuestionCheckBox = document.getElementsByClassName('createdQuestionCheckBox')
  for (let i = 0; createdQuestionCheckBox[i]; ++i) {
    if (createdQuestionCheckBox[i].checked) {
      selectedQuestions.push(parseInt(createdQuestionCheckBox[i].value))
    }
  }
  if (quizNameInput.value !== '') {
    serverRequest('POST', '/createQuiz', `quizName=${quizNameInput.value}&questionList=${encodeURIComponent(JSON.stringify(selectedQuestions))}`, (xmlhttp) => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        swal({
          type: 'success',
          title: 'Quiz successfully created!',
          showConfirmButton: false,
          timer: 1000
        })
      } else {
        swal({
          type: 'error',
          title: 'Quiz creation failed!',
          showConfirmButton: false,
          timer: 1000
        })
      }
    })
  } else {
    swal({
      type: 'error',
      title: 'Please give your quiz a name!',
      showConfirmButton: false,
      timer: 1000
    })
  }
}
