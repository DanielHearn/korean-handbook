import { mapState, mapActions } from 'pinia';
import { useMobileStore } from '@/stores/mobile';

const mobileWidth = 850;

export default {
  name: 'app',
  props: {},
  computed: {
    ...mapState(useMobileStore, ['mobile', 'mobileMenu']),
  },
  data: function () {
    return {
      windowWidth: window.innerWidth,
    };
  },
  methods: {
    ...mapActions(useMobileStore, ['setMobile', 'setMobileMenu']),
    checkScreenSize: function () {
      this.windowWidth = window.innerWidth;
      this.setMobile(this.windowWidth <= mobileWidth);
      this.setMobileMenu(this.mobileMenu ? this.windowWidth <= mobileWidth : false);
    },
    toggleMobileMenu: function () {
      this.setMobileMenu(!this.mobileMenu);
    },
  },
  watch: {
    $route: function () {
      this.setMobileMenu(false);
    },
  },
  mounted: function () {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
};
