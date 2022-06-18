const mobileWidth = 700

export default {
  name: 'app',
  props: {},
  data: function() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    checkScreenSize: function() {
      this.windowWidth = window.innerWidth
      this.$store.commit('setMobile', this.windowWidth <= mobileWidth)
      this.$store.commit(
        'setMobileMenu',
        this.$store.state.mobileMenu && this.windowWidth <= mobileWidth
      )
    },
    toggleMobileMenu: function() {
      this.$store.commit('setMobileMenu', !this.$store.state.mobileMenu)
    },
  },
  watch: {
    $route: function() {
      this.$store.commit('setMobileMenu', false)
    },
  },
  mounted: function() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
}
