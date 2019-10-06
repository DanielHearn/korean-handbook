<template>
  <div class="side-panel">
    <button v-if="this.$store.state.mobile" @click="toggleOpen">Toggle</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "side-panel",
  props: {
    mobile: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function() {
    return {
      open: false
    };
  },
  watch: {
    mobile: function() {
      if (!this.mobile) {
        this.open = false;
      }
    }
  },
  methods: {
    toggleOpen: function() {
      this.open = !this.open;
      this.$emit("side-panel-toggle", this.open);
    }
  }
};
</script>

<style lang="scss">
@import "./../variables.scss";

.side-panel {
  width: 22em;
  padding: 1em;
  background: $dark;
  color: $white;
  z-index: 1;
  height: 100%;
  display: flex;
  flex: 1 auto;
  flex-direction: column;
  .search-list {
    margin-top: 1em;
    margin-bottom: 2em;
  }
}

@media screen and (max-width: 40em) {
  .side-panel {
    width: 100%;
    height: 15vh;
    box-sizing: border-box;
  }
}
</style>