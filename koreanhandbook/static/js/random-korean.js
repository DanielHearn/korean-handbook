const menuButton = document.querySelector('.button--overlay')
menuButton.addEventListener('click', overlay)

function overlay () {
  document.querySelector('.overlay').classList.toggle('active')
  menuButton.classList.toggle('active')
  document.querySelector('body').classList.toggle('noscroll')
}

var app = new Vue({
  delimiters: ['[[', ']]'],
  el: '#app',
  data: {
    language: 'English',
    prevContent: 'Random',
    content: 'Random',
    word_english: '',
    word_korean: '',
    dbLoaded: false,
    wordVisible: false,
    linkVisible: false,
    buttonDisabled: false,
    categoryLink: 'test',
    repeatWord: false,
    words: []
  },
  methods: {
    retrieveWord () {
      if (this.words.length === 0 || this.content !== this.prevContent) {
        this.dbLoaded = false
        this.wordVisible = false
        this.buttonDisabled = true
        this.prevContent = this.content
        const app = this
        // Convert word to slug usable by api and equal to model name
        const contentName = this.fullNameToSlug(this.content)
        const apiUrl = 'http://thekoreanhandbook.com/api/random-words?content=' + contentName + '&number=' + 3
        fetch(apiUrl)
          .then(function (response) {
            return response.json()
          }).then(function (json) {
            // Show error if invalid user url
            if (json.error) {
              app.word_english = json.error
              app.word_korean = ''
              app.showWord()
              return false
            }
            app.words = json.words.slice()
            const word = json.words[json.words.length - 1]
            // Check if repeat word and if true early return
            if (word.english === app.word_english && json.english !== 'Content doesn\'t exist' && json.numWords > 1) {
              app.retrieveWord()
              return false
            }
            app.word_english = word.english
            app.word_korean = word.korean
            app.showWord()
            if (app.words.length === 1) {
              app.words = []
            } else {
              app.words.splice(-1, 1)
            }
            // Only show category page link if not random category
            if (contentName !== 'random') {
              app.linkVisible = true
              app.categoryLink = contentName
            }
            return true
          }).catch(function (error) {
            console.log(error)
          })
      } else {
        const word = this.words[this.words.length - 1]
        this.word_english = word.english
        this.word_korean = word.korean
        this.showWord()
        if (this.words.length === 1) {
          this.words = []
        } else {
          this.words.splice(-1, 1)
        }
      }
    },
    showWord () {
      app.wordVisible = true
      app.dbLoaded = true
      app.buttonDisabled = false
    },
    fullNameToSlug (fullName) {
      return fullName.replace(/\s/g, '-').replace(/\/-/g, '').toLowerCase()
    }
  },
  created () {
    this.retrieveWord()
  }
})
