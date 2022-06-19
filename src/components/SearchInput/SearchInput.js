export default {
  name: 'SearchInput',
  props: {
    value: {
      type: String,
      required: true,
      default: '',
    },
    placeholder: {
      type: String,
      required: true,
      default: 'Search',
    },
  },
};
