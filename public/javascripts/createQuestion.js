let createQuestionWrap = document.getElementById('createQuestionWrap')
let createQuestionOverlay = document.getElementById('createQuestionOverlay')


createQuestionOverlay.addEventListener('click', () => {
  createQuestionOverlay.style.backgroundColor = 'rgba(236, 239, 241, 0)'
  createQuestionWrap.style.top = '-100vh'
  setTimeout(() => {
    createQuestionOverlay.style.display = 'none'
  }, 300)
})

createQuestionWrap.addEventListener('click', (event) => {
  event.stopPropagation()
})

let showCreateQuestionWindow = () => {
  createQuestionOverlay.style.display = 'block'
  setTimeout(() => {
    createQuestionOverlay.style.backgroundColor = 'rgba(236, 239, 241, 0.5)'
    createQuestionWrap.style.top = '15vh'
  }, 10)
}

