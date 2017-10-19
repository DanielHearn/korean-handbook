function overlay() {
   document.querySelector(".overlay").classList.toggle("active");
   document.querySelector(".button--overlay").classList.toggle("active");
   document.querySelector(".body").classList.toggle("noscroll");
};

function onscroll() {
    var nav = document.querySelector('nav');
    var height = window.innerHeight - 75;
    if ( window.pageYOffset > height ) {
        nav.classList.add("nav--purple");
        nav.classList.remove("nav--white");
    } else {
        nav.classList.add("nav--white");
        nav.classList.remove("nav--purple");
    }
};
window.addEventListener("scroll", onscroll);

var list = new Vue({
  el: '#app',
  data: {
    consonants: [
      { korean: 'ㄴ', pronunciation: 'n'},
      { korean: 'ㄱ', pronunciation: 'g/k'},
      { korean: 'ㅁ', pronunciation: 'm'},
      { korean: 'ㄷ', pronunciation: 'd'},
      { korean: 'ㄹ', pronunciation: 'r/l'},
      { korean: 'ㅂ', pronunciation: 'b'},
      { korean: 'ㅅ', pronunciation: 's'},
      { korean: 'ㅈ', pronunciation: 'j'},
      { korean: 'ㅎ', pronunciation: 'h'},
      { korean: 'ㅇ', pronunciation: 'ng'},
      { korean: 'ㅍ', pronunciation: 'p'},
      { korean: 'ㅋ', pronunciation: 'k'},
      { korean: 'ㅊ', pronunciation: 'ch'},
      { korean: 'ㅌ', pronunciation: 't'}
    ],
    doubles: [
      { korean: 'ㄲ', pronunciation: 'kk'},
      { korean: 'ㅃ', pronunciation: 'bb'},
      { korean: 'ㅉ', pronunciation: 'jj'},
      { korean: 'ㄸ', pronunciation: 'dd'},
      { korean: 'ㅆ', pronunciation: 'ss'},
    ],
    vowels: [
      { korean: 'ㅣ', pronunciation: 'i'},
      { korean: 'ㅏ', pronunciation: 'a'},
      { korean: 'ㅐ', pronunciation: 'ae'},
      { korean: 'ㅑ', pronunciation: 'ya'},
      { korean: 'ㅓ', pronunciation: 'eo'},
      { korean: 'ㅕ', pronunciation: 'yeo'},
      { korean: 'ㅔ', pronunciation: 'e'},
      { korean: 'ㅡ', pronunciation: 'eu'},
      { korean: 'ㅗ', pronunciation: 'o'},
      { korean: 'ㅛ', pronunciation: 'yo'},
      { korean: 'ㅜ', pronunciation: 'u'},
      { korean: 'ㅠ', pronunciation: 'yu'},
    ],
    combinations: [
      { korean: 'ㅘ', pronunciation: 'wa'},
      { korean: 'ㅙ', pronunciation: 'wae'},
      { korean: 'ㅚ', pronunciation: 'oe'},
      { korean: 'ㅝ', pronunciation: 'wo'},
      { korean: 'ㅞ', pronunciation: 'we'},
      { korean: 'ㅟ', pronunciation: 'wi'},
      { korean: 'ㅢ', pronunciation: 'ui'},
    ],
    words: [
      { word: '날씨', meaning: 'Weather'},
      { word: '한국', meaning: 'Korea'},
      { word: '네', meaning: 'Yes'},
      { word: '아니', meaning: 'No'},
      { word: '나', meaning: 'I'},
      { word: '년', meaning: 'Year'},
      { word: '월', meaning: 'Month'},
      { word: '일', meaning: 'Day'},
      { word: '서울', meaning: 'Seoul'},
      { word: '부산', meaning: 'Busan'},
      { word: '오늘', meaning: 'Today'},
      { word: '원', meaning: 'won (South Korea\'s currency)'},
      { word: '안녕하세요', meaning: 'Hello'},
    ],
    sources: [
      { url: 'https://en.wiktionary.org/wiki/Category:Korean_letters', name: 'wiktionary.org', description: 'Reference to the korean letters and their pronunciation.'},
      { url: 'https://en.wikibooks.org/wiki/Korean/Alphabet/', name: 'wikibooks.com', description: 'Reference to the korean letters, blocks and their pronunciation.'},
      { url: 'https://www.howtostudykorean.com/unit0/unit0lesson1/', name: 'howtostudykorean.com', description: 'Reference to the korean letters, and their pronunciation.'},
    ],
  }
})
