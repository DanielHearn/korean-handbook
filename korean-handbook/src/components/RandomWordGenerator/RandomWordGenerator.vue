<template>
  <div>
    <div class="options">
      <div class="option">
        <input id="flashcardModeToggle" type="checkbox" v-model="flashcardMode" />
        <label for="flashcardModeToggle">Flashcard Mode</label>
      </div>
      <div v-if="flashcardMode" class="flashcardmode">
        <div>
          <input
            id="englishDirectionToggle"
            type="radio"
            value="toEnglish"
            v-model="languageDirection"
          />
          <label for="englishDirectionToggle">To English</label>
        </div>
        <div>
          <input
            id="koreanDirectionToggle"
            type="radio"
            value="toKorean"
            v-model="languageDirection"
          />
          <label for="koreanDirectionToggle">To Korean</label>
        </div>
      </div>
      <div v-else>
        <p>Activate flashcard mode to test if you know the translations of words.</p>
      </div>
    </div>
    <div v-if="flashcardMode" class="flashcards">
      <div class="flashcard">
        <p v-if="languageDirection === 'toEnglish'">{{ word.k }}</p>
        <p v-else>{{ word.e }}</p>
      </div>
      <div class="flashcard">
        <template v-if="showAnswer">
          <p v-if="languageDirection === 'toEnglish'">{{ word.e }}</p>
          <p v-else>{{ word.k }}</p>
        </template>
        <template v-else>
          <p>Click the 'Show Answer' button to view the translation</p>
        </template>
      </div>
    </div>
    <div v-else class="flashcards">
      <div class="flashcard">
        <p>{{ word.k }}</p>
      </div>
      <div class="flashcard">
        <p>{{ word.e }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="button--primary" @click="generateWord">Next Word</button>
      <button
        class="button--secondary"
        v-if="flashcardMode"
        :disabled="showAnswer"
        @click="showAnswer = true"
      >Show Answer</button>
    </div>
  </div>
</template>

<script src="./RandomWordGenerator.js"></script>

<style lang="scss">
@import "./RandomWordGenerator.scss";
</style>