<template>
  <div class="tabs">
    <div class="tabs-items" ref="items">
      <div
          v-for="item in items"
          :data-slug="item.slug"
          :key="item.slug"
          @click="updateDash"
          :class="{ 'tabs-item': 'tabs-item', 'tabs-item--selected': item === selected }"
        >
        <router-link :to="item.url">{{ item.name }}</router-link>
      </div>
      <div
        class="tabs-dash"
        :style="{
          width: `${dashWidth}px`,
          transform: `translate3d(${dashPosition}px, 0 , 0)`
        }"
      />
    </div>
  </div>
</template>

<script src="./Tabs.js"></script>

<style lang="scss" src="./Tabs.scss"></style>
