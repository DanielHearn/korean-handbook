<template>
  <div class="search-list">
    <ul v-if="items.length" class="text-list">
      <li
        v-for="item in items"
        :key="item.id"
        :class="{ active: activeID === item.id }"
        class="list-item"
      >
        <router-link :to="item.link">{{ item.name }}</router-link>
      </li>
    </ul>
    <ul v-else class="text-list no-results">
      <li class="list-item">
        <p class="text">
          {{ noResultsText }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script src="./SearchList.js"></script>

<style lang="scss" src="./SearchList.scss"></style>
