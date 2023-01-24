export default {
  name: 'TextInput',
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
