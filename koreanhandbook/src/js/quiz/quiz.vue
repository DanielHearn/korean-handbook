<template>
  <div id="app">
    <section class="app-content">
      <div class="col">
        <div class="col-content">
          <div id="genWord">
            <!--<div class="pulseLoader" 
              v-bind:class="{ hidden : dbLoaded }">
                <div class="pulse"></div>
                <div class="pulse"></div>
            </div>-->
            <div class="question-wrap">
                <div class="question"> 
                  <p>What is the meaning of this Korean word.</p>
                  <h3 id="genWord__korean">
                    {{ answerKorean }}
                    </h3>
                </div>
                <div class="answers">
                  <square-button
                    class="button--dark"
                    v-on:clicked="checkAnswer(word.english)"
                    v-for="word in words" 
                    v-bind:key="word.key"
                    v-bind:disabled="answerButtonsDisabled"
                    v-bind:text="word.english"
                    v-bind:class="{ 
                      'button-correct': status.length && word.english === answerEnglish,
                      'button-incorrect': status === 'Incorrect' && (word.english === selectedAnswer)}"
                    >
                    </square-button>
                </div>
            </div>
          </div>
          <button class="button--purple"
            v-bind:disabled="genButtonDisabled" @click="retrieveWords()">
            Next Word
            </button>
        </div>
      </div>
      <div class="col grey">
        <div class="col-content content-left">
          <div class="option">
            <div class="option-content">
              <p>Word Category</p>
            </div>
            <div class="option-content">
              <select 
                v-model="content"
                v-on:change="retrieveWords">
                  <option>Random</option>
                  <option 
                      v-for="name in contentNames"
                      v-bind:key="name.key">
                      {{ name.full_name }}
                      </option>
              </select>
            </div>
          </div>
          <div class="option">
            <a 
              v-bind:href="categoryLink"
              v-bind:class="{ visible: linkVisible }" class="link-text accent">
              View full category page</a>
          </div>
          <div 
            class="status-container"
            v-if="status"
            v-bind:class="{ 
              correct: status === 'Correct',
              incorrect: status === 'Incorrect' }"
              >
            <p class="status">{{ status }}</p>
            <p class="correct-answer">{{ correctAnswer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="./quiz.js"></script>