import SquareButton from './../shared/squareButton/SquareButton.vue'

export default {
  components: {
    SquareButton
  },
  data: function () {
    return {
      apiRoot: 'http://thekoreanhandbook.com',
      language: 'English',
      prevContent: 'Random',
      content: 'Random',
      contentNames: [],
      word_english: '',
      word_korean: '',
      dbLoaded: false,
      wordVisible: false,
      linkVisible: false,
      buttonDisabled: false,
      categoryLink: 'test',
      apiQuantity: 5,
      words: []
    }
  },
  methods: {
    retrieveWord () {
      if (this.words.length === 0 || this.content !== this.prevContent) {
        this.dbLoaded = false
        this.wordVisible = false
        this.buttonDisabled = true
        this.prevContent = this.content
        const self = this
        // Convert word to slug usable by api and equal to model name
        const contentName = this.fullNameToSlug(this.content)

        if (this.content === 'Random') {
          this.apiQuantity = 1
        }

        const apiUrl = this.apiRoot + '/api/random-words?content=' + contentName + '&quantity=' + this.apiQuantity
        fetch(apiUrl)
          .then(function (response) {
            return response.json()
          }).then(function (json) {
            // Show error if invalid user url
            if (json.error) {
              self.retrieveWord()
            } else {
              self.words = json.words.slice()
              const word = json.words[json.words.length - 1]
              self.word_english = word.english
              self.word_korean = word.korean
              self.showWord()
              if (self.words.length === 1) {
                self.words = []
              } else {
                self.words.splice(-1, 1)
              }
              // Only show category page link if not random category
              if (contentName !== 'random') {
                self.linkVisible = true
                self.categoryLink = `info/${contentName}`
              }
              return true
            }
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
      this.wordVisible = true
      this.dbLoaded = true
      this.buttonDisabled = false
    },
    fullNameToSlug (fullName) {
      return fullName.replace(/\s/g, '-').replace(/\/-/g, '').toLowerCase()
    }
  },
  created () {
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

        self.retrieveWord()
      }).catch(function (e) {
        console.log(e)
      })
  }
}
