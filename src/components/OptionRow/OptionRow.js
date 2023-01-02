import { mapState } from 'pinia';
import { useMobileStore } from '@/stores/mobile';

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
  computed: {
    ...mapState(useMobileStore, ['mobile']),
  },
};
