export default {
  name: 'list',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    activeID: {
      type: String,
      required: true,
      default: null,
    },
    noResultsText: {
      type: String,
      required: true,
      default: '',
    },
  },
}
