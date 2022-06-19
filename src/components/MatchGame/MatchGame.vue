<template>
  <div class="match">
    <div class="match-info">Match each English word to their Korean translation.</div>
    <div class="match-words">
      <ul class="match-column">
        <li
          v-for="word in englishWords"
          :key="word.e"
          class="match-word match-english"
          :class="{
            'match-word--active': selected.e !== null && selected.e === word.id,
            'match-word--completed': completed[word.id],
          }"
        >
          <button
            :disabled="completed[word.id]"
            class="button--secondary"
            @click="onWordClick('e', word.id)"
          >
            {{ word.word }}
          </button>
        </li>
      </ul>
      <ul class="match-column">
        <li
          v-for="word in koreanWords"
          :key="word.e"
          class="match-word match-korean"
          :class="{
            'match-word--active': selected.k !== null && selected.k === word.id,
            'match-word--completed': completed[word.id],
          }"
        >
          <button
            :disabled="completed[word.id]"
            class="button--secondary"
            @click="onWordClick('k', word.id)"
          >
            {{ word.word }}
          </button>
        </li>
      </ul>
    </div>
    <div class="match-completed">
      <ul class="match-column">
        <li
          v-for="word in completedWords"
          :key="word.id"
          class="match-word match-english match-word--completed"
        >
          <button class="button--secondary">
            <div>{{ word.e }}</div>
            <div>
              {{ word.k }}
            </div>
          </button>
        </li>
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
