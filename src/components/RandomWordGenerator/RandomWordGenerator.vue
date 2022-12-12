<template>
  <div class="tool random">
    <div class="tool-content">
      <div class="random-content">
        <p class="tool-instructions text">
          Practice learning random words show in the flashcard below.
        </p>
        <div
          v-if="flashcardMode"
          class="random-flashcards random-flashcards--test"
          @click="showAnswer = true"
        >
          <div class="random-flashcard random-flashcard--light">
            <p v-if="languageDirection === 'toEnglish'" class="text">
              {{ word.k }}
            </p>
            <p v-else class="text">{{ word.e }}</p>
          </div>
          <div class="random-flashcard random-flashcard--dark">
            <template v-if="showAnswer">
              <p v-if="languageDirection === 'toEnglish'" class="text">
                {{ word.e }}
              </p>
              <p v-else class="text">{{ word.k }}</p>
            </template>
            <template v-else>
              <p class="text text--bold">Click for the translation</p>
            </template>
          </div>
        </div>
        <div v-else class="random-flashcards">
          <div class="random-flashcard random-flashcard--light">
            <p class="text">{{ word.k }}</p>
          </div>
          <div class="random-flashcard random-flashcard--dark">
            <p class="text">{{ word.e }}</p>
          </div>
        </div>
      </div>
      <div class="tool-options">
        <option-row
          title="Flashcard Mode"
          description="Practice your knowledge before viewing the translation"
        >
          <switch-input :value="flashcardMode" @change="toggleFlashcardMode" />
        </option-row>
        <option-row v-if="flashcardMode" title="Korean To English" :slim="true">
          <radio-input :value="languageDirection === 'toEnglish'" @change="toEnglish" />
        </option-row>
        <option-row v-if="flashcardMode" title="English To Korean" :slim="true">
          <radio-input :value="languageDirection === 'toKorean'" @change="toKorean" />
        </option-row>
      </div>
    </div>
    <div class="tool-actions">
      <button class="button--primary" @click="generateWord">Next Word</button>
      <button
        v-if="flashcardMode"
        class="button--secondary"
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
