import SwitchInput from '../SwitchInput/SwitchInput.vue';
import OptionRow from '../OptionRow/OptionRow.vue';
import { getRandomIndexFromArray } from './../../static/utilities.js';
import { Categories } from './../../static/categories.js';

export default {
  name: 'random-word-generator',
  components: {
    SwitchInput,
    OptionRow,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      word: { e: '', k: '' },
      flashcardMode: false,
      languageDirection: 'toEnglish',
      showAnswer: false,
    };
  },
  watch: {
    flashcardMode: function () {
      this.showAnswer = false;
    },
    category: function () {
      this.generateWord();
    },
  },
  methods: {
    generateWord: function () {
      if (this.category.id === 'all') {
        const categoriesKeys = Object.keys(Categories);
        const categoryIndex = getRandomIndexFromArray(categoriesKeys);
        const category = Categories[categoriesKeys[categoryIndex]];
        this.setWordFromCategory(category);
      } else {
        this.setWordFromCategory(this.category);
      }
      if (this.flashcardMode) {
        this.showAnswer = false;
      }
    },
    setWordFromCategory(category) {
      const filteredWords = category.words.filter((word) => word !== this.word);
      if (filteredWords.length) {
        const wordIndex = getRandomIndexFromArray(filteredWords);
        const word = filteredWords[wordIndex];
        this.word = word;
      }
    },
    toggleFlashcardMode() {
      this.flashcardMode = !this.flashcardMode;
    },
  },
  mounted() {
    this.generateWord();
  },
};
