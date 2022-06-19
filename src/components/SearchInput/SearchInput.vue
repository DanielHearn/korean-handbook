<template>
  <div class="search-form">
    <button
      class="button--close"
      @click="
        () => {
          $emit('search', '');
        }
      "
    >
      <i class="material-icons">close</i>
    </button>
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      @input="(value) => $emit('search', value.target.value)"
    />
    <button class="button--search">
      <i class="material-icons">search</i>
    </button>
  </div>
</template>

<script src="./SearchInput.js"></script>

<style lang="scss" src="./SearchInput.scss"></style>
