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
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }
})
