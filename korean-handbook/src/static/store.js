import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mobile: false,
    mobileMenu: false
  },
  mutations: {
    setMobile (state, value) {
      state.mobile = value
    },
    setMobileMenu (state, value) {
      state.mobileMenu = value
    }
  },
  actions: {}
})
