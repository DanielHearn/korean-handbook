<template>
  <div class="main info">
    <side-panel>
      <h2>Categories</h2>
      <input v-model="categoryFilter" type="text" placeholder="Search category" />
      <button @click="categoryFilter = ''">Clear Search</button>
      <ul v-if="Object.keys(filteredCategories).length">
        <li v-for="category in filteredCategories" :key="category.id">
          <router-link :to="`/info/${category.id}`">{{ category.name }}</router-link>
        </li>
      </ul>
      <ul v-else>
        <li>No results found for category search</li>
      </ul>
    </side-panel>
    <main-panel>
      <h1>Info</h1>
      <div v-if="id">
        <h2>{{ category.name }}</h2>
        <ul class="grid">
          <li class="grid-item grid-header">
            <p>English</p>
            <p>Korean</p>
            <p v-if="category.note_header">{{ category.note_header }}</p>
          </li>
          <li class="grid-item" v-for="word in category.words" :key="word.e">
            <p>{{ word.e }}</p>
            <p>{{ word.k }}</p>
            <p v-if="word.n">{{ word.n }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Help text</p>
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
      category: [],
      categoryFilter: ""
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
      if (Categories.hasOwnProperty(this.id)) {
        this.category = Categories[this.id];
      }
    }
  },
  mounted: function() {
    this.loadCategory();
  }
};
</script>
