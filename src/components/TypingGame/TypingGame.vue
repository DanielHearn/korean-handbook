<template>
  <div class="tool">
    <div class="tool-content">
      <div
        v-if="currWord"
        class="TypingGame"
        :class="{ 'TypingGame--completed': completed, 'TypingGame--closeToFinish': time <= 15 }"
      >
        <p class="tool-instructions text">
          Type the Korean words below. Check how to enable Korean keyboard on your device.
        </p>
        <div class="TypingGame-container">
          <div class="TypingGame-stats">
            <div class="TypingGame-timer">
              {{ timeString }}
            </div>
            <div v-if="started" class="TypingGame-words-complete">
              {{ wordsCompleted }} words completed
            </div>
          </div>
          <div v-if="!completed" class="TypingGame-words">
            <div
              class="TypingGame-word TypingGame-word--prevWord"
              :class="{ 'TypingGame-word--hidden': !prevWord }"
            >
              {{ prevWord ? prevWord.k : '-----' }}
            </div>
            <div class="TypingGame-word TypingGame-word--currWord">{{ currWord.k }}</div>
            <div class="TypingGame-word TypingGame-word--nextWord">
              {{ nextWord.k }}
            </div>
          </div>
          <div v-else class="TypingGame-words">
            <div class="TypingGame-word">
              You completed {{ wordsCompleted }} words in one minute.
            </div>
            <button class="button--primary" @click="reset()">Try Again</button>
          </div>
          <div class="TypingGame-input">
            <TextInput
              v-if="!completed"
              :value="value"
              placeholder="Type here to start"
              @change="valueChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="tool-actions">
      <button class="button--primary" @click="reset()">Reset</button>
    </div>
  </div>
</template>

<script src="./TypingGame.js"></script>

<style lang="scss">
@import './TypingGame.scss';
</style>
