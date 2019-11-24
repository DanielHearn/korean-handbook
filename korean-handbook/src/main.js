import Vue from 'vue'
import App from './components/App/App.vue'
import router from './static/router'
import store from './static/store'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-108490580-1',
  router,
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
