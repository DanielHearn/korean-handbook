<template>
  <div class="test" v-if="word">
    <div class="match-info">
      Select the correct character for each part of the word.
    </div>
    <div class="test-content">
      <div class="test-word">{{ word.e }}</div>
      <ul class="test-characters">
        <li
          class="test-character"
          v-for="(character, i) in word.k"
          :key="`${word.k}_${character}_${currentStep}`"
        >
          <span v-if="i < currentStep - 1 || completed">
            {{ character }}
          </span>
          <span v-else>
            _
          </span>
        </li>
      </ul>
      <ul class="test-choices">
        <li
          class="test-choice"
          v-for="character in generatedCharacters[currentStep]"
          :key="`${word.k}_${character}_${currentStep}`"
        >
          <button
            :disabled="completed || selected[character]"
            class="button--secondary"
            :class="{}"
            @click="selectCharacter(character)"
          >
            {{ character }}
          </button>
        </li>
      </ul>
    </div>
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
