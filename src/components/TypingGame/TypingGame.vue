<template>
  <div class="tool">
    <div class="tool-content">
      <div
        v-if="currWord"
        class="TypingGame"
        :class="{ 'TypingGame--completed': completed, 'TypingGame--closeToFinish': time <= 15 }"
      >
        <p class="tool-instructions text">
          Type the Korean words below. Check how to enable a Korean keyboard on your device.
        </p>
        <div class="TypingGame-container">
          <div class="TypingGame-stats">
            <div class="TypingGame-time">
              <span class="TypingGame-label">Time remaining</span>
              <div class="TypingGame-timer">{{ timeString }}</div>
            </div>
            <div v-if="started" class="TypingGame-words-complete">
              <span class="TypingGame-label">Progress</span>
              {{ wordsCompleted }} {{ wordsCompleted === 1 ? 'word' : 'words' }} completed
            </div>
          </div>
          <div v-if="!completed" class="TypingGame-words">
            <span class="TypingGame-label">Word sequence</span>
            <div
              v-if="!mobile"
              class="TypingGame-word TypingGame-word--prevWord"
              :class="{ 'TypingGame-word--hidden': !prevWord }"
            >
              <template v-if="normalizeKorean(prevWord?.k)">
                <div v-for="(letter, i) in prevWord.k" :key="i" class="TypingGame-letter">
                  {{ letter }}
                </div>
              </template>
              <div v-else>-----</div>
            </div>
            <div class="TypingGame-word TypingGame-word--currWord">
              <div
                v-for="(letter, i) in normalizeKorean(currWord.k)"
                :key="i"
                class="TypingGame-letter"
                :class="{
                  'TypingGame-letter--valid': matchingLetters[i] === true,
                  'TypingGame-letter--invalid':
                    matchingLetters[i] === false && i < value?.length - 1,
                }"
              >
                {{ letter }}
              </div>
              <span class="TypingGame-arrow"> <i class="material-icons">arrow_forward</i></span>
            </div>
            <div class="TypingGame-word TypingGame-word--nextWord">
              <div
                v-for="(letter, i) in normalizeKorean(nextWord.k)"
                :key="i"
                class="TypingGame-letter"
              >
                {{ letter }}
              </div>
            </div>
          </div>
          <div v-else class="TypingGame-words">
            <span class="TypingGame-label">Session complete</span>
            <div class="TypingGame-completionText">
              You completed {{ wordsCompleted }} {{ wordsCompleted === 1 ? 'word' : 'words' }} in
              one minute.
            </div>
            <button class="button--primary" @click="reset()">Try Again</button>
          </div>
          <div v-if="!completed" class="TypingGame-input">
            <span class="TypingGame-label">Type the Korean word</span>
            <TextInput :value="value" placeholder="Type here to start" @change="valueChange" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!mobile" class="tool-actions">
      <button class="button--primary" @click="reset()">Reset</button>
    </div>
  </div>
</template>

<script src="./TypingGame.js"></script>

<style lang="scss">
@import './TypingGame.scss';
</style>
