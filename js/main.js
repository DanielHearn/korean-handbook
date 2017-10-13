var list = new Vue({
  el: '#app',
  data: {
    consonants: [
      { korean: 'ㄴ', pronunciation: 'n'},
      { korean: 'ㄱ', pronunciation: 'k'},
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
    outliers: [
      { korean: '', pronunciation: 'wa'},
    ],
  }
})

var nav = document.querySelector('.nav');
window.onscroll = function () {
    "use strict";
    if (document.body.scrollTop >= 200 ) {
        nav.classList.add("nav-colored");
        nav.classList.remove("nav-transparent");
    }
    else {
        nav.classList.add("nav-transparent");
        nav.classList.remove("nav-colored");
    }
};
