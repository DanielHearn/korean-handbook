var app = new Vue({
  el: '#app',
  data: {
     id: -1,
     word: '',
     korean: '',
     wordCount: 0,
     dbLoaded: false,
     prevWordID: [],
  },
  methods: {
    initDB () {
      var config = {
        apiKey: 'AIzaSyAL7PmrjeNVvwniFOL3U-ShJK4jHZ2t0eg',
        authDomain: 'korean-words.firebaseapp.com',
        databaseURL: 'https://korean-words.firebaseio.com',
        projectId: 'korean-words',
        storageBucket: 'korean-words.appspot.com',
        messagingSenderId: '542877320049'
      };
      firebase.initializeApp(config);
      var database = firebase.database();
    },
    overlay () {
      document.querySelector('.overlay').classList.toggle('active');
      document.querySelector('.button--overlay').classList.toggle('active');
      document.querySelector('.body').classList.toggle('noscroll');
    },
    handleScroll () {
      var nav = document.querySelector('nav');
      var height = window.innerHeight - 75;
      if (window.pageYOffset > height) {
          nav.classList.add('nav--purple');
          nav.classList.remove('nav--white');
      } else {
          nav.classList.add('nav--white');
          nav.classList.remove('nav--purple');
      }
    },
    async generateWord () {
      const rand = Math.floor(Math.random() * this.wordCount);
      if (this.prevWordID.includes(rand)) {
        if (this.prevWordID.length === this.wordCount) {
          this.prevWordID = [];
          this.prevWordID.push(this.id);
        }
        this.generateWord(rand);
      } else {
        this.prevWordID.push(rand);
        this.retrieveWord(rand);
      }
    },
    async retrieveWord (key) {
      let data = this;
      return firebase.database().ref('/' + key).once('value').then(function(snapshot) {
        const entry = snapshot.val();
        data.id = key;
        data.word = entry.KOREAN;
        data.korean = entry.ENGLISH;
      });
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
    this.initDB();

    let retrieveWordCount = new Promise((resolve, reject) => {
      let data = this;
      return firebase.database().ref('/' + 'wordCount').once('value').then(function(snapshot) {
        data.wordCount = snapshot.val();
        if(data.wordCount > 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
    retrieveWordCount.then(
      () => {
        this.dbLoaded = true;
        this.generateWord();
      },
      () => { statusText.ENGLISH = "Database cannot be reached"; }
    );
  }
})
