export const storeConfig = {
  state: {
    mobile: false,
    mobileMenu: false,
  },
  mutations: {
    setMobile(state, value) {
      state.mobile = value
    },
    setMobileMenu(state, value) {
      state.mobileMenu = value
    },
  },
  actions: {},
}
