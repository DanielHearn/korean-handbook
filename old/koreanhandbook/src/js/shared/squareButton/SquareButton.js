export default {
  name: 'square-button',
  props: ['text'],
  data: function () {
    return {
      clicked: false
    }
  },
  methods: {
    buttonClicked () {
      this.clicked = true
      this.$emit('clicked')
    }
  }
}
