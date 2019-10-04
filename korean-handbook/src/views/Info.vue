<template>
  <div class="main info">
    <side-panel>
      <h2 class="heading">Categories</h2>
      <div class="search-form">
        <button class="button--close" @click="categoryFilter = ''">
          <i class="material-icons">close</i>
        </button>
        <input v-model="categoryFilter" type="text" placeholder="Search category" />
        <button class="button--search">
          <i class="material-icons">search</i>
        </button>
      </div>
      <div class="search-list">
        <ul class="text-list" v-if="Object.keys(filteredCategories).length">
          <li
            v-for="category in filteredCategories"
            :key="category.id"
            :class="{active: id === category.id}"
            class="list-item"
          >
            <router-link :to="`/info/${category.id}`">{{ category.name }}</router-link>
          </li>
        </ul>
        <ul class="text-list no-results" v-else>
          <li class="list-item">
            <p>No results found for category search</p>
          </li>
        </ul>
      </div>
    </side-panel>
    <main-panel>
      <div v-if="id">
        <div class="page-header">
          <h1 class="page-type-heading">Info</h1>
          <h2 class="heading">{{ category.name }}</h2>
          <h3 class="sub-heading">{{ category.korean }}</h3>
        </div>
        <div class="search-form search--info">
          <button class="button--close" @click="wordFilter = ''">
            <i class="material-icons">close</i>
          </button>
          <input v-model="wordFilter" type="text" placeholder="Search category" />
          <button class="button--search">
            <i class="material-icons">search</i>
          </button>
        </div>
        <ul class="grid">
          <li class="grid-item grid-header" v-if="filteredWords.length">
            <p>English</p>
            <p>Korean</p>
            <p v-if="category.note_header">{{ category.note_header }}</p>
          </li>
          <li v-else class="grid-notice">
            <p>No results for search.</p>
          </li>
          <li class="grid-item" v-for="word in filteredWords" :key="word.e">
            <p>{{ word.e }}</p>
            <p>{{ word.k }}</p>
            <p v-if="word.n">{{ word.n }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <div class="page-header">
          <h2 class="heading">Info</h2>
        </div>
        <p>Select a category from the category selection menu to look at a selection of words from the selected category.</p>
      </div>
    </main-panel>
  </div>
</template>

<script>
import { Categories } from "./../static/categories.js";
import MainPanel from "./../components/MainPanel.vue";
import SidePanel from "./../components/SidePanel.vue";

export default {
  name: "info",
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
      category: {},
      filteredWords: [],
      categoryFilter: "",
      wordFilter: ""
    };
  },
  watch: {
    id: function() {
      this.loadCategory();
    },
    wordFilter: function() {
      this.filterWords();
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
      if (Categories.hasOwnProperty(this.id)) {
        this.category = Categories[this.id];
        this.filteredWords = this.category.words;
        this.wordFilter = "";
      } else if (this.id.length) {
        console.error("No category for current id");
        this.$router.push({ path: "/info", params: { id: "all" } });
      }
    },
    filterWords: function() {
      if (this.category.words) {
        this.filteredWords = [];
        const filter = this.wordFilter.toLowerCase();

        for (let word of this.category.words) {
          let matchesFilter = false;
          if (
            word.e.toLowerCase().includes(filter) ||
            word.k.toLowerCase().includes(filter)
          ) {
            matchesFilter = true;
          }

          if (matchesFilter) {
            this.filteredWords.push(word);
          }
        }
      }
    }
  },
  mounted: function() {
    this.loadCategory();
  }
};
</script>
