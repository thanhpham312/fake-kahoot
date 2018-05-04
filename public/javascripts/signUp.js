var userNameInput = document.getElementById("signUpBoxUsernameInput"),
	passwordInput = document.getElementById("signUpBoxPasswordInput"),
	cpasswordInput = document.getElementById("signUpBoxConfirmPasswordInput"),
	signUpBoxResetButton = document.getElementById('signUpBoxResetButton')

function checkPassword(pass) {
    var numbers = pass.match(/\d+/g);
    var uppers  = pass.match(/[A-Z]/);
    var lowers  = pass.match(/[a-z]/);

    if (numbers === null || uppers === null || lowers === null)
        valid = false;

    if (numbers !== null && uppers !== null && lowers !== null)
        valid = true;

    return valid;
}

userNameInput.addEventListener("blur",function(){
	let xmlhttp = new XMLHttpRequest()
	  xmlhttp.open('POST', '/validateusername', true)
	  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
	  xmlhttp.onreadystatechange = () => {
	    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
	      if (xmlhttp.response === 'true') {
	        document.getElementById("nameValidationIcon").src = "/assets/images/icons/checked.svg"
		} else {
			document.getElementById("nameValidationIcon").src = "/assets/images/icons/cross.svg"
		}
	   	}   
	  }
	  xmlhttp.send(`USERNAME=${userNameInput.value}`)
})

cpasswordInput.addEventListener("keyup",function(){
	if (cpasswordInput.value === passwordInput.value) {
		document.getElementById("cpasswordValidationIcon").src = "/assets/images/icons/checked.svg"
	} else {
		document.getElementById("cpasswordValidationIcon").src = "/assets/images/icons/cross.svg"
	}
})

passwordInput.addEventListener("keyup",function(){
	if (cpasswordInput.value === passwordInput.value) {
		document.getElementById("cpasswordValidationIcon").src = "/assets/images/icons/checked.svg"
	} else {
		document.getElementById("cpasswordValidationIcon").src = "/assets/images/icons/cross.svg"
	}

	if (checkPassword(passwordInput.value)) {
		document.getElementById("passwordValidationIcon").src = "/assets/images/icons/checked.svg"
	} else {
		document.getElementById("passwordValidationIcon").src = "/assets/images/icons/cross.svg"
	}
	
})

signUpBoxResetButton.addEventListener('click', function() {
  signUpBoxUsernameInput.value = '';
  signUpBoxPasswordInput.value = '';
  signUpBoxConfirmPasswordInput.value = '';
  document.getElementById("nameValidationIcon").src = ""
  document.getElementById("cpasswordValidationIcon").src = ""
  document.getElementById("passwordValidationIcon").src = ""
});
