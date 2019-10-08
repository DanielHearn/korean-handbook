<template>
  <div class="main-panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "main-panel",
  props: {}
};
</script>

<style lang="scss">
@import "./../variables.scss";

.main-panel {
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 10;
  background: $white;
}

@media screen and (max-width: 40em) {
  .main-panel {
    //padding: 1em;
  }
}
</style>