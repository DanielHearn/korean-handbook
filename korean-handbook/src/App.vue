<template>
  <div id="app">
    <div id="nav">
      <div class="nav-content">
        <router-link to="/">Home</router-link>
        <router-link to="/random-words/all">Random Words</router-link>
        <router-link to="/info/">Info</router-link>
      </div>
    </div>
    <router-view :mobile="$store.state.mobile" />
  </div>
</template>

<script>
export default {
  name: "app",
  props: {},
  methods: {
    checkScreenSize: function() {
      this.$store.commit("setMobile", window.innerWidth <= 640);
    }
  },
  mounted: function() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  }
};
</script>

<style lang="scss">
@import "./app.scss";
</style>