<template>
  <div class="side-panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "side-panel",
  props: {}
};
</script>

<style lang="scss">
@import "./../variables.scss";

.side-panel {
  width: 22em;
  padding: 1em;
  background: $dark;
  color: $white;
}

@media screen and (max-width: 40em) {
  .side-panel {
    width: 100%;
    height: 15vh;
    box-sizing: border-box;
  }
}
</style>