<template>
  <div class="table">
    <ul class="grid grid--header">
      <div class="grid-search">
        <SearchInput :value="search" placeholder="Search words" @search="searchRows" />
      </div>
      <li class="grid-item grid-header">
        <p v-for="column in columns" :key="column.id" class="text" :data-slug="column.id">
          {{ column.name }}
        </p>
      </li>
    </ul>
    <ul class="grid">
      <li v-if="!filteredWords.length && search.length" class="grid-notice">
        <p class="text">No results for search.</p>
      </li>
      <li v-for="word in filteredWords" :key="word.e + word.k" class="grid-item">
        <p v-for="column in columns" :key="column.id" class="text" :data-slug="column.id">
          {{ word[column.id] }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script src="./DataTable.js"></script>

<style lang="scss" src="./DataTable.scss"></style>
