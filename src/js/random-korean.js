var app = new Vue({
  el: '#app',
  methods: {
    overlay () {
      document.querySelector(".overlay").classList.toggle("active");
      document.querySelector(".button--overlay").classList.toggle("active");
      document.querySelector(".body").classList.toggle("noscroll");
    },
    handleScroll () {
      var nav = document.querySelector('nav');
      var height = window.innerHeight - 75;
      if ( window.pageYOffset > height ) {
          nav.classList.add("nav--purple");
          nav.classList.remove("nav--white");
      } else {
          nav.classList.add("nav--white");
          nav.classList.remove("nav--purple");
      }
    },
    loadWord () {
      console.log("Load new word");
      var config = {
        apiKey: "AIzaSyAL7PmrjeNVvwniFOL3U-ShJK4jHZ2t0eg",
        authDomain: "korean-words.firebaseapp.com",
        databaseURL: "https://korean-words.firebaseio.com",
        projectId: "korean-words",
        storageBucket: "korean-words.appspot.com",
        messagingSenderId: "542877320049"
      };
      firebase.initializeApp(config);
      var database = firebase.database();
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }
})
