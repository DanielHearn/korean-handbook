const menuButton = document.querySelector('.button--overlay')
menuButton.addEventListener('click', overlay)
const sliderContainer = document.querySelector('.jsSeimaSlider')

function overlay () {
  document.querySelector('.overlay').classList.toggle('active')
  menuButton.classList.toggle('active')
  document.querySelector('body').classList.toggle('noscroll')
}
let intervalID = null
let mouseDownIntervalID = null
const siema = new Siema({
  selector: '.jsSeimaSlider',
  duration: 1000,
  easing: 'ease-out',
  threshold: window.innerWidth / 6,
  loop: true,
  onChange: sliderAutoPlay
})
const prevButton = document.querySelector('.slider__prev')
const nextButton = document.querySelector('.slider__next')
sliderAutoPlay()
function sliderAutoPlay () {
  clearSliderAutoPlay()
  intervalID = setInterval(() => siema.next(), 5000)
}
function clearSliderAutoPlay () {
  clearInterval(intervalID)
}
function mouseDownInterval (e) {
  if (e.target.tagName !== 'A') {
    console.log('Drag')
    clearSliderAutoPlay()
    clearMouseDownInterval()
    mouseDownIntervalID = setInterval(() => mouseDownInterval(e), 200)
  } else {
    e.target.click()
  }
}
function clearMouseDownInterval () {
  clearInterval(mouseDownIntervalID)
}
prevButton.addEventListener('click', () => siema.prev())
nextButton.addEventListener('click', () => siema.next())
sliderContainer.addEventListener('mousedown', mouseDownInterval, false)
sliderContainer.addEventListener('mouseup', () => clearMouseDownInterval())

function showAdblockMessages () {
  const ads = document.querySelectorAll('ins.adsbygoogle')
  for (let ad of ads) {
    if (ad && ad.innerHTML.replace(/\s/g, '').length === 0) {
      ad.style.cssText = 'display:block !important'
      const adMessageElement = ad.parentElement.querySelector('.ad__message')
      if (adMessageElement !== null) {
        adMessageElement.style = 'display:block !important'
      }
    } else {
      ad.parentElement.classList.add('loaded')
    }
  }
}

window.onload = function () {
  setTimeout(function () {
    showAdblockMessages()
  }, 100)
  setTimeout(function () {
    showAdblockMessages()
  }, 3000)
}
