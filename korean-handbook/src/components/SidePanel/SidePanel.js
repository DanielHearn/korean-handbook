export default {
  name: 'side-panel',
  props: {
    mobile: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: function () {
    return {
      open: false
    }
  },
  watch: {
    mobile: function () {
      if (!this.mobile) {
        this.open = false
      }
    },
    $route: function (to, from) {
      if (this.mobile) {
        this.open = false
        this.$emit('side-panel-toggle', this.open)
      }
    }
  },
  methods: {
    toggleOpen: function () {
      this.open = !this.open
      this.$emit('side-panel-toggle', this.open)
    }
  }
}
