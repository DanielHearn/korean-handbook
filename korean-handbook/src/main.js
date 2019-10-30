import Vue from 'vue'
import App from './components/App/App.vue'
import router from './static/router'
import store from './static/store'
import './static/registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
