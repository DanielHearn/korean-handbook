const menuButton = document.querySelector('.button--overlay')
menuButton.addEventListener('click', overlay)

function overlay () {
  document.querySelector('.overlay').classList.toggle('active')
  menuButton.classList.toggle('active')
  document.querySelector('body').classList.toggle('noscroll')
}

const siema = new Siema({
  selector: '.jsSeimaSlider',
  duration: 750,
  easing: 'ease-out',
  loop: true
})
const prevButton = document.querySelector('.slider__prev')
const nextButton = document.querySelector('.slider__next')
setInterval(() => siema.next(), 3000)

prevButton.addEventListener('click', () => siema.prev())
nextButton.addEventListener('click', () => siema.next())
