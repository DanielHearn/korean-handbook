// Only for testing
const useLocal = false
let apiRoot = 'http://thekoreanhandbook.com'

const menuButton = document.querySelector('.button--overlay')
menuButton.addEventListener('click', overlay)

function overlay () {
  document.querySelector('.overlay').classList.toggle('active')
  menuButton.classList.toggle('active')
  document.querySelector('body').classList.toggle('noscroll')
}

if (useLocal) {
  apiRoot = 'http://127.0.0.1:8000'
}

const app = new Vue({
  delimiters: ['[[', ']]'],
  el: '#app',
  data: {
    content: 'Random',
    answerEnglish: '',
    answerKorean: '',
    dbLoaded: false,
    wordVisible: false,
    linkVisible: false,
    genButtonDisabled: false,
    answerButtonsDisabled: false,
    categoryLink: 'test',
    apiQuantity: 5,
    words: [],
    status: '',
    correctAnswer: ''
  },
  methods: {
    retrieveWords () {
      this.dbLoaded = false
      this.wordVisible = false
      this.genButtonDisabled = true
      this.answerButtonsDisabled = false
      this.status = ''
      this.correctAnswer = ''
      this.prevContent = this.content
      const app = this
      // Convert word to slug usable by api and equal to model name
      const contentName = this.fullNameToSlug(this.content)
      if (contentName === 'random') {
        this.apiQuantity = 1
      } else {
        this.apiQuantity = 5
      }
      const apiUrl = apiRoot + '/api/random-words?content=' + contentName + '&number=' + this.apiQuantity
      fetch(apiUrl)
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          // Show error if invalid user url
          if (json.error) {
            app.status = json.error
            app.answerKorean = ''
            app.words = []
            app.correctAnswer = ''
            app.answerEnglish = ''
            app.answerKorean = ''
            app.wordVisible = true
            app.dbLoaded = true
            return false
          }
          app.words = json.words.slice()
          const answerIndex = Math.floor(Math.random() * (2 - 0 + 1)) + 0
          const answer = app.words[answerIndex]
          app.answerEnglish = answer.english
          app.answerKorean = answer.korean
          app.showWords()
          // Only show category page link if not random category
          if (contentName !== 'random') {
            app.linkVisible = true
            app.categoryLink = contentName
          }
          return true
        }).catch(function (e) {
          console.log(e)
        })
    },
    showWords () {
      app.wordVisible = true
      app.dbLoaded = true
      app.genButtonDisabled = false
    },
    fullNameToSlug (fullName) {
      return fullName.replace(/\s/g, '-').replace(/\/-/g, '').toLowerCase()
    },
    checkAnswer (english) {
      if (english === this.answerEnglish) {
        this.status = 'Correct'
      } else {
        this.status = 'Incorrect'
      }
      this.answerButtonsDisabled = true
      this.correctAnswer = 'The correct answer was: ' + this.answerEnglish
    }
  },
  created () {
    this.retrieveWords()
  }
})
