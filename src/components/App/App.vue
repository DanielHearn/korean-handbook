<template>
  <div id="app" :class="{ mobile: mobile }">
    <router-view :mobile="mobile" />
  </div>
</template>

<script src="./App.js"></script>

<style lang="scss">
@import './App.scss';
</style>
