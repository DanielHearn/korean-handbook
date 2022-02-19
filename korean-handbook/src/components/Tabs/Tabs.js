export default {
  name: 'tabs',
  props: {
    items: {
      type: Array,
      required: true,
      default: [],
    },
    selected: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return {
      dashPosition: 0,
      dashWidth: 0,
    }
  },
  methods: {
    updateDash() {
      const targetRef = this.$refs.items.querySelector(`[data-slug="${this.selected}"]`);
     
      this.dashWidth = targetRef.offsetWidth;
      this.dashPosition = targetRef.offsetLeft + targetRef.offsetWidth / 2 - targetRef.offsetWidth / 2;
    }
  },
  mounted: function() {
    this.updateDash()
  },
}
