let userNameInput = document.getElementById('signUpBoxUsernameInput')
let passwordInput = document.getElementById('signUpBoxPasswordInput')
let cpasswordInput = document.getElementById('signUpBoxConfirmPasswordInput')
let signUpBoxResetButton = document.getElementById('signUpBoxResetButton')
let nameIcon = document.getElementById('nameValidationIcon')
let passwordIcon = document.getElementById('passwordValidationIcon')
let cpasswordIcon = document.getElementById('cpasswordValidationIcon')
let hintWrap = document.getElementById('hintWrap')

function checkPassword (pass) {
  let numbers = pass.match(/\d+/g)
  let uppers = pass.match(/[A-Z]/)
  let lowers = pass.match(/[a-z]/)
  let lengths = pass.length >= 6

  if (numbers === null || uppers === null || lowers === null || lengths === false) {
    return false
  }

  if (numbers !== null && uppers !== null && lowers !== null && lengths) {
    return true
  }
}

userNameInput.addEventListener('blur', function () {
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.open('POST', '/validateusername', true)
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      if (xmlhttp.response === 'true') {
        nameIcon.src = '/assets/images/icons/checked.svg'
      } else {
        nameIcon.src = '/assets/images/icons/cross.svg'
      }
    }
  }
  xmlhttp.send(`USERNAME=${userNameInput.value}`)
})

cpasswordInput.addEventListener('keyup', function () {
  if (passwordIcon.getAttribute('src') === '/assets/images/icons/checked.svg') {
    if (cpasswordInput.value === passwordInput.value) {
      cpasswordIcon.src = '/assets/images/icons/checked.svg'
    } else {
      cpasswordIcon.src = '/assets/images/icons/cross.svg'
    }
  } else {
    cpasswordIcon.src = ''
  }
})

passwordInput.addEventListener('keyup', function () {
  if (passwordIcon.getAttribute('src') === '/assets/images/icons/checked.svg') {
    if (cpasswordInput.value === passwordInput.value) {
      cpasswordIcon.src = '/assets/images/icons/checked.svg'
    } else {
      cpasswordIcon.src = '/assets/images/icons/cross.svg'
    }
  } else {
    cpasswordIcon.src = ''
  }

  if (checkPassword(passwordInput.value)) {
    passwordIcon.src = '/assets/images/icons/checked.svg'
  } else {
    passwordIcon.src = '/assets/images/icons/cross.svg'
  }
})

signUpBoxResetButton.addEventListener('click', function () {
  signUpBoxUsernameInput.value = ''
  signUpBoxPasswordInput.value = ''
  signUpBoxConfirmPasswordInput.value = ''
  document.getElementById('nameValidationIcon').src = ''
  document.getElementById('cpasswordValidationIcon').src = ''
  document.getElementById('passwordValidationIcon').src = ''
})

nameIcon.addEventListener('mouseover', function () {
  if (nameIcon.getAttribute('src') === '/assets/images/icons/cross.svg') {
    hintWrap.innerHTML = 'Sorry, this user name already exists. Pick another one.'
    hintWrap.style.display = 'block'
  }
})

passwordIcon.addEventListener('mouseover', function () {
  if (passwordIcon.getAttribute('src') === '/assets/images/icons/cross.svg') {
    hintWrap.innerHTML = 'Password must be a minimum of six characters and include at least one uppercase letter,one lowercase letter, and one number. '
    hintWrap.style.display = 'block'
  }
})

cpasswordIcon.addEventListener('mouseover', function () {
  if (cpasswordIcon.getAttribute('src') === '/assets/images/icons/cross.svg') {
    hintWrap.innerHTML = 'Must match the previews password.'
    hintWrap.style.display = 'block'
  }
})

nameIcon.addEventListener('mouseout', function () {
  hintWrap.style.display = 'none'
})

passwordIcon.addEventListener('mouseout', function () {
  hintWrap.style.display = 'none'
})

cpasswordIcon.addEventListener('mouseout', function () {
  hintWrap.style.display = 'none'
})
