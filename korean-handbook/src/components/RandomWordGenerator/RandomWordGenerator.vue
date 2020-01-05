<template>
  <div>
    <div class="options">
      <div class="option">
        <input
          id="flashcardModeToggle"
          type="checkbox"
          v-model="flashcardMode"
        />
        <label for="flashcardModeToggle" class="text">Flashcard Mode</label>
      </div>
      <div v-if="flashcardMode" class="flashcardmode">
        <div>
          <input
            id="englishDirectionToggle"
            type="radio"
            value="toEnglish"
            v-model="languageDirection"
          />
          <label for="englishDirectionToggle" class="text">To English</label>
        </div>
        <div>
          <input
            id="koreanDirectionToggle"
            type="radio"
            value="toKorean"
            v-model="languageDirection"
          />
          <label for="koreanDirectionToggle" class="text">To Korean</label>
        </div>
        <p class="text">
          Select the language direction for the flashcards.
        </p>
      </div>
      <div v-else>
        <p class="text">
          Activate flashcard mode to test if you know the translations of words.
        </p>
      </div>
    </div>
    <div v-if="flashcardMode" class="flashcards">
      <div class="flashcard">
        <p v-if="languageDirection === 'toEnglish'" class="text">
          {{ word.k }}
        </p>
        <p v-else class="text">{{ word.e }}</p>
      </div>
      <div class="flashcard">
        <template v-if="showAnswer">
          <p v-if="languageDirection === 'toEnglish'" class="text">
            {{ word.e }}
          </p>
          <p v-else class="text">{{ word.k }}</p>
        </template>
        <template v-else>
          <p class="text">
            Click the 'Show Answer' button to view the translation
          </p>
        </template>
      </div>
    </div>
    <div v-else class="flashcards">
      <div class="flashcard">
        <p class="text">{{ word.k }}</p>
      </div>
      <div class="flashcard">
        <p class="text">{{ word.e }}</p>
      </div>
    </div>
    <div class="actions">
      <button class="button--primary" @click="generateWord">
        Next Word
      </button>
      <button
        class="button--secondary"
        v-if="flashcardMode"
        :disabled="showAnswer"
        @click="showAnswer = true"
      >
        Show Answer
      </button>
    </div>
  </div>
</template>

<script src="./RandomWordGenerator.js"></script>

<style lang="scss">
@import './RandomWordGenerator.scss';
</style>
