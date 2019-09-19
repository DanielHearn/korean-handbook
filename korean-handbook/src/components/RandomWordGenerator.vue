<template>
  <div>
    <div style="display: flex;">
      <input id="flashcardModeToggle" type="checkbox" v-model="flashcardMode" />
      <label for="flashcardModeToggle">Flashcard Mode</label>
    </div>
    <div style="display: flex;" v-if="flashcardMode">
      <div style="display: flex;">
        <input
          id="languageDirectionToggle"
          type="radio"
          value="toEnglish"
          v-model="languageDirection"
        />
        <label for="languageDirectionToggle">To English</label>
      </div>
      <div style="display: flex;">
        <input
          id="languageDirectionToggle"
          type="radio"
          value="toKorean"
          v-model="languageDirection"
        />
        <label for="languageDirectionToggle">To Korean</label>
      </div>
    </div>
    <div v-if="flashcardMode">
      <div>
        <p v-if="languageDirection === 'toEnglish'">{{ koreanWord }}</p>
        <p v-else>{{ englishWord }}</p>
      </div>
      <div v-if="showAnswer">
        <p v-if="languageDirection === 'toEnglish'">{{ englishWord }}</p>
        <p v-else>{{ koreanWord }}</p>
      </div>
    </div>
    <div v-else>
      <div>
        <p>{{ koreanWord }}</p>
      </div>
      <div>
        <p>{{ englishWord }}</p>
      </div>
    </div>
    <button @click="generateWord">Next Word</button>
    <button v-if="flashcardMode" :disabled="showAnswer" @click="showAnswer = true">Show Answer</button>
  </div>
</template>

<script>
import { getIndexFromArray } from "./../utilities.js";

export default {
  name: "random-word-generator",
  props: {
    category: {
      type: Object,
      required: true,
      default: () => {
        return {
          name: "",
          id: "",
          words: []
        };
      }
    },
    categories: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data: function() {
    return {
      englishWord: "",
      koreanWord: "",
      flashcardMode: false,
      languageDirection: "toEnglish",
      showAnswer: false
    };
  },
  watch: {
    flashcardMode: function() {
      this.showAnswer = false;
    },
    "category.id": function() {
      console.log("change");
      this.generateWord();
    }
  },
  methods: {
    generateWord: function() {
      if (this.category.id === "all") {
        const categoriesKeys = Object.keys(this.categories);
        const categoryIndex = getIndexFromArray(categoriesKeys);
        const category = this.categories[categoriesKeys[categoryIndex]];
        this.setWordFromCategory(category);
      } else if (this.categories.hasOwnProperty(this.category.id)) {
        const category = this.categories[this.category.id];
        this.setWordFromCategory(category);
      }
      if (this.flashcardMode) {
        this.showAnswer = false;
      }
    },
    setWordFromCategory(category) {
      if (category.words && category.words.length) {
        const wordIndex = getIndexFromArray(category.words);
        const word = category.words[wordIndex];
        this.englishWord = word.e;
        this.koreanWord = word.k;
      }
    }
  }
};
</script>
