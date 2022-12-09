<template>
  <div class="tabs" :class="{ 'tabs--mobile': mobile }">
    <div ref="items" class="tabs-items">
      <div
        v-for="item in items"
        :key="item.slug"
        :data-slug="item.slug"
        :class="{
          'tabs-item': 'tabs-item',
          'tabs-item--selected': item.slug === selected,
        }"
        @click="updateDash"
      >
        <router-link :to="item.url"
          ><i v-if="item.icon" class="material-icons">{{ item.icon }}</i
          >{{ item.name }}</router-link
        >
      </div>
      <div
        v-if="!mobile"
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
