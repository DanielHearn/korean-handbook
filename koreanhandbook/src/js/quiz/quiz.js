import SquareButton from './../shared/squareButton/SquareButton.vue'

export default {
  components: {
    SquareButton
  },
  data: function () {
    return {
      apiRoot: 'http://thekoreanhandbook.com',
      content: 'Random',
      answerEnglish: '',
      answerKorean: '',
      contentNames: [],
      dbLoaded: false,
      wordVisible: false,
      linkVisible: false,
      genButtonDisabled: false,
      answerButtonsDisabled: false,
      categoryLink: '',
      apiQuantity: 5,
      words: [],
      status: '',
      wordSelected: false,
      selectedAnswer: '',
      correctAnswer: '',
      wordIndex: -1
    }
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

      const self = this
      // Convert word to slug usable by api and equal to model name
      const contentName = this.fullNameToSlug(this.content)
      const apiUrl = this.apiRoot + '/api/random-words?content=' + contentName + '&quantity=' + this.apiQuantity

      fetch(apiUrl)
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          // Show error if invalid user url
          if (json.error) {
            self.status = json.error
            self.answerKorean = ''
            self.words = []
            self.correctAnswer = ''
            self.answerEnglish = ''
            self.answerKorean = ''
            self.wordVisible = true
            self.dbLoaded = true
            return false
          } else {
            self.words = json.words.slice().map(function (word) {
              self.wordIndex += 1
              return {
                english: word.english,
                korean: word.korean,
                key: self.wordIndex
              }
            })
            const answerIndex = self.getAnswerIndex()
            const answer = self.words[answerIndex]
            self.answerEnglish = answer.english
            self.answerKorean = answer.korean
            self.showWords()
            // Only show category page link if not random category
            if (contentName !== 'random') {
              self.linkVisible = true
              self.categoryLink = `/info/${contentName}`
            }
            return true
          }
        }).catch(function (e) {
          console.log(e)
        })
    },
    getAnswerIndex () {
      return Math.floor(Math.random() * ((this.words.length - 1) - 0 + 1)) + 0
    },
    showWords () {
      this.wordVisible = true
      this.dbLoaded = true
      this.genButtonDisabled = false
      this.wordSelected = false
    },
    fullNameToSlug (fullName) {
      return fullName.replace(/\s/g, '-').replace(/\/-/g, '').toLowerCase()
    },
    checkAnswer (english) {
      this.selectedAnswer = english
      if (english === this.answerEnglish) {
        this.status = 'Correct'
      } else {
        this.status = 'Incorrect'
      }
      this.answerButtonsDisabled = true
      this.correctAnswer = 'The correct answer was: ' + this.answerEnglish
    }
  },
  created: function () {
    // Call local api
    if (window.location.href.indexOf('127.0.0.1') > -1) {
      this.apiRoot = 'http://127.0.0.1:8000'
    }

    const apiUrl = this.apiRoot + '/api/get-content-names'
    const self = this

    // Get content names for dropdown
    fetch(apiUrl)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        let contentIndex = -1
        self.contentNames = json.content_names.map(function (content) {
          contentIndex += 1
          return {
            full_name: content.full_name,
            key: contentIndex
          }
        })

        self.retrieveWords()
      }).catch(function (e) {
        console.log(e)
      })
  }
}
