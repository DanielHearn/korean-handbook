<template>
  <div class="table">
    <ul class="grid grid--header">
      <Search
        :value="search"
        placeholder="Search words"
        v-on:search="searchRows"
      />
      <li class="grid-item grid-header">
        <p
          class="text"
          v-for="column in columns"
          :data-slug="column.id"
          :key="column.id"
        >
          {{ column.name }}
        </p>
      </li>
    </ul>
    <ul class="grid">
      <li v-if="!filteredWords.length && search.length" class="grid-notice">
        <p class="text">No results for search.</p>
      </li>
      <li
        class="grid-item"
        v-for="word in filteredWords"
        :key="word.e + word.k"
      >
        <p class="text" v-for="column in columns" :key="column.id">
          {{ word[column.id] }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script src="./Table.js"></script>

<style lang="scss" src="./Table.scss"></style>
