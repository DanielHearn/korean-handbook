const menuButton = document.querySelector('.button--overlay')
menuButton.addEventListener('click', overlay)

function overlay () {
  document.querySelector('.overlay').classList.toggle('active')
  menuButton.classList.toggle('active')
  document.querySelector('body').classList.toggle('noscroll')
}

var app = new Vue({
  delimiters: ['[[', ']]'],
  el: '#app',
  data: {
    language: 'English',
    content: 'Random',
    word_english: '',
    word_korean: '',
    dbLoaded: false,
    wordVisible: false,
    buttonDisabled: false
  },
  methods: {
    retrieveWord () {
      this.dbLoaded = false
      this.wordVisible = false
      this.buttonDisabled = true
      const app = this
      const contentName = this.content.replace(/\s/g, '-').toLowerCase()
      const apiUrl = 'http://localhost:8000/api/random-words?content=' + contentName
      fetch(apiUrl)
        .then(function (response) {
          return response.json()
        }).then(function (word) {
          app.word_english = word.english
          app.word_korean = word.korean
          app.wordVisible = true
          app.dbLoaded = true
          app.buttonDisabled = false
          return true
        }).catch(function (error) {
          console.log(error)
        })
    }
  },
  created () {
    this.retrieveWord()
  }
})

/*

var app = new Vue({
  delimiters: ['[[', ']]'],
  el: '#app',
  data: {
     id: -1,
     english: '',
     korean: '',
     wordCount: 0,
     dbLoaded: false,
     wordVisible: true,
     prevWordID: [],
  },
  methods: {
    initDB () {
      const config = {
        apiKey: "AIzaSyDpdCyIU1xaKISrFtnjBN52xKwoisFQN1Q",
        authDomain: "korean-words-2.firebaseapp.com",
        databaseURL: "https://korean-words-2.firebaseio.com",
        projectId: "korean-words-2",
        storageBucket: "korean-words-2.appspot.com",
        messagingSenderId: "616204191652"
      };
      firebase.initializeApp(config);
      let database = firebase.database();
      this.getWordCount();
    },
    getWordCount () {
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
        () => {
          this.dbLoaded = true;
          this.korean = "Database cannot be reached";
        }
      );
    },
    overlay () {
      document.querySelector('.overlay').classList.toggle('active');
      document.querySelector('.button--overlay').classList.toggle('active');
      document.querySelector('.body').classList.toggle('noscroll');
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
        data.english = entry.KOREAN;
        data.korean = entry.ENGLISH;
        data.wordVisible = true;
      });
    }
  },
  created () {
    this.initDB();
  }
})

*/
