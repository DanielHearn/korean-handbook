import './../scss/main.scss'

const menuButton = document.querySelector('.button--overlay')
menuButton.addEventListener('click', overlay)

function overlay () {
  document.querySelector('.overlay').classList.toggle('active')
  menuButton.classList.toggle('active')
  document.querySelector('body').classList.toggle('noscroll')
}

// Info page search
const pageSearch = document.querySelector('#page__search')
if (pageSearch !== null) {
  pageSearch.addEventListener('input', searchPage)
}

// Iterate through list rows only showing matching rows
function searchPage () {
  let numOfResults = 0
  const searchText = pageSearch.value.toLowerCase()
  const listContainer = document.querySelector('#list--info')
  const dataRows = listContainer.querySelectorAll('.list__row')
  for (let row in dataRows) {
    if (dataRows.hasOwnProperty(row)) {
      const rowElement = dataRows[row]
      if (rowElement.dataset !== null) {
        const key1 = rowElement.dataset.key1.toLowerCase()
        const key2 = rowElement.dataset.key2.toLowerCase()
        let tags = [key1, key2]
        if ('key3' in rowElement.dataset) {
          const key3 = rowElement.dataset.key3.toLowerCase()
          tags = tags.concat([key3])
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

// Korean Clock
function getTime (date) {
  const minutes = `0${date.getMinutes()}`.slice(-2)
  let hours
  if (date.getHours() <= 12) {
    hours = date.getHours()
  } else {
    hours = date.getHours() - 12
  }
  const time = `${hours}:${minutes}`
  return time
}

function getDay (date) {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const dayNumber = date.getDay()
  return days[dayNumber]
}

function getMonth (date) {
  return date.getMonth() + 1
}

function displayClock () {
  const date = new Date()
  const time = getTime(date)
  const day = getDay(date)
  const month = getMonth(date)
  const hours = date.getHours()
  const shortDate = `${date.getFullYear()}년 ${month}월 ${date.getDate()}일 ${day}`
  let prefix
  if (hours > 12) {
    prefix = '오후'
  } else {
    prefix = '오전'
  }
  document.querySelector('#prefix').textContent = prefix
  document.querySelector('#time').textContent = time
  document.querySelector('#date').textContent = shortDate
}

function startClock () {
  displayClock()
  setInterval(displayClock, 1000)
}

try {
  if (document.querySelector('#clock')) {
    startClock()
  }
} catch (e) {
}

// Lazy load
document.addEventListener('DOMContentLoaded', function () {
  let lazyImages = [].slice.call(document.querySelectorAll('.lazy-bg-image'))

  // Check if intersection observer available else switch to less performant fallback
  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    const lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          lazyImage.classList.add('lazy-loaded')
          lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`

          lazyImage.classList.remove('lazy-bg-image')
          lazyImageObserver.unobserve(lazyImage)
        }
      })
    })

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage)
    })
  } else {
    let active = false

    // Fallback
    const fallbackLazyLoad = function () {
      if (active === false) {
        active = true

        setTimeout(function () {
          lazyImages.forEach(function (lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== 'none') {
              lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`
              lazyImage.classList.add('lazy-loaded')
              lazyImage.classList.remove('lazy-bg-image')

              lazyImages = lazyImages.filter(function (image) {
                return image !== lazyImage
              })

              // Cleanup once all images loaded
              if (lazyImages.length === 0) {
                document.removeEventListener('scroll', fallbackLazyLoad)
                window.removeEventListener('resize', fallbackLazyLoad)
                window.removeEventListener('orientationchange', fallbackLazyLoad)
              }
            }
          })

          active = false
        }, 200)
      }
    }

    fallbackLazyLoad()
    document.addEventListener('scroll', fallbackLazyLoad)
    window.addEventListener('resize', fallbackLazyLoad)
    window.addEventListener('orientationchange', fallbackLazyLoad)
  }
})
