<template>
  <div class="random">
    <div class="random-content">
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
    <div class="random-options">
      <div>
        <option-row
          title="Flashcard Mode"
          description="Practice your knowledge before viewing the translation"
        >
          <switch-input :value="flashcardMode" @change="toggleFlashcardMode" />
        </option-row>
        <option-row v-if="flashcardMode" title="Korean To English" :slim="true">
          <input
            id="englishDirectionToggle"
            v-model="languageDirection"
            type="radio"
            value="toEnglish"
          />
        </option-row>
        <option-row v-if="flashcardMode" title="English To Korean" :slim="true">
          <input
            id="koreanDirectionToggle"
            v-model="languageDirection"
            type="radio"
            value="toKorean"
          />
        </option-row>
      </div>
      <div class="random-actions">
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
  </div>
</template>

<script src="./RandomWordGenerator.js"></script>

<style lang="scss">
@import './RandomWordGenerator.scss';
</style>
