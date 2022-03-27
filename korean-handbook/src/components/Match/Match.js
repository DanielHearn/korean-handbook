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
      englishWords: [],
      koreanWords: [],
      selected: { e: null, k: null },
    }
  },
  watch: {
    category: function() {
      this.generateWords()
    },
    selected: {
      handler(selected) {
        if (selected.e !== null && selected.k !== null) {
          if (selected.e === selected.k) {
            this.completed[selected.e] = true
            this.selected = { e: null, k: null }
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
      while (newWords.length < NUMBER_OF_WORDS) {
        const wordIndex = getRandomIndexFromArray(words)
        if (!newWordIndexes.includes(wordIndex)) {
          newWords.push(words[wordIndex])
          newWordIndexes.push(wordIndex)
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
      } else if (!this.selected[wordKey]) {
        this.selected[wordKey] = id
      }
    },
    nextWords: function() {
      if (Object.keys(this.completed).length === NUMBER_OF_WORDS) {
        this.completed = {}
        this.selected = { e: null, k: null }
        this.englishWords = []
        this.koreanWords = []
        this.generateWords()
      }
    },
  },
  mounted() {
    this.generateWords()
  },
  created() {
    this.NUMBER_OF_WORDS = NUMBER_OF_WORDS
  },
}
