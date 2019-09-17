<template>
  <div class="main random-words">
    <side-panel>
      <h2>Categories</h2>
      <input v-model="categoryFilter" type="text" placeholder="Search category" />
      <button @click="categoryFilter = ''">Clear Search</button>
      <ul class="text-list" v-if="Object.keys(filteredCategories).length">
        <li :class="{active: id === 'all'}">
          <router-link :to="`/random-words/all`">All</router-link>
        </li>
        <li
          v-for="category in filteredCategories"
          :key="category.id"
          :class="{active: id === category.id}"
        >
          <router-link :to="`/random-words/${category.id}`">{{ category.name }}</router-link>
        </li>
      </ul>
      <ul class="text-list" v-else>
        <li>No results found for category search</li>
      </ul>
    </side-panel>
    <main-panel>
      <h1>Random Word Generator</h1>
      <h2>{{ category.name }}</h2>
      <h3 v-if="category.korean">{{ category.korean }}</h3>
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
    </main-panel>
  </div>
</template>


<script>
import { Categories } from "./../static/categories.js";
import MainPanel from "./../components/MainPanel.vue";
import SidePanel from "./../components/SidePanel.vue";
import { getIndexFromArray } from "./../utilities.js";

export default {
  name: "random-words",
  components: {
    MainPanel,
    SidePanel
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ""
    }
  },
  data: function() {
    return {
      category: [],
      categoryFilter: "",
      englishWord: "",
      koreanWord: "",
      flashcardMode: false,
      languageDirection: "toEnglish",
      showAnswer: false
    };
  },
  watch: {
    id: function() {
      this.loadCategory();
    },
    flashcardMode: function() {
      this.showAnswer = false;
    }
  },
  computed: {
    filteredCategories: function() {
      const filteredCats = {};
      Object.keys(Categories)
        .filter(
          cat =>
            cat.toLowerCase().indexOf(this.categoryFilter.toLowerCase()) > -1
        )
        .reduce((obj, cat) => {
          filteredCats[cat] = Categories[cat];
        }, {});
      return filteredCats;
    }
  },
  methods: {
    loadCategory: function() {
      if (this.id === "all") {
        this.category = {
          name: "All",
          id: "all",
          words: []
        };
      } else if (Categories.hasOwnProperty(this.id)) {
        this.category = Categories[this.id];
      }

      this.generateWord();
    },
    generateWord: function() {
      if (this.id === "all") {
        const categoriesKeys = Object.keys(Categories);
        const categoryIndex = getIndexFromArray(categoriesKeys);
        console.log(categoriesKeys.length);
        console.log(categoryIndex);
        const category = Categories[categoriesKeys[categoryIndex]];
        this.setWordFromCategory(category);
      } else if (Categories.hasOwnProperty(this.id)) {
        const category = Categories[this.id];
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
  },
  mounted: function() {
    this.loadCategory();
    this.generateWord();
  }
};
</script>