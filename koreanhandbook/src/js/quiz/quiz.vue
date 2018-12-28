<template>
  <div id="app">
    <section class="korean__container">
      <div class="word__container">
          <div id="genWord">
            <div class="pulseLoader" 
              v-bind:class="{ hideLoader: dbLoaded }">
                <div class="pulse"></div>
                <div class="pulse"></div>
            </div>
            <div class="question-wrap" 
              v-bind:class="{ visible: wordVisible }">
                <div class="question"> 
                  <p>What is the meaning of this Korean word.</p>
                  <h3 id="genWord__korean">
                    {{ answerKorean }}
                    </h3>
                </div>
                <div class="answers">
                  <button 
                      class="button--dark" @click=checkAnswer(word.english) 
                      v-for="word in words" 
                      v-bind:disabled="answerButtonsDisabled">
                      {{ word.english }}
                      </button>
                </div>
            </div>
          </div>
          <button class="button--purple"
            v-bind:disabled="genButtonDisabled" @click="retrieveWords()">
            Generate Word
            </button>
      </div>
      <div class="option__container">
          <div class="option">
              <p>Word Category</p>
              <select 
                v-model="content" v-on:change="retrieveWords">
                  <option>Random</option>
                  <option 
                      v-for="name in contentNames">
                      {{ name }}
                      </option>
              </select>
          </div>
          <div class="option">
          <a 
            v-bind:href="categoryLink"
            v-bind:class="{ visible: linkVisible }" class="link-text accent">
            View full category page</a>
          </div>
          <p class="status">{{ status }}</p>
          <p class="correct-answer">{{ correctAnswer }}</p>
      </div>
      </section>
  </div>
</template>

<script>
module.exports = {
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
      correctAnswer: ''
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
            self.words = json.words.slice()
            const answerIndex = Math.floor(Math.random() * ((self.words.length - 1) - 0 + 1)) + 0
            const answer = self.words[answerIndex]
            self.answerEnglish = answer.english
            self.answerKorean = answer.korean
            self.showWords()
            // Only show category page link if not random category
            if (contentName !== 'random') {
              self.linkVisible = true
              self.categoryLink = `info/${contentName}`
            }
            return true
          }
        }).catch(function (e) {
          console.log(e)
        })
    },
    showWords () {
      this.wordVisible = true
      this.dbLoaded = true
      this.genButtonDisabled = false
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
            self.contentNames = json.content_names.map(function(content) {
              return content.full_name
            })

            self.retrieveWords()
        }).catch(function (e) {
          console.log(e)
        })
  }
}
</script>