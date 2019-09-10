<template>
  <div class="main random-words">
    <side-panel>
      <h2>Categories</h2>
      <input v-model="categoryFilter" type="text" placeholder="Search category" />
      <button @click="categoryFilter = ''">Clear Search</button>
      <ul v-if="Object.keys(filteredCategories).length">
        <li>
          <router-link :to="`/random-words/all`">All</router-link>
        </li>
        <li v-for="category in filteredCategories" :key="category.id">
          <router-link :to="`/random-words/${category.id}`">{{ category.name }}</router-link>
        </li>
      </ul>
      <ul v-else>
        <li>No results found for category search</li>
      </ul>
    </side-panel>
    <main-panel>
      <h1>Random Words</h1>
      <h2>{{ category.name }}</h2>
      <div v-if="flashcardMode">
        <div>
          <p v-if="wordDirection === 'toEnglish'">{{ koreanWord }}</p>
          <p v-else>{{ englishWord }}</p>
        </div>
        <div v-if="showAnswer">
          <p v-if="wordDirection === 'toEnglish'">{{ englishWord }}</p>
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
      <input id="flashcardModeToggle" type="checkbox" v-model="flashcardMode" />
      <label for="flashcardModeToggle">Flashcard Mode</label>
      <button v-if="flashcardMode" :disabled="showAnswer" @click="showAnswer = true">Show Answer</button>
    </main-panel>
  </div>
</template>


<script>
import { Categories } from "./../static/categories.js";
import MainPanel from "./../components/MainPanel.vue";
import SidePanel from "./../components/SidePanel.vue";

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
      wordDirection: "toEnglish",
      showAnswer: false
    };
  },
  watch: {
    id: function() {
      this.loadCategory();
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
        const categoryIndex =
          Math.floor(Math.random() * (categoriesKeys.length - 1)) + 1;
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
        const wordIndex =
          Math.floor(Math.random() * (category.words.length - 1)) + 1;
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