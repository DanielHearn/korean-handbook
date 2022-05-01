<template>
  <div class="test" v-if="word">
    <div class="test-word">
      {{ word.e }}
    </div>
    <ul class="test-words">
      <li
        class="test-choice"
        v-for="character in generatedCharacters[currentStep]"
        :key="`${word.e}_${character}_${currentStep}`"
      >
        <button
          :disabled="selected[character]"
          class="button--secondary"
          @click="selectCharacter(character)"
        >
          {{ character }}
        </button>
      </li>
    </ul>
    <div class="test-actions">
      <button
        :disabled="!completed"
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
