<template>
  <div :class="`main ${content}-page`">
    <side-panel
      :mobile="mobile"
      title="Categories"
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
        <List
          :items="filteredCategories"
          :activeID="id"
          noResultsText="No results found for category search."
        />
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
              {
                name: 'Match',
                slug: 'match',
                url: `/content/${id}/match`,
              },
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
        <RandomWordGenerator v-if="content === 'random'" :category="category" />
        <Match v-if="content === 'match'" :category="category" />
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
import RandomWordGenerator from './../components/RandomWordGenerator/RandomWordGenerator.vue'
import List from './../components/List/List.vue'
import Match from './../components/Match/Match.vue'

export default {
  name: 'content',
  components: {
    MainPanel,
    SidePanel,
    HeaderPanel,
    Tabs,
    Table,
    Search,
    RandomWordGenerator,
    List,
    Match,
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
      const createListItem = cats =>
        cats.map(cat => {
          return {
            name: cat.name,
            id: cat.id,
            link: `/content/${cat.id}/${this.content}`,
          }
        })

      if (!this.categoryFilter.length) {
        return createListItem(Object.values(Categories))
      }

      return createListItem(
        Object.values(Categories).filter(
          cat =>
            cat.name.toLowerCase().indexOf(this.categoryFilter.toLowerCase()) >
            -1
        )
      )
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
