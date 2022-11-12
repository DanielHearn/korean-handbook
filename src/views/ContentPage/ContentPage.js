import { mapState, mapActions } from 'pinia';
import { useMobileStore } from '@/stores/mobile';

import { Categories } from '../../static/categories.js';
import MainPanel from '../../components/MainPanel/MainPanel.vue';
import SidePanel from '../../components/SidePanel/SidePanel.vue';
import HeaderPanel from '../../components/HeaderPanel/HeaderPanel.vue';
import NavigationTabs from '../../components/NavigationTabs/NavigationTabs.vue';
import DataTable from '../../components/DataTable/DataTable.vue';
import SearchInput from '../../components/SearchInput/SearchInput.vue';
import RandomWordGenerator from '../../components/RandomWordGenerator/RandomWordGenerator.vue';
import SearchList from '../../components/SearchList/SearchList.vue';
import MatchGame from '../../components/MatchGame/MatchGame.vue';
import TestGame from '../../components/TestGame/TestGame.vue';
import { generateTabs } from '@/static/utilities';
import { TITLES } from '@/static/constants';

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
    ...mapState(useMobileStore, ['mobile', 'categoryMenu']),
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
    tabs: function () {
      return generateTabs(this.mobile, this.id);
    },
    title: function () {
      return TITLES[this.content];
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
    category: function () {
      this.closeSearch();
    },
    content: function () {
      this.closeSearch();
    },
  },
  mounted: function () {
    this.loadCategory();

    if (this.mobile && !Object.keys(this.category).length) {
      this.sidePanelOpenInitially = true;
    }
  },
  methods: {
    ...mapActions(useMobileStore, ['setCategoryMenu']),
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
    openSearch: function () {
      this.setCategoryMenu(true);
    },
    closeSearch: function () {
      this.setCategoryMenu(false);
    },
  },
};
