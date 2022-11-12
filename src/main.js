import { createApp } from 'vue';
import App from './components/App/App.vue';
import router from './router';
import VueGtag from 'vue-gtag';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueGtag, {
  config: { id: 'UA-108490580-1' },
});
app.mount('#korean-handbook-vue');
