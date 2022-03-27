<template>
  <div class="match">
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
            @click="onWordClick('k', word.id)"
          >
            {{ word.word }}
          </button>
        </li>
      </ul>
    </div>
    <div class="match-actions">
      <button
        :disabled="Object.keys(completed).length < this.NUMBER_OF_WORDS"
        @click="nextWords()"
      >
        Next words
      </button>
    </div>
  </div>
</template>

<script src="./Match.js"></script>

<style lang="scss">
@import './Match.scss';
</style>
