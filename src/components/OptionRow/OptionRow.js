export default {
  name: 'OptionRow',
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    slim: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
