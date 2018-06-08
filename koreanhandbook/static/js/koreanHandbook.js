const menuButton = document.querySelector('.button--overlay')
menuButton.addEventListener('click', overlay)
const sliderContainer = document.querySelector('.jsSeimaSlider')

function overlay () {
  document.querySelector('.overlay').classList.toggle('active')
  menuButton.classList.toggle('active')
  document.querySelector('body').classList.toggle('noscroll')
}

// DATA PAGE SEARCH
const pageSearch = document.querySelector('#page__search')
if (pageSearch != null) {
  pageSearch.addEventListener('input', searchPage)
}

function searchPage () {
  let numOfResults = 0
  const searchText = pageSearch.value.toLowerCase()
  const listContainer = document.querySelector('.list')
  const dataRows = listContainer.querySelectorAll('.list__row')
  for (let row in dataRows) {
    const rowElement = dataRows[row]
    if (rowElement.dataset != null) {
      const key1 = rowElement.dataset.key1.toLowerCase()
      const key2 = rowElement.dataset.key2.toLowerCase()
      const tags = [key1, key2]
      if ('key3' in rowElement.dataset) {
        const key3 = rowElement.dataset.key3.toLowerCase()
        tags[2] = key3
      }
      if (searchText.length > 0) {
        if (search(tags, searchText) === true) {
          numOfResults++
          rowElement.style.display = 'grid'
        } else {
          rowElement.style.display = 'none'
        }
      } else {
        rowElement.style.display = 'grid'
      }
    }
  }
  if (searchText.length > 0) {
    showResultsCounter(numOfResults)
  } else {
    hideResultsCounter()
  }
}

function showResultsCounter (numOfResults) {
  const resultsCount = document.querySelector('.resultsCounter')
  resultsCount.innerHTML = numOfResults + ' results found'
  resultsCount.style.display = 'block'
}

function hideResultsCounter () {
  const resultsCount = document.querySelector('.resultsCounter')
  resultsCount.style.display = 'none'
}

function search (tags, searchText) {
  for (let tag in tags) {
    if (tags[tag].includes(searchText)) {
      return true
    }
  }
}

// SLIDER
let intervalID = null
let mouseDownIntervalID = null
let siema = null
if (sliderContainer !== null) {
  siema = new Siema({
    selector: '.jsSeimaSlider',
    duration: 1000,
    easing: 'ease-out',
    threshold: window.innerWidth / 6,
    loop: true,
    onChange: sliderAutoPlay
  })
  sliderAutoPlay()
  const prevButton = document.querySelector('.slider__prev')
  const nextButton = document.querySelector('.slider__next')
  prevButton.addEventListener('click', () => siema.prev())
  nextButton.addEventListener('click', () => siema.next())
  sliderContainer.addEventListener('mousedown', mouseDownInterval, false)
  sliderContainer.addEventListener('mouseup', () => clearMouseDownInterval())
}
function sliderAutoPlay () {
  clearSliderAutoPlay()
  intervalID = setInterval(() => siema.next(), 5000)
}
function clearSliderAutoPlay () {
  clearInterval(intervalID)
}
function mouseDownInterval (e) {
  if (e.target.tagName !== 'A') {
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

// ADS

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

// PROFILE FILTER

const filterContainer = document.querySelector('.content__filter')
if (filterContainer !== null) {
  const filterGirl = filterContainer.querySelector('[data-type="filter-girl"] ')
  const filterBoy = filterContainer.querySelector('[data-type="filter-boy"] ')
  const filterCoed = filterContainer.querySelector('[data-type="filter-coed"] ')
  const filterSoloist = filterContainer.querySelector('[data-type="filter-soloist"] ')
  filterGirl.addEventListener('change', loadFilter)
  filterBoy.addEventListener('change', loadFilter)
  filterCoed.addEventListener('change', loadFilter)
  filterSoloist.addEventListener('change', loadFilter)
}

function loadFilter (e) {
  const type = e.target.dataset.type
  const resultsCounter = document.querySelector('.resultsCounter')
  const currentTypesBool = {
    girl: filterContainer.querySelector('[data-type="filter-girl"] ').checked,
    boy: filterContainer.querySelector('[data-type="filter-boy"] ').checked,
    coed: filterContainer.querySelector('[data-type="filter-coed"] ').checked,
    soloist: filterContainer.querySelector('[data-type="filter-soloist"] ').checked
  }
  const currentTypesArray = []
  if (currentTypesBool.girl === true) {
    currentTypesArray.push('GIRLGROUP')
  }
  if (currentTypesBool.boy === true) {
    currentTypesArray.push('BOYGROUP')
  }
  if (currentTypesBool.coed === true) {
    currentTypesArray.push('COEDGROUP')
  }
  if (currentTypesBool.soloist === true) {
    currentTypesArray.push('SOLOIST')
  }
  let numOfResults = 0
  const gridContainer = document.querySelector('.grid')
  const dataGrids = gridContainer.querySelectorAll('.grid__item')
  for (let grid of dataGrids) {
    if (grid.dataset.type != null) {
      const type = grid.dataset.type
      if (search(currentTypesArray, type)) {
        numOfResults++
        grid.style.display = 'block'
      } else {
        grid.style.display = 'none'
      }
    } else {
      grid.style.display = 'block'
    }
  }
  if (numOfResults > 0) {
    resultsCounter.style.display = 'none'
  } else {
    resultsCounter.style.display = 'block'
    resultsCounter.innerHTML = 'No profile results for the current profile type filters'
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
