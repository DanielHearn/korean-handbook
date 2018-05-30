const menuButton = document.querySelector(".button--overlay")
menuButton.addEventListener('click', overlay)

function overlay () {
  document.querySelector(".overlay").classList.toggle("active");
  menuButton.classList.toggle("active");
  document.querySelector("body").classList.toggle("noscroll");
}

const mySiema = new Siema({
  selector: '.content__slider',
  duration: 200,
  easing: 'ease-out',
  loop: true,
})
const prevButton = document.querySelector('.slider__prev');
const nextButton = document.querySelector('.slider__next');

prevButton.addEventListener('click', () => mySiema.prev());
nextButton.addEventListener('click', () => mySiema.next());



/*
new Siema({
  selector: '.content__slider',
  duration: 200,
  easing: 'ease-out',
  loop: true,
})

  const mySiema = new Siema();
  const prev = document.querySelector('.slider__prev');
  const next = document.querySelector('.slider__next');
  console.log(mySiema)
  prev.addEventListener('click', () => mySiema.prev(3));
  next.addEventListener('click', () => mySiema.next(3));
*/
