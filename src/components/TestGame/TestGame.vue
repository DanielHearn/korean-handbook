<template>
  <div class="tool">
    <div class="tool-content">
      <div v-if="word" class="test">
        <p class="text">Select the correct character for each part of the word.</p>
        <div class="test-content">
          <div class="test-word">{{ word.e }}</div>
          <ul class="test-characters">
            <li
              v-for="(character, i) in word.k"
              :key="`${word.k}_${character}_${currentStep}`"
              class="test-character"
              :class="{
                'test-character--active': completed ? false : i === currentStep - 1,
                'test-character--completed': i < currentStep - 1 || completed,
              }"
            >
              <p v-if="i < currentStep - 1 || completed">
                {{ character }}
              </p>
              <span v-else> </span>
            </li>
          </ul>
          <ul class="test-choices">
            <li
              v-for="character in generatedCharacters[currentStep]"
              :key="`${word.k}_${character}_${currentStep}`"
              class="test-choice"
            >
              <button
                :disabled="completed || selected[character]"
                class="button--secondary"
                @click="selectCharacter(character)"
              >
                {{ character }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tool-actions">
      <button :disabled="!completed" class="button--primary" @click="nextWord()">Next word</button>
    </div>
  </div>
</template>

<script src="./TestGame.js"></script>

<style lang="scss">
@import './TestGame.scss';
</style>
