import { mapState } from 'pinia';
import { useMobileStore } from '@/stores/mobile';

import MainPanel from '../../components/MainPanel/MainPanel.vue';
import SidePanel from '../../components/SidePanel/SidePanel.vue';
import HeaderPanel from '../../components/HeaderPanel/HeaderPanel.vue';

export default {
  name: 'HomePage',
  components: {
    MainPanel,
    SidePanel,
    HeaderPanel,
  },
  computed: {
    ...mapState(useMobileStore, ['mobile']),
    mobile() {
      return this.mobile;
    },
  },
};
