import { getRandomIndexFromArray, shuffleArray } from '../../static/utilities.js';
import TextInput from '../../components/TextInput/TextInput.vue';
import { mapState } from 'pinia';
import { useMobileStore } from '@/stores/mobile';

const DURATION = 60;

export default {
  name: 'TypingGame',
  components: {
    TextInput,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      prevWord: null,
      currWord: null,
      nextWord: null,
      completed: false,
      started: false,
      time: DURATION,
      value: '',
      wordsCompleted: 0,
      matchingLetters: {},
    };
  },
  watch: {
    category: function () {
      this.reset();
    },
    started: function () {
      if (this.started) {
        this.runTimer();
      }
    },
    time: function () {
      if (this.time === 0) {
        this.completed = true;
        this.value = '';
      }
    },
    value: function () {
      if (this.value && this.value === this.currWord.k) {
        this.moveToNextWords();
      } else {
        const matchingLetters = {};
        for (const i in this.currWord.k) {
          if (this.value.length && this.value[i]) {
            if (this.value[i] === this.currWord.k[i]) {
              matchingLetters[i] = true;
            } else {
              matchingLetters[i] = false;
            }
          }
        }
        this.matchingLetters = matchingLetters;
      }
    },
  },
  computed: {
    timeString: function () {
      if (this.time === 60) {
        return '1:00';
      } else if (this.time < 10) {
        return `0:0${this.time}`;
      } else {
        return `0:${this.time}`;
      }
    },
    ...mapState(useMobileStore, ['mobile']),
  },
  methods: {
    reset: function () {
      this.prevWord = null;
      this.currWord = null;
      this.nextWord = null;
      this.completed = false;
      this.started = false;
      this.value = '';
      this.wordsCompleted = 0;
      this.matchingLetters = {};
      this.resetTimer();
      this.start();
    },
    runTimer: function () {
      if (this.time > 0 && this.started && !this.completed) {
        setTimeout(() => {
          if (this.started) {
            this.time -= 1;
            this.runTimer();
          }
        }, 1000);
      }
    },
    resetTimer: function () {
      this.time = DURATION;
    },
    getRandomWord: function () {
      return this.category.words[getRandomIndexFromArray(this.category.words)];
    },
    start: function () {
      this.prevWord = null;
      this.currWord = this.getRandomWord();
      this.nextWord = this.getRandomWord();
    },
    moveToNextWords: function () {
      this.prevWord = this.currWord;
      this.currWord = this.nextWord;
      this.nextWord = this.getRandomWord();
      this.value = '';
      this.wordsCompleted++;
      this.matchingLetters = {};
    },
    valueChange: function (newValue) {
      if (!this.started) {
        this.started = true;
      }
      if (typeof newValue === 'string' && !this.completed) {
        this.value = newValue;
      }
    },
    normalizeKorean: (koreanString) => koreanString?.normalize('NFC') || '',
  },
  mounted() {
    this.reset();
  },
};
