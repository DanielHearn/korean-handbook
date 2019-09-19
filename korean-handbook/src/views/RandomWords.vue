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
      <ul class="text-list no-results" v-else>
        <li>
          <p>No results found for category search</p>
        </li>
      </ul>
    </side-panel>
    <main-panel>
      <h1>Random Word Generator</h1>
      <h2>{{ category.name }}</h2>
      <h3 v-if="category.korean">{{ category.korean }}</h3>
      <random-word-generator :category="category" :categories="$options.categories" />
    </main-panel>
  </div>
</template>


<script>
import { Categories } from "./../static/categories.js";
import MainPanel from "./../components/MainPanel.vue";
import SidePanel from "./../components/SidePanel.vue";
import RandomWordGenerator from "./../components/RandomWordGenerator.vue";

export default {
  name: "random-words",
  components: {
    MainPanel,
    SidePanel,
    RandomWordGenerator
  },
  categories: Categories,
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
      if (this.id === "all") {
        this.category = {
          name: "All",
          id: "all",
          words: []
        };
      } else if (Categories.hasOwnProperty(this.id)) {
        this.category = Categories[this.id];
      }
    }
  },
  mounted: function() {
    this.loadCategory();
  }
};
</script>