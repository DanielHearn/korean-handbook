<template>
  <div :class="`main ${content}-page`">
    <side-panel
      :mobile="mobile"
      title="Categories"
      :open-initially="sidePanelOpenInitially"
      @side-panel-toggle="toggleSidePanel"
    >
      <template #header>
        <h2 v-if="!mobile" class="sub-heading">Categories</h2>
        <SearchInput
          :value="categoryFilter"
          placeholder="Search categories"
          @search="searchCategories"
        />
      </template>
      <template #content>
        <SearchList
          :items="filteredCategories"
          :active-i-d="id"
          no-results-text="No results found for category search."
        />
      </template>
    </side-panel>
    <main-panel v-if="category" :class="{ hidden: sidePanelOpen }">
      <header-panel>
        <h1>{{ category.name }}</h1>
        <h2>
          <NavigationTabs
            :items="[
              { name: 'Info', slug: 'info', url: `/content/${id}/info` },
              { name: 'Random', slug: 'random', url: `/content/${id}/random` },
              {
                name: 'Match',
                slug: 'match',
                url: `/content/${id}/match`,
              },
              {
                name: 'Test',
                slug: 'test',
                url: `/content/${id}/test`,
              },
            ]"
            :selected="content"
          />
        </h2>
      </header-panel>
      <div v-if="category" class="page-content">
        <DataTable v-if="content === 'info'" :rows="category.words" :columns="category.columns" />
        <RandomWordGenerator v-if="content === 'random'" :category="category" />
        <MatchGame v-if="content === 'match'" :category="category" />
        <TestGame v-if="content === 'test'" :category="category" />
      </div>
    </main-panel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useMobileStore } from '@/stores/mobile';

import { Categories } from './../static/categories.js';
import MainPanel from './../components/MainPanel/MainPanel.vue';
import SidePanel from './../components/SidePanel/SidePanel.vue';
import HeaderPanel from './../components/HeaderPanel/HeaderPanel.vue';
import NavigationTabs from './../components/NavigationTabs/NavigationTabs.vue';
import DataTable from './../components/DataTable/DataTable.vue';
import SearchInput from '../components/SearchInput/SearchInput.vue';
import RandomWordGenerator from './../components/RandomWordGenerator/RandomWordGenerator.vue';
import SearchList from './../components/SearchList/SearchList.vue';
import MatchGame from './../components/MatchGame/MatchGame.vue';
import TestGame from './../components/TestGame/TestGame.vue';

export default {
  name: 'ContentPage',
  components: {
    MainPanel,
    SidePanel,
    HeaderPanel,
    NavigationTabs,
    DataTable,
    SearchInput,
    RandomWordGenerator,
    SearchList,
    MatchGame,
    TestGame,
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
  },
  data: function () {
    return {
      category: null,
      categoryFilter: '',
      sidePanelOpen: false,
      sidePanelOpenInitially: false,
    };
  },
  computed: {
    ...mapState(useMobileStore, ['mobile']),
    filteredCategories: function () {
      const createListItem = (cats) =>
        cats.map((cat) => {
          return {
            name: cat.name,
            id: cat.id,
            link: `/content/${cat.id}/${this.content}`,
          };
        });

      if (!this.categoryFilter.length) {
        return createListItem(Object.values(Categories));
      }

      return createListItem(
        Object.values(Categories).filter(
          (cat) => cat.name.toLowerCase().indexOf(this.categoryFilter.toLowerCase()) > -1
        )
      );
    },
  },
  watch: {
    id: function () {
      this.loadCategory();
    },
    mobile: function () {
      if (!this.mobile) {
        this.sidePanelOpen = false;
      }
    },
  },
  mounted: function () {
    this.loadCategory();

    if (this.mobile && !Object.keys(this.category).length) {
      this.sidePanelOpenInitially = true;
    }
  },
  methods: {
    loadCategory: function () {
      if (Categories.hasOwnProperty(this.id)) {
        this.category = Categories[this.id];
      } else if (this.id.length) {
        this.$router.push({ path: '/' });
      }
    },
    toggleSidePanel: function (value) {
      this.sidePanelOpen = value;
    },
    searchCategories: function (value) {
      this.categoryFilter = value;
    },
  },
};
</script>
