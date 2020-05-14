var firebaseConfig = {
  apiKey: 'AIzaSyAxmi4X0FjZQe1lPtdKnO-WsdVwRRjbxP8',
  authDomain: 'workshop-livia.firebaseapp.com',
  databaseURL: 'https://workshop-livia.firebaseio.com',
  projectId: 'workshop-livia',
  storageBucket: 'workshop-livia.appspot.com',
  messagingSenderId: '784440178331',
  appId: '1:784440178331:web:6793774284b8e07679383e',
  measurementId: 'G-HL6PH5LHQX',
  storageBucket: 'gs://workshop-livia.appspot.com',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

const openMenu = document.querySelector('.menu-mobile')
const closeMenu = document.querySelector('.mobile')
const menuMobile = document.querySelector('.mobile')

var formRegister = document.getElementById('form-register')
var progressUpload = document.getElementById('progress-upload')

function open(param) {
  param.addEventListener('click', () => {
    setTimeout(() => {
      menuMobile.style.display = 'block'
    }, 200)
    openAnimation(menuMobile)
  })
}

function openAnimation(param) {
  param.animate(
    [{ transform: 'translateX(300px)' }, { transform: 'translateX(0)' }],
    { duration: 300 },
    { iterations: 1 },
  )
}

function close(param) {
  param.addEventListener('click', () => {
    // closeAnimation(menuMobile)
    if (window.innerWidth < 900)
      setTimeout(() => {
        menuMobile.style.display = 'none'
      }, 200)
  })
}

open(openMenu)
close(closeMenu)

function smoothScroll(target, duration) {
  var target = document.querySelector(target)
  var targetPosition = target.getBoundingClientRect().top
  var startPosition = window.pageYOffset
  var distance = targetPosition - startPosition
  var startTime = null

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    var timeElapsed = currentTime - startTime
    var run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  function ease(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

var livia = document.querySelector('.sobreLivia')
var comoFunciona = document.querySelector('.comoFunciona')
var aprender = document.querySelector('.aprender')

livia.addEventListener('click', function () {
  smoothScroll('.sobre-a-livia', 1000)
})

comoFunciona.addEventListener('click', function () {
  smoothScroll('.como-funciona', 1000)
})

aprender.addEventListener('click', function () {
  smoothScroll('.oque-voce-vai-aprender', 1000)
})

const modalOverlay = document.querySelector('.modal-overlay')
const openModal = document.querySelectorAll('.register')

for (let openM of openModal) {
  openM.addEventListener('click', function () {
    modalOverlay.classList.add('active')
  })
}

document.querySelector('.close-modal').addEventListener('click', function () {
  modalOverlay.classList.remove('active')
  formRegister.classList.remove('div-hide')
  progressUpload.classList.remove('div-show')
})
