<template>
  <div class="table">
    <ul class="grid grid--header">
      <div class="search-form">
        <button class="button--close" @click="search = ''">
          <i class="material-icons">close</i>
        </button>
        <input
          v-model="search"
          type="text"
          placeholder="Search words"
        />
        <button class="button--search">
          <i class="material-icons">search</i>
        </button>
      </div>
      <li class="grid-item grid-header" >
        <p class="text" 
          v-for="column in columns"
          :data-slug="column.id"
          :key="column.id">{{column.name}}</p>
      </li>
    </ul>
    <ul class="grid">
      <li
        v-if="!filteredWords.length && search.length"
        class="grid-notice"
      >
        <p class="text">No results for search.</p>
      </li>
      <li
        class="grid-item"
        v-for="word in filteredWords"
        :key="word.e + word.k"
      >
        <p class="text" 
          v-for="column in columns"
          :key="column.id">{{ word[column.id] }}</p>
      </li>
    </ul>
  </div>
</template>

<script src="./Table.js"></script>

<style lang="scss" src="./Table.scss"></style>
