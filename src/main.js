import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App/App.vue'
import router from './static/router'
import VueAnalytics from 'vue-analytics'
import { storeConfig } from './static/store.js'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-108490580-1',
  router,
})

Vue.use(Vuex)

const store = new Vuex.Store(storeConfig)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
