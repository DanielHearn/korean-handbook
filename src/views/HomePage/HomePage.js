import { mapState } from 'pinia';
import { useMobileStore } from '@/stores/mobile';
import { generateTabs } from '@/static/utilities';
import MainPanel from '../../components/MainPanel/MainPanel.vue';
import SidePanel from '../../components/SidePanel/SidePanel.vue';
import HeaderPanel from '../../components/HeaderPanel/HeaderPanel.vue';
import NavigationTabs from '../../components/NavigationTabs/NavigationTabs.vue';

export default {
  name: 'HomePage',
  components: {
    MainPanel,
    SidePanel,
    HeaderPanel,
    NavigationTabs,
  },
  computed: {
    ...mapState(useMobileStore, ['mobile']),
    tabs: function () {
      return generateTabs(this.mobile);
    },
    introLinks: function () {
      return generateTabs();
    },
  },
};
