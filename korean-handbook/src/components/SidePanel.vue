<template>
  <div class="side-panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "side-panel",
  props: {},
  data: {
    open: {
      type: Boolean,
      required: false,
      default: ""
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