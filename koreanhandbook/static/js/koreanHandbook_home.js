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
  threshold: 200,
  loop: true,
  onChange: () => sliderAutoPlay()
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
function mouseDownInterval () {
  clearSliderAutoPlay()
  clearMouseDownInterval()
  mouseDownIntervalID = setInterval(() => mouseDownInterval(), 200)
}
function clearMouseDownInterval () {
  clearInterval(mouseDownIntervalID)
}
prevButton.addEventListener('click', () => siema.prev())
nextButton.addEventListener('click', () => siema.next())
sliderContainer.addEventListener('mousedown', () => mouseDownInterval())
sliderContainer.addEventListener('mouseup', () => clearMouseDownInterval())
