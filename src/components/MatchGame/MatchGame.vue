<template>
  <div class="match">
    <p class="text">Match each English word to their Korean translation.</p>
    <div v-if="completedWords.length !== numberOfWords" class="match-words">
      <li v-for="(word, i) in englishWords" :key="word.e" class="match-row">
        <div
          class="match-word match-english"
          :class="{
            'match-word--active': selected.e !== null && selected.e === englishWords[i].id,
            'match-word--completed': completed[englishWords[i].id],
          }"
        >
          <button
            :disabled="completed[englishWords[i].id]"
            class="button--secondary"
            @click="onWordClick('e', englishWords[i].id)"
          >
            {{ englishWords[i].word }}
          </button>
        </div>
        <div
          class="match-word match-korean"
          :class="{
            'match-word--active': selected.k !== null && selected.k === koreanWords[i].id,
            'match-word--completed': completed[koreanWords[i].id],
          }"
        >
          <button
            :disabled="completed[koreanWords[i].id]"
            class="button--secondary"
            @click="onWordClick('k', koreanWords[i].id)"
          >
            {{ koreanWords[i].word }}
          </button>
        </div>
      </li>
    </div>
    <div v-else class="match-completed">
      <ul class="match-row">
        <div
          v-for="word in completedWords"
          :key="word.id"
          class="match-word match-english match-word--completed"
        >
          <button class="button--secondary">
            <div>{{ word.e }}: {{ word.k }}</div>
          </button>
        </div>
      </ul>
    </div>
    <div class="match-actions">
      <button
        :disabled="Object.keys(completed).length < numberOfWords"
        class="button--primary"
        @click="nextWords()"
      >
        Next words
      </button>
    </div>
  </div>
</template>

<script src="./MatchGame.js"></script>

<style lang="scss">
@import './MatchGame.scss';
</style>
