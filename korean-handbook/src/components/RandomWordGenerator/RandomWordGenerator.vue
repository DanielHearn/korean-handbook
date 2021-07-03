<template>
  <div class="random">
    <div class="options">
      <p class="sub-heading">Options</p>
      <div class="option">
        <input
          id="flashcardModeToggle"
          type="checkbox"
          v-model="flashcardMode"
        />
        <label for="flashcardModeToggle" class="text">Flashcard Mode</label>
      </div>
      <div v-if="flashcardMode" class="flashcardmode">
        <p class="text">
          Select the language direction for the flashcards.
        </p>
        <div>
          <input
            id="englishDirectionToggle"
            type="radio"
            value="toEnglish"
            v-model="languageDirection"
          />
          <label for="englishDirectionToggle" class="text">Korean To English</label>
        </div>
        <div>
          <input
            id="koreanDirectionToggle"
            type="radio"
            value="toKorean"
            v-model="languageDirection"
          />
          <label for="koreanDirectionToggle" class="text">English To Korean</label>
        </div>
      </div>
    </div>
    <div 
      v-if="flashcardMode" class="flashcards flashcards--test"
      @click="showAnswer = true">
      <div class="flashcard flashcard--light">
        <p v-if="languageDirection === 'toEnglish'" class="text">
          {{ word.k }}
        </p>
        <p v-else class="text">{{ word.e }}</p>
      </div>
      <div class="flashcard flashcard--dark">
        <template v-if="showAnswer">
          <p v-if="languageDirection === 'toEnglish'" class="text">
            {{ word.e }}
          </p>
          <p v-else class="text">{{ word.k }}</p>
        </template>
        <template v-else>
          <p class="text">
            Click for the translation
          </p>
        </template>
      </div>
    </div>
    <div v-else class="flashcards">
      <div class="flashcard flashcard--light">
        <p class="text">{{ word.k }}</p>
      </div>
      <div class="flashcard flashcard--dark">
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
