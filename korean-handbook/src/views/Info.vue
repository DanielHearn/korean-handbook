<template>
  <div class="main info">
    <side-panel
      :mobile="mobile"
      :title="'Categories'"
      :open-initially="sidePanelOpenInitially"
      v-on:side-panel-toggle="toggleSidePanel"
    >
      <h2 v-if="!mobile" class="sub-heading">Categories</h2>
      <div class="search-form">
        <button class="button--close" @click="categoryFilter = ''">
          <i class="material-icons">close</i>
        </button>
        <input
          v-model="categoryFilter"
          type="text"
          placeholder="Search categories"
        />
        <button class="button--search">
          <i class="material-icons">search</i>
        </button>
      </div>
      <div class="search-list">
        <ul class="text-list" v-if="Object.keys(filteredCategories).length">
          <li v-if="categoryFilter" class="list-item">
            <p class="text">
              {{ Object.keys(filteredCategories).length }} results found.
            </p>
          </li>
          <li
            v-for="category in filteredCategories"
            :key="category.id"
            :class="{ active: id === category.id }"
            class="list-item"
          >
            <router-link :to="`/info/${category.id}`">{{
              category.name
            }}</router-link>
          </li>
        </ul>
        <ul class="text-list no-results" v-else>
          <li class="list-item">
            <p class="text">
              No results found for category search.
            </p>
          </li>
        </ul>
      </div>
    </side-panel>
    <main-panel :class="{ hidden: sidePanelOpen }">
      <template v-if="id">
        <div class="page-header">
          <h1 class="page-type-heading">Word Categories</h1>
          <h2 class="heading">{{ category.name }}</h2>
          <h3 class="sub-heading">{{ category.korean }}</h3>
          <div class="search-form search--info">
            <button class="button--close" @click="wordFilter = ''">
              <i class="material-icons">close</i>
            </button>
            <input
              v-model="wordFilter"
              type="text"
              placeholder="Search words"
            />
            <button class="button--search">
              <i class="material-icons">search</i>
            </button>
          </div>
          <ul class="grid grid--header">
            <li class="grid-item grid-header" >
              <p class="text">English</p>
              <p class="text">Korean</p>
              <p v-if="category.note_header" class="text">
                {{ category.note_header }}
              </p>
            </li>
          </ul>
        </div>
        <div class="page-content">
          <ul class="grid">
            <li
              v-if="filteredWords.length && wordFilter.length"
              class="grid-notice"
            >
              <p class="text">{{ filteredWords.length }} results for search.</p>
            </li>
            <li
              v-if="!filteredWords.length && wordFilter.length"
              class="grid-notice"
            >
              <p class="text">No results for search.</p>
            </li>
            <li
              class="grid-item"
              v-for="word in filteredWords"
              :key="word.e + word.k"
            >
              <p class="text">{{ word.e }}</p>
              <p class="text">{{ word.k }}</p>
              <p v-if="word.n" class="text">{{ word.n }}</p>
            </li>
          </ul>
        </div>
      </template>
      <template v-else>
        <div class="page-header">
          <h1 class="page-type-heading">Word Categories</h1>
        </div>
        <div class="page-content">
          <p class="text">
            Select a category from the category selection menu.
          </p>
        </div>
      </template>
    </main-panel>
  </div>
</template>

<script>
import { Categories } from './../static/categories.js'
import MainPanel from './../components/MainPanel/MainPanel.vue'
import SidePanel from './../components/SidePanel/SidePanel.vue'

export default {
  name: 'info',
  components: {
    MainPanel,
    SidePanel,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
    mobile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: function() {
    return {
      category: {},
      filteredWords: [],
      categoryFilter: '',
      wordFilter: '',
      sidePanelOpen: false,
      sidePanelOpenInitially: false,
    }
  },
  watch: {
    id: function() {
      this.loadCategory()
    },
    wordFilter: function() {
      this.filterWords()
    },
    mobile: function() {
      if (!this.mobile) {
        this.sidePanelOpen = false
      }
    },
  },
  computed: {
    filteredCategories: function() {
      const filteredCats = {}
      Object.keys(Categories)
        .filter(
          cat =>
            cat.toLowerCase().indexOf(this.categoryFilter.toLowerCase()) > -1
        )
        .reduce((obj, cat) => {
          filteredCats[cat] = Categories[cat]
        }, {})
      return filteredCats
    },
  },
  methods: {
    loadCategory: function() {
      if (Categories.hasOwnProperty(this.id)) {
        this.category = Categories[this.id]
        this.filteredWords = this.category.words
        this.wordFilter = ''
      } else if (this.id.length) {
        this.$router.push({ path: '/info', params: { id: 'all' } })
      }
    },
    filterWords: function() {
      if (this.category.words) {
        this.filteredWords = []
        const filter = this.wordFilter.toLowerCase()

        for (let word of this.category.words) {
          let matchesFilter = false
          if (
            word.e.toLowerCase().includes(filter) ||
            word.k.toLowerCase().includes(filter)
          ) {
            matchesFilter = true
          }

          if (matchesFilter) {
            this.filteredWords.push(word)
          }
        }
      }
    },
    toggleSidePanel: function(value) {
      this.sidePanelOpen = value
    },
  },
  mounted: function() {
    this.loadCategory()

    if (this.mobile && !Object.keys(this.category).length) {
      this.sidePanelOpenInitially = true
    }
  },
}
</script>
