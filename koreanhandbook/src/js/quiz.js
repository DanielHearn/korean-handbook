import Vue from 'vue'
import Quiz from './quiz/quiz.vue'

const quizApp = new Vue({
  el: '#app',
  render: h => h(Quiz)
})
