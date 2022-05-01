import {
  getRandomIndexFromArray,
  shuffleArray,
} from '../../static/utilities.js'
import { NUMBER_OF_WORDS } from './constants'

export default {
  name: 'Match',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      completed: {},
      completedWords: [],
      englishWords: [],
      koreanWords: [],
      selected: { e: null, k: null },
      numberOfWords: NUMBER_OF_WORDS,
    }
  },
  watch: {
    category: function() {
      this.reset()
    },
    selected: {
      handler(selected) {
        if (selected.e !== null && selected.k !== null) {
          if (selected.e === selected.k) {
            this.completed[selected.e] = true
            this.selected = { e: null, k: null }
            this.completedWords = Object.keys(this.completed).map(key => {
              const e = this.englishWords[key].word
              const k = this.koreanWords[key].word
              return {
                id: `${e}_${k}`,
                e: e,
                k: k,
              }
            })
          } else {
            this.selected = { e: null, k: null }
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    generateWords: function() {
      const newWords = []
      const newWordIndexes = []
      const words = this.category.words
      this.numberOfWords =
        this.category.words.length <= NUMBER_OF_WORDS
          ? this.category.words.length
          : NUMBER_OF_WORDS
      if (this.category.words.length <= NUMBER_OF_WORDS) {
        words.forEach((word, i) => {
          newWords.push(word)
          newWordIndexes.push(i)
        })
      } else {
        while (newWords.length <= this.numberOfWords) {
          const wordIndex = getRandomIndexFromArray(words)
          if (!newWordIndexes.includes(wordIndex)) {
            newWords.push(words[wordIndex])
            newWordIndexes.push(wordIndex)
          }
        }
      }
      const englishWords = shuffleArray(
        newWords.map((word, i) => {
          return { id: i, word: word.e }
        })
      )
      const koreanWords = shuffleArray(
        newWords.map((word, i) => {
          return { id: i, word: word.k }
        })
      )
      this.englishWords = englishWords
      this.koreanWords = koreanWords
    },
    onWordClick: function(wordKey, id) {
      if (
        (this.selected.e !== null && this.selected.k !== null) ||
        this.completed[id]
      ) {
        return false
      }
      if (this.selected[wordKey] === id) {
        this.selected[wordKey] = null
      } else if (this.selected[wordKey] === null) {
        this.selected[wordKey] = id
      }
    },
    reset: function() {
      this.completed = {}
      this.selected = { e: null, k: null }
      this.englishWords = []
      this.koreanWords = []
      this.completedWords = []
      this.numberOfWords =
        this.category.words.length <= NUMBER_OF_WORDS
          ? this.category.words.length
          : NUMBER_OF_WORDS
      this.generateWords()
    },
    nextWords: function() {
      if (Object.keys(this.completed).length === this.numberOfWords) {
        this.reset()
      }
    },
  },
  mounted() {
    this.generateWords()
  },
  created() {
    this.numberOfWords =
      this.category.words.length <= NUMBER_OF_WORDS
        ? this.category.words.length
        : NUMBER_OF_WORDS
  },
}
