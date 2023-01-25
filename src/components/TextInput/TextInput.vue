<template>
  <div class="text-input" :class="{ 'text-input--active': value.length }">
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      @input="(e) => $emit('change', e.target.value)"
    />
  </div>
</template>

<script src="./TextInput.js"></script>

<style lang="scss" src="./TextInput.scss"></style>
