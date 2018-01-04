var app = new Vue({
  el: '#app',
  data: {
     word: 'Loading English Word',
     korean: 'Loading Korean Word',
     entryCount: 1000,
  },
  methods: {
    initDB () {
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
      this.generateWord();
    },
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
    async generateWord () {
      console.log("Load new word");
      const rand = Math.floor(Math.random() * this.entryCount);

      let entry = await this.retrieveWord(rand);
      //console.log(entry.val());//this.word = entry.val().promenade;
    },
    async retrieveWord (key) {
      let that = this;
      return firebase.database().ref('/' + key).once('value').then(function(snapshot) {
        //this.thisole.log(snapshot.val());
        const entry = snapshot.val();
        that.word = entry.KOREAN;
        that.korean = entry.ENGLISH;
      });
    },
    loadWord: function (entry) {
      console.log(entry);
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
    this.initDB();
  }
})
