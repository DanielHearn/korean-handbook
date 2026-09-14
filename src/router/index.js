import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../views/HomePage/HomePage.vue';
import { Categories } from '@/static/categories';

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
    name: 'content_flashcard',
    path: '/content/:id/flashcard',
    props: (route) => ({ id: route.params.id, content: 'flashcard' }),
    component: () =>
      import(/* webpackChunkName: "flashcard" */ '../views/ContentPage/ContentPage.vue'),
    meta: {
      title: (to, category) => {
        return `Flashcard - ${category.name}${titleEnd}`;
      },
    },
  },
  {
    name: 'content_info',
    path: '/content/:id/info',
    props: (route) => ({ id: route.params.id, content: 'info' }),
    component: () => import(/* webpackChunkName: "info" */ '../views/ContentPage/ContentPage.vue'),
    meta: {
      title: (to, category) => {
        return `Learn - ${category.name}${titleEnd}`;
      },
    },
  },
  {
    name: 'content_match',
    path: '/content/:id/match',
    props: (route) => ({ id: route.params.id, content: 'match' }),
    component: () => import(/* webpackChunkName: "match" */ '../views/ContentPage/ContentPage.vue'),
    meta: {
      title: (to, category) => {
        return `Match - ${category.name}${titleEnd}`;
      },
    },
  },
  {
    name: 'content_test',
    path: '/content/:id/test',
    props: (route) => ({ id: route.params.id, content: 'test' }),
    component: () => import(/* webpackChunkName: "test" */ '../views/ContentPage/ContentPage.vue'),
    meta: {
      title: (to, category) => {
        return `Test - ${category.name}${titleEnd}`;
      },
    },
  },
  {
    name: 'content typing',
    path: '/content/:id/typing',
    props: (route) => ({ id: route.params.id, content: 'typing' }),
    component: () =>
      import(/* webpackChunkName: "typing" */ '../views/ContentPage/ContentPage.vue'),
    meta: {
      title: (to, category) => {
        return `Type - Game ${category.name}${titleEnd}`;
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
    name: 'flashcardCat',
    path: '/random-words/:id',
    redirect: (to) => {
      return `/content/${to.params.id}/flashcard`;
    },
  },
  {
    name: 'flashcardsHome',
    path: '/random-words',
    redirect: '/content/all/flashcard',
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
  { path: '/tool/random-korean-words', redirect: '/content/all/flashcard' },
  { path: '/content/:id/random', redirect: (to) => `/content/${to.params.id}/flashcard` },
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to, from, next) => {
  let category = null;
  if (to.params.id) {
    category = Categories[to.params.id];
  }
  document.title = to.meta.title(to, category);
  if (next) {
    next();
  }
});

export default router;
