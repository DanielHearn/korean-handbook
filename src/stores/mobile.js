// Pinia Store
import { defineStore } from 'pinia';

export const useMobileStore = defineStore('mobile', {
  // convert to a function
  state: () => {
    return {
      mobile: false,
      mobileMenu: false,
    };
  },
  actions: {
    setMobile(payload) {
      this.mobile = payload;
    },
    setMobileMenu(payload) {
      this.mobileMenu = payload;
    },
  },
});
