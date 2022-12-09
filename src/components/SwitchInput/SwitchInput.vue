<template>
  <div class="switch-input" :class="{ 'switch-input--active': value }">
    <input
      id="flashcardModeToggle"
      v-model="flashcardMode"
      type="checkbox"
      @change="
        () => {
          $emit('change', !flashcardMode);
        }
      "
    />
    <div
      class="switch-input__input"
      @click="
        () => {
          $emit('change', !flashcardMode);
        }
      "
    >
      <div class="switch-input__selection"></div>
    </div>
  </div>
</template>

<script src="./SwitchInput.js"></script>

<style lang="scss" src="./SwitchInput.scss"></style>
