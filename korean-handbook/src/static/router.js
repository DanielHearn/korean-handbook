import Vue from 'vue'
import Router from 'vue-router'
import Home from './../views/Home.vue'
import { capitalizeWords } from './utilities.js'

Vue.use(Router)

const titleEnd = ' - The Korean Handbook'

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/',
      props: false,
      component: Home,
      meta: {
        title: route => {
          return `Home${titleEnd}`
        },
      },
    },
    {
      name: 'randomWordCat',
      path: '/random-words/:id',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "randomWords" */ './../views/RandomWords.vue'),
      meta: {
        title: route => {
          const id = capitalizeWords(route.params.id)
          return `${id} - Random Words${titleEnd}`
        },
      },
    },
    {
      name: 'randomWordsHome',
      path: '/random-words',
      redirect: '/random-words/all',
    },
    {
      name: 'infoCat',
      path: '/info/:id',
      props: true,
      component: () =>
        import(/* webpackChunkName: "info" */ './../views/Info.vue'),
      meta: {
        title: route => {
          const id = capitalizeWords(route.params.id)
          return `${id} - Info${titleEnd}`
        },
      },
    },
    {
      name: 'infoHome',
      path: '/info/',
      props: false,
      component: () =>
        import(/* webpackChunkName: "info" */ './../views/Info.vue'),
      meta: {
        title: route => {
          return `Info${titleEnd}`
        },
      },
    },
    { path: '/tool/', redirect: '/' },
    { path: '/tool/random-korean-words', redirect: '/random-words' },
    { path: '*', redirect: '/' },
  ],
})

export default router

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title(to)
  })
})
