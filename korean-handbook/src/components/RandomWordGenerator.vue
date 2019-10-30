<template>
  <div>
    <div style="display: flex;">
      <input id="flashcardModeToggle" type="checkbox" v-model="flashcardMode" />
      <label for="flashcardModeToggle">Flashcard Mode</label>
    </div>
    <div style="display: flex; flex-direction: column;" v-if="flashcardMode">
      <p>Test your knowledge by testing if you know the translation of the word shown below.</p>
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
    <div v-if="flashcardMode" class="flashcards">
      <div class="flashcard">
        <p v-if="languageDirection === 'toEnglish'">{{ word.k }}</p>
        <p v-else>{{ word.e }}</p>
      </div>
      <div v-if="showAnswer" class="flashcard">
        <p v-if="languageDirection === 'toEnglish'">{{ word.e }}</p>
        <p v-else>{{ word.k }}</p>
      </div>
    </div>
    <div v-else>
      <div>
        <p>{{ word.k }}</p>
      </div>
      <div>
        <p>{{ word.e }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="button--primary" @click="generateWord">Next Word</button>
      <button
        class="button--secondary"
        v-if="flashcardMode"
        :disabled="showAnswer"
        @click="showAnswer = true"
      >Show Answer</button>
    </div>
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
      word: { e: "", k: "" },
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
      const currentWordIndex = category.words.indexOf(this.word);
      if (category.words && category.words.length) {
        if (currentWordIndex > 0) {
          // currently shown word is part of new category so filter it out
          let filteredWords = category.words.slice();
          filteredWords.splice(currentWordIndex, 1);
          const wordIndex = getIndexFromArray(category.words);
          const word = category.words[wordIndex];
          this.word = word;
        } else {
          const wordIndex = getIndexFromArray(category.words);
          const word = category.words[wordIndex];
          this.word = word;
        }
      }
    }
  }
};
</script>
