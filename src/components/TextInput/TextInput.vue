<template>
  <div class="text-input" :class="{ 'text-input--active': value.length }">
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      @input="(value) => $emit('change', value.target.value)"
    />
  </div>
</template>

<script src="./TextInput.js"></script>

<style lang="scss" src="./TextInput.scss"></style>
