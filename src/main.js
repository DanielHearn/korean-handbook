import { createApp } from 'vue';
import App from './components/App/App.vue';
import router from './router';
import VueAnalytics from 'vue-analytics';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
app.use(router);
/*app.use(VueAnalytics, {
  id: 'UA-108490580-1',
  router,
});*/
app.mount('#app');
