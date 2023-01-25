import { mapState } from 'pinia';
import { useMobileStore } from '@/stores/mobile';

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
  data: function () {
    return {
      dashPosition: 0,
      dashWidth: 0,
    };
  },
  computed: {
    ...mapState(useMobileStore, ['mobile']),
  },
  methods: {
    updateDash() {
      if (this.mobile) {
        return false;
      }

      const targetRef = this.$refs.items?.querySelector(`[data-slug="${this.selected}"]`);

      if (targetRef) {
        this.dashWidth = targetRef.offsetWidth;
        this.dashPosition =
          targetRef.offsetLeft + targetRef.offsetWidth / 2 - targetRef.offsetWidth / 2;
      }
    },
  },
  mounted: function () {
    if (!this.mobile) {
      this.updateDash();
    }
  },
};
