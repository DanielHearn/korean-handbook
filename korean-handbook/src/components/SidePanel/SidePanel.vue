<template>
  <div class="side-panel" :class="{ mobile: mobile, active: open }">
    <div v-if="mobile" class="mobile-header">
      <p class="sub-heading">{{ title }}</p>
      <button @click="toggleOpen">
        <i v-if="open" class="material-icons">keyboard_arrow_up</i>
        <i v-else class="material-icons">keyboard_arrow_down</i>
      </button>
    </div>
    <div
      class="side-panel-content"
      :class="{ hidden: !open && this.$store.state.mobile }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script src="./SidePanel.js"></script>

<style lang="scss" src="./SidePanel.scss"></style>
