import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage/HomePage.vue';

const titleEnd = ' - The Korean Handbook';

const routes = [
  {
    name: 'home',
    path: '/',
    props: false,
    component: HomePage,
    meta: {
      title: () => {
        return `Home ${titleEnd}`;
      },
    },
  },
  {
    name: 'content_random',
    path: '/content/:id/random',
    props: (route) => ({ id: route.params.id, content: 'random' }),
    component: () => import(/* webpackChunkName: "info" */ '../views/ContentPage/ContentPage.vue'),
    meta: {
      title: () => {
        return `Random ${titleEnd}`;
      },
    },
  },
  {
    name: 'content_info',
    path: '/content/:id/info',
    props: (route) => ({ id: route.params.id, content: 'info' }),
    component: () => import(/* webpackChunkName: "info" */ '../views/ContentPage/ContentPage.vue'),
    meta: {
      title: () => {
        return `Info ${titleEnd}`;
      },
    },
  },
  {
    name: 'content_match',
    path: '/content/:id/match',
    props: (route) => ({ id: route.params.id, content: 'match' }),
    component: () => import(/* webpackChunkName: "info" */ '../views/ContentPage/ContentPage.vue'),
    meta: {
      title: () => {
        return `Match ${titleEnd}`;
      },
    },
  },
  {
    name: 'content_test',
    path: '/content/:id/test',
    props: (route) => ({ id: route.params.id, content: 'test' }),
    component: () => import(/* webpackChunkName: "info" */ '../views/ContentPage/ContentPage.vue'),
    meta: {
      title: () => {
        return `Test ${titleEnd}`;
      },
    },
  },
  {
    name: 'content',
    path: '/content/:id/',
    redirect: (to) => {
      return `/content/${to.params.id}/info`;
    },
  },
  {
    name: 'randomWordCat',
    path: '/random-words/:id',
    redirect: (to) => {
      return `/content/${to.params.id}/random`;
    },
  },
  {
    name: 'randomWordsHome',
    path: '/random-words',
    redirect: '/content/all',
  },
  {
    name: 'infoCat',
    path: '/info/:id',
    redirect: (to) => {
      return `/content/${to.params.id}/info`;
    },
  },
  {
    name: 'infoHome',
    path: '/info/',
    redirect: '/',
  },
  { path: '/tool/', redirect: '/' },
  { path: '/tool/random-korean-words', redirect: '/random-words' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from, next) => {
  document.title = to.meta.title(to);
  next();
});

export default router;
