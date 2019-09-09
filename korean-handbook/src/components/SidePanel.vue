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
.side-panel {
  width: 15em;
  overflow-y: scroll;
  padding: 1em;
}

@media screen and (max-width: 40em) {
  .side-panel {
    width: 100%;
    height: 15vh;
    box-sizing: border-box;
  }
}
</style>