import { getRandomIndexFromArray } from './../../static/utilities.js'

export default {
  name: 'random-word-generator',
  props: {
    category: {
      type: Object,
      required: true,
      default: () => {
        return {
          name: '',
          id: '',
          words: [],
        }
      },
    },
    categories: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
  data: function() {
    return {
      word: { e: '', k: '' },
      flashcardMode: false,
      languageDirection: 'toEnglish',
      showAnswer: false,
    }
  },
  watch: {
    flashcardMode: function() {
      this.showAnswer = false
    },
    'category.id': function() {
      this.generateWord()
    },
  },
  methods: {
    generateWord: function() {
      if (this.category.id === 'all') {
        const categoriesKeys = Object.keys(this.categories)
        const categoryIndex = getRandomIndexFromArray(categoriesKeys)
        const category = this.categories[categoriesKeys[categoryIndex]]
        this.setWordFromCategory(category)
      } else if (this.categories.hasOwnProperty(this.category.id)) {
        const category = this.categories[this.category.id]
        this.setWordFromCategory(category)
      }
      if (this.flashcardMode) {
        this.showAnswer = false
      }
    },
    setWordFromCategory(category) {
      const filteredWords = category.words.filter(word => word !== this.word)
      if (filteredWords.length) {
        const wordIndex = getRandomIndexFromArray(filteredWords)
        const word = filteredWords[wordIndex]
        this.word = word
      }
    },
  },
}
