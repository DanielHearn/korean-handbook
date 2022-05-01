<template>
  <div class="test" v-if="word">
    <div class="test-word">
      {{ word.e }}
    </div>
    <div class="test-word">
      {{ generatedCharacters }}
    </div>
    <div class="test-actions">
      <button
        :disabled="this.currentStep < this.numberOfSteps"
        @click="nextWord()"
        class="button--primary"
      >
        Next word
      </button>
    </div>
  </div>
</template>

<script src="./Test.js"></script>

<style lang="scss">
@import './Test.scss';
</style>
