import { mapState } from 'pinia';
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
