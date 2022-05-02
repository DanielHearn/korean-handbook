import {
  getRandomIndexFromArray,
  shuffleArray,
} from '../../static/utilities.js'
import { NUMBER_OF_CHARACTERS } from './constants'

export default {
  name: 'Test',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      word: null,
      numberOfCharacters: NUMBER_OF_CHARACTERS,
      generatedCharacters: {},
      selected: {},
      currentStep: 1,
      numberOfSteps: 0,
      completed: false,
    }
  },
  watch: {
    category: function() {
      this.reset()
    },
  },
  methods: {
    reset: function() {
      this.word = null
      this.generatedCharacters = {}
      this.currentStep = 1
      this.completed = false
      this.selected = {}
      this.generateWord()
    },
    generateWord: function() {
      const words = this.category.words
      const wordIndex = getRandomIndexFromArray(words)
      const newWord = words[wordIndex]
      this.numberOfSteps = newWord.k.length

      let koreanCharacters = []
      for (const otherWordIndex in words) {
        if (otherWordIndex !== wordIndex) {
          const otherWord = words[otherWordIndex]
          koreanCharacters = koreanCharacters.concat([...otherWord.k])
        }
      }

      let i = 0
      while (i < this.numberOfSteps) {
        const letter = newWord.k[i]
        let charactersForStep = []
        while (charactersForStep.length < NUMBER_OF_CHARACTERS - 1) {
          const newCharacter =
            koreanCharacters[getRandomIndexFromArray(koreanCharacters)]
          console.log(newCharacter)
          if (
            !charactersForStep.includes(newCharacter) &&
            newCharacter !== ' ' &&
            newCharacter !== letter
          ) {
            charactersForStep.push(newCharacter)
          }
        }

        charactersForStep.push(letter)
        this.generatedCharacters[i + 1] = shuffleArray(charactersForStep)
        i++
      }

      this.word = newWord
    },
    nextWord: function() {
      if (this.currentStep === this.numberOfSteps) {
        this.reset()
      }
    },
    selectCharacter: function(character) {
      if (character === this.word.k[this.currentStep - 1]) {
        this.selected = {}
        if (this.currentStep === this.numberOfSteps) {
          this.completed = true
        } else {
          this.currentStep++
        }
      } else {
        this.selected = { ...this.selected, [character]: true }
      }
    },
  },
  mounted() {
    this.generateWord()
  },
}
