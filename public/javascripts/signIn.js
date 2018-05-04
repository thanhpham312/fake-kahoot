var signInPage = document.getElementById('signInPage')
var signInButton = document.getElementById('signInButton')
var signInPage2 = document.getElementById('signInPage2')
var signInPage3 = document.getElementById('signInPage3')
var signInPage4 = document.getElementById('signInPage4')
var content = document.getElementById('content')
var signInPageBackButton2 = document.getElementById('signInPageBackButton2')
var signInPageBackButton = document.getElementById('signInPageBackButton')
var signInPageBackButton3 = document.getElementById('signInPageBackButton3')
var signInPageBackButton4 = document.getElementById('signInPageBackButton4')

signInButton.addEventListener('click', function () {
  signInPage.style.opacity = 1
  content.style.opacity = 0.5;
  signInPage.style.zIndex = 2;
})

signInButton.addEventListener('click', function () {
  signInPage2.style.opacity = 1
  content.style.opacity = 0.5;
  signInPage2.style.zIndex = 2;
})

signInButton.addEventListener('click', function () {
  signInPage3.style.opacity = 1
  content.style.opacity = 0.5;
  signInPage3.style.zIndex = 2;
})

signInButton.addEventListener('click', function () {
  signInPage4.style.opacity = 1
  content.style.opacity = 0.5;
  signInPage4.style.zIndex = 2;
})

signInPageBackButton.addEventListener('click', function () {
  signInPage.style.zIndex = -20;
  signInPage.style.opacity = 0;
  content.style.opacity = 1;
})

signInPageBackButton.addEventListener('click', function () {
  signInPage2.style.zIndex = -20;
  signInPage2.style.opacity = 0;
  content.style.opacity = 1;
})

signInPageBackButton.addEventListener('click', function () {
  signInPage3.style.zIndex = -20;
  signInPage3.style.opacity = 0;
  content.style.opacity = 1;
})

signInPageBackButton.addEventListener('click', function () {
  signInPage4.style.zIndex = -20;
  signInPage4.style.opacity = 0;
  content.style.opacity = 1;
})