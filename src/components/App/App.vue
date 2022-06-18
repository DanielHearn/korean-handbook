<template>
  <div
    id="app"
    :class="{ 'home-page': $route.path === '/', mobile: $store.state.mobile }"
  >
    <router-view :mobile="$store.state.mobile" />
  </div>
</template>

<script src="./App.js"></script>

<style lang="scss">
@import './App.scss';
</style>
