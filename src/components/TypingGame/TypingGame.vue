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
              <template v-if="prevWord?.k">
                <div v-for="(letter, i) in prevWord.k" :key="i" class="TypingGame-letter">
                  {{ letter }}
                </div>
              </template>
              <div v-else>-----</div>
            </div>
            <div class="TypingGame-word TypingGame-word--currWord">
              <div
                v-for="(letter, i) in currWord.k"
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
              <div v-for="(letter, i) in nextWord.k" :key="i" class="TypingGame-letter">
                {{ letter }}
              </div>
            </div>
          </div>
          <div v-else class="TypingGame-words">
            <div class="TypingGame-completionText">
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
