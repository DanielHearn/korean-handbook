<template>
  <div class="switch-input" :class="{ 'switch-input--active': value }">
    <input
      v-model="value"
      type="checkbox"
      @change="
        () => {
          $emit('change', !value);
        }
      "
    />
    <div
      class="switch-input__input"
      @click="
        () => {
          $emit('change', !value);
        }
      "
    >
      <div class="switch-input__selection"></div>
    </div>
  </div>
</template>

<script src="./SwitchInput.js"></script>

<style lang="scss" src="./SwitchInput.scss"></style>
