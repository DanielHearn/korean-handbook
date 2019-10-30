<template>
  <div>
    <div style="display: flex;">
      <input id="flashcardModeToggle" type="checkbox" v-model="flashcardMode" />
      <label for="flashcardModeToggle">Flashcard Mode</label>
    </div>
    <div style="display: flex; flex-direction: column;" v-if="flashcardMode">
      <p>Test your knowledge by testing if you know the translation of the word shown below.</p>
      <div style="display: flex;">
        <input
          id="languageDirectionToggle"
          type="radio"
          value="toEnglish"
          v-model="languageDirection"
        />
        <label for="languageDirectionToggle">To English</label>
      </div>
      <div style="display: flex;">
        <input
          id="languageDirectionToggle"
          type="radio"
          value="toKorean"
          v-model="languageDirection"
        />
        <label for="languageDirectionToggle">To Korean</label>
      </div>
    </div>
    <div v-if="flashcardMode" class="flashcards">
      <div class="flashcard">
        <p v-if="languageDirection === 'toEnglish'">{{ word.k }}</p>
        <p v-else>{{ word.e }}</p>
      </div>
      <div v-if="showAnswer" class="flashcard">
        <p v-if="languageDirection === 'toEnglish'">{{ word.e }}</p>
        <p v-else>{{ word.k }}</p>
      </div>
    </div>
    <div v-else>
      <div>
        <p>{{ word.k }}</p>
      </div>
      <div>
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
