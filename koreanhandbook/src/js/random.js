import Vue from 'vue'
import RandomWord from './randomword/randomword.vue'

const randomWordApp = new Vue({
  el: '#app',
  render: h => h(RandomWord)
})
