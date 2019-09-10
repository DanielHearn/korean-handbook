<template>
  <div id="app">
    <div id="nav">
      <div class="nav-content">
        <router-link to="/">Home</router-link>
        <router-link to="/random-words/all">Random Words</router-link>
        <router-link to="/info/">Info</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./app.scss";
</style>