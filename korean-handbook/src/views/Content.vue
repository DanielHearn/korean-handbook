<template>
  <div class="main info">
    <side-panel
      :mobile="mobile"
      :title="'Categories'"
      :open-initially="sidePanelOpenInitially"
      v-on:side-panel-toggle="toggleSidePanel"
    >
      <template v-slot:header>
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
      </template>
      <template v-slot:content>
        <div class="search-list">
          <ul class="text-list" v-if="Object.keys(filteredCategories).length">
            <li
              v-for="category in filteredCategories"
              :key="category.id"
              :class="{ active: id === category.id }"
              class="list-item"
            >
              <router-link :to="`/content/${category.id}/${content}`">{{
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
      </template>
    </side-panel>
    <main-panel :class="{ hidden: sidePanelOpen }">
      <header-panel>
        <h1>{{ category.name }}</h1>
        <h2>
          <router-link :to="`/content/${id}/info`">Info</router-link>
          <router-link :to="`/content/${id}/random`">Random</router-link>
        </h2>
      </header-panel>
    </main-panel>
  </div>
</template>

<script>
import { Categories } from './../static/categories.js'
import MainPanel from './../components/MainPanel/MainPanel.vue'
import SidePanel from './../components/SidePanel/SidePanel.vue'
import HeaderPanel from './../components/HeaderPanel/HeaderPanel.vue'

export default {
  name: 'info',
  components: {
    MainPanel,
    SidePanel,
    HeaderPanel,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
    content: {
      type: String,
      required: false,
      default: 'info',
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
      categoryFilter: '',
      sidePanelOpen: false,
      sidePanelOpenInitially: false,
    }
  },
  watch: {
    id: function() {
      this.loadCategory()
    },
    mobile: function() {
      if (!this.mobile) {
        this.sidePanelOpen = false
      }
    },
  },
  methods: {
    loadCategory: function() {
      if (Categories.hasOwnProperty(this.id)) {
        this.category = Categories[this.id]
        this.filteredWords = this.category.words
      } else if (this.id.length) {
        this.$router.push({ path: '/' })
      }
    },
    toggleSidePanel: function(value) {
      this.sidePanelOpen = value
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
  mounted: function() {
    this.loadCategory()

    if (this.mobile && !Object.keys(this.category).length) {
      this.sidePanelOpenInitially = true
    }
  },
}
</script>
