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
        <Search
          :value="categoryFilter"
          placeholder="Search categories"
          v-on:search="searchCategories"
        />
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
    <main-panel v-if="category" :class="{ hidden: sidePanelOpen }">
      <header-panel>
        <h1>{{ category.name }}</h1>
        <h2>
          <Tabs
            :items="[
              { name: 'Info', slug: 'info', url: `/content/${id}/info` },
              { name: 'Random', slug: 'random', url: `/content/${id}/random` },
            ]"
            :selected="content"
          />
        </h2>
      </header-panel>
      <div class="page-content" v-if="category">
        <Table
          v-if="content === 'info'"
          :rows="category.words"
          :columns="category.columns"
        />
      </div>
    </main-panel>
  </div>
</template>

<script>
import { Categories } from './../static/categories.js'
import MainPanel from './../components/MainPanel/MainPanel.vue'
import SidePanel from './../components/SidePanel/SidePanel.vue'
import HeaderPanel from './../components/HeaderPanel/HeaderPanel.vue'
import Tabs from './../components/Tabs/Tabs.vue'
import Table from './../components/Table/Table.vue'
import Search from './../components/Search/Search.vue'

export default {
  name: 'content',
  components: {
    MainPanel,
    SidePanel,
    HeaderPanel,
    Tabs,
    Table,
    Search,
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
      category: null,
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
      } else if (this.id.length) {
        this.$router.push({ path: '/' })
      }
    },
    toggleSidePanel: function(value) {
      this.sidePanelOpen = value
    },
    searchCategories: function(value) {
      this.categoryFilter = value
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
