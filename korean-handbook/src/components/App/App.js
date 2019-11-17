export default {
  name: 'app',
  props: {},
  methods: {
    checkScreenSize: function () {
      this.$store.commit('setMobile', window.innerWidth <= 640)
      this.$store.commit('setMobileMenu', this.$store.state.mobileMenu && window.innerWidth <= 640)
    },
    toggleMobileMenu: function () {
      this.$store.commit('setMobileMenu', !this.$store.state.mobileMenu)
    }
  },
  watch: {
    $route: function (to, from) {
      this.$store.commit('setMobileMenu', false)
    }
  },
  mounted: function () {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  }
}
