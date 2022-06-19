<template>
  <div id="app" :class="{ 'home-page': $route.path === '/', mobile: mobile }">
    <router-view :mobile="mobile" />
  </div>
</template>

<script src="./App.js"></script>

<style lang="scss">
@import './App.scss';
</style>
