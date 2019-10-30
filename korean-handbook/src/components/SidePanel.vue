<template>
  <div class="side-panel" :class="{'mobile': mobile, 'active': open}">
    <div v-if="mobile" class="mobile-header">
      <p class="sub-heading">{{ title }}</p>
      <button @click="toggleOpen">
        <i v-if="open" class="material-icons">keyboard_arrow_up</i>
        <i v-else class="material-icons">keyboard_arrow_down</i>
      </button>
    </div>
    <div class="side-panel-content" :class="{'hidden': !open && this.$store.state.mobile}">
      <slot></slot>
    </div>
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
    },
    title: {
      type: String,
      required: false,
      default: ""
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
    },
    $route: function(to, from) {
      if (this.mobile) {
        this.open = false;
        this.$emit("side-panel-toggle", this.open);
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
  &.mobile {
    height: 3.5em;
    padding: 0.5em 1em;
    .search-form {
      margin-top: 0.5em;
    }
    &.active {
      height: 100%;
    }
  }
  .mobile-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .sub-heading {
      margin: 0;
    }
  }
  .side-panel-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .heading:first-child {
      margin-top: 0;
    }
  }
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