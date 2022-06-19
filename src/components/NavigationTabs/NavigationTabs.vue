<template>
  <div class="tabs">
    <div ref="items" class="tabs-items">
      <div
        v-for="item in items"
        :key="item.slug"
        :data-slug="item.slug"
        :class="{
          'tabs-item': 'tabs-item',
          'tabs-item--selected': item === selected,
        }"
        @click="updateDash"
      >
        <router-link :to="item.url">{{ item.name }}</router-link>
      </div>
      <div
        class="tabs-dash"
        :style="{
          width: `${dashWidth}px`,
          transform: `translate3d(${dashPosition}px, 0 , 0)`,
        }"
      />
    </div>
  </div>
</template>

<script src="./NavigationTabs.js"></script>

<style lang="scss" src="./NavigationTabs.scss"></style>
