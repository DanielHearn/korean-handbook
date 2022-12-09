<template>
  <div class="radio-input" :class="{ 'radio-input--active': value }">
    <input
      v-model="value"
      type="radio"
      @change="
        () => {
          $emit('change', !value);
        }
      "
    />
    <div
      class="radio-input__input"
      @click="
        () => {
          $emit('change', !value);
        }
      "
    >
      <div class="radio-input__selection"></div>
    </div>
  </div>
</template>

<script src="./RadioInput.js"></script>

<style lang="scss" src="./RadioInput.scss"></style>
