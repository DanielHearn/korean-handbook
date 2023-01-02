<template>
  <div class="option-row" :class="{ 'option-row--slim': slim }">
    <div class="option-row__details">
      <div class="option-row__title text text--bold">{{ title }}</div>
      <div v-if="description && !mobile" class="option-row__description text">
        {{ description }}
      </div>
    </div>
    <div class="option-row__input">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./OptionRow.js"></script>

<style lang="scss" src="./OptionRow.scss"></style>
