import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'home',
      path: '/',
      props: false,
      component: Home
    },
    {
      name: 'randomWordCat',
      path: '/random-words/:id',
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "randomWords" */ './views/RandomWords.vue')
    },
    {
      name: 'randomWordsHome',
      path: '/random-words',
      redirect: '/random-words/all'
    },
    {
      name: 'infoCat',
      path: '/info/:id',
      props: true,
      component: () =>
        import(/* webpackChunkName: "info" */ './views/Info.vue')
    },
    {
      name: 'infoHome',
      path: '/info/',
      props: false,
      component: () =>
        import(/* webpackChunkName: "info" */ './views/Info.vue')
    },
    {
      name: '404',
      path: '*',
      props: false,
      component: () =>
        import(/* webpackChunkName: "randomWords" */ './views/404.vue')
    }
  ]
})
