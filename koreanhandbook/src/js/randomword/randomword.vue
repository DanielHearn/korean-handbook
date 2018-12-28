<template>
   <section id="app">
      <section class="korean__container">
        <div class="word__container">
          <div id="genWord">
            <div class="pulseLoader" v-bind:class="{ hideLoader: dbLoaded }">
              <div class="pulse"></div>
              <div class="pulse"></div>
            </div>
            <h2 id="genWord__english" v-bind:class="{ visible: wordVisible }">{{ word_english }}</h2>
            <h3 id="genWord__korean" v-bind:class="{ visible: wordVisible }">{{ word_korean }}</h3>
          </div>
          <button class="button--purple" v-bind:disabled="buttonDisabled" @click="retrieveWord()" v-if="language === 'English'">Generate Word</button>
          <button class="button--purple" v-bind:disabled="buttonDisabled" @click="retrieveWord()" v-if="language === 'Korean'">다음 워드</button>
        </div>
        <div class="option__container">
          <div class="option">
              <p>Word Category</p>
              <select 
                v-model="content" v-on:change="retrieveWord">
                    <option>Random</option>
                    <option 
                        v-for="name in contentNames">
                        {{ name }}
                        </option>
              </select>
          </div>
          <div class="option">
              <p v-if="language === 'English'">Language</p>
              <p v-if="language === 'Korean'">언어</p>
              <select v-model="language" id="language-select">
                  <option>English</option>
                  <option>Korean</option>
              </select>
          </div>
          <div class="option">
            <a 
                v-bind:href="categoryLink"
                v-bind:class="{ visible: linkVisible }" class="link-text accent">View full category page</a>
        </div>
        </div>
      </section>
    </section> 
</template>

<script>
export default {
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
                self.contentNames = json.content_names.map(function(content) {
                    return content.full_name
                })

                self.retrieveWord()
            }).catch(function (e) {
            console.log(e)
            })
    }
}
</script>

