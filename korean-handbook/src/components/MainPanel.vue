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
.main-panel {
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  padding: 1em;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
}
</style>