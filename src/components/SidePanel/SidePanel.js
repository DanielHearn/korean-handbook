import { mapState, mapActions } from 'pinia';
import { useMobileStore } from '@/stores/mobile';

export default {
  name: 'side-panel',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    openInitially: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState(useMobileStore, ['mobile']),
  },
  data: function () {
    return {
      open: false,
    };
  },
  watch: {
    mobile: function () {
      if (!this.mobile) {
        this.open = false;
      }
    },
    $route: function () {
      if (this.mobile) {
        this.open = false;
        this.$emit('side-panel-toggle', this.open);
      }
    },
    openInitially: function () {
      this.open = true;
      this.$emit('side-panel-toggle', this.open);
    },
  },
  methods: {
    toggleOpen: function () {
      this.open = !this.open;
      this.$emit('side-panel-toggle', this.open);
    },
  },
};
