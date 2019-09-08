import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      props: false,
      component: Home
    },
    {
      path: '/random-words',
      name: 'about',
      props: false,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "randomWords" */ './views/RandomWords.vue')
    },
    {
      name: 'infoCat',
      path: '/info/:id',
      props: true,
      component: () =>
        import(/* webpackChunkName: "info" */ './views/InfoCat.vue')
    },
    {
      name: 'infoHome',
      path: '/info/',
      props: false,
      component: () =>
        import(/* webpackChunkName: "info" */ './views/InfoHome.vue')
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
