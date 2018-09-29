const menuButton = document.querySelector('.button--overlay')
menuButton.addEventListener('click', overlay)

function overlay () {
  document.querySelector('.overlay').classList.toggle('active')
  menuButton.classList.toggle('active')
  document.querySelector('body').classList.toggle('noscroll')
}

Vue.component('pulse-loader', {
  template: `<div class="pulseLoader"">
              <div class="pulse"></div>
              <div class="pulse"></div>
            </div>`
})

Vue.component('word-definition', {
  props: ['word'],
  template: `<div class="word-definition">
              <p class="genWord__korean">{{ word.korean }}</p>
              <p class="genWord__english">{{ word.english }}</p>
             </div>`
})

const app = new Vue({
  delimiters: ['[[', ']]'],
  el: '#app',
  data: {
    language: 'English',
    prevContent: 'Random',
    content: 'Random',
    word: {},
    dbLoaded: false,
    wordVisible: false,
    linkVisible: false,
    buttonDisabled: false,
    categoryLink: '',
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
        // const apiUrl = 'http://127.0.0.1:8000/api/random-words?content=' + contentName + '&number=' + 3
        const apiUrl = 'http://thekoreanhandbook.com/api/random-words?content=' + contentName + '&number=' + 3
        fetch(apiUrl)
          .then(function (response) {
            return response.json()
          }).then(function (json) {
            // Show error if invalid user url
            if (json.error) {
              app.word = {english: json.error}
              app.showWord()
              return false
            }
            app.words = json.words.slice()
            app.word = json.words[json.words.length - 1]
            console.log(app.word.korean)
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
        this.word = this.words[this.words.length - 1]
        this.showWord()
        if (this.words.length === 1) {
          this.words = []
        } else {
          this.words.splice(-1, 1)
        }
      }
    },
    showWord () {
      this.wordVisible = true
      this.dbLoaded = true
      this.buttonDisabled = false
    },
    fullNameToSlug (fullName) {
      return fullName.replace(/\s/g, '-').replace(/\/-/g, '').toLowerCase()
    }
  },
  created () {
    this.retrieveWord()
  }
})
