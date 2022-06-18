<template>
  <div class="search-list">
    <ul class="text-list" v-if="items.length">
      <li
        v-for="item in items"
        :key="item.id"
        :class="{ active: activeID === item.id }"
        class="list-item"
      >
        <router-link :to="item.link">{{ item.name }}</router-link>
      </li>
    </ul>
    <ul class="text-list no-results" v-else>
      <li class="list-item">
        <p class="text">
          {{ noResultsText }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script src="./List.js"></script>

<style lang="scss" src="./List.scss"></style>
