let hours24 = true

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
  const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']
  const dayNumber = date.getDay() - 1
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
  document.querySelector('#prefix').innerHTML = prefix
  document.querySelector('#time').innerHTML = time
  document.querySelector('#date').innerHTML = shortDate
}

function startClock () {
  displayClock()
  setInterval(displayClock, 1000)
}

startClock()
