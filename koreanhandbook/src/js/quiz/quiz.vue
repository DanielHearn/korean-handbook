<template>
  <div id="app">
    <section class="korean__container">
      <div class="word__container">
          <div id="genWord">
            <div class="pulseLoader" 
              v-bind:class="{ hideLoader: dbLoaded }">
                <div class="pulse"></div>
                <div class="pulse"></div>
            </div>
            <div class="question-wrap" 
              v-bind:class="{ visible: wordVisible }">
                <div class="question"> 
                  <p>What is the meaning of this Korean word.</p>
                  <h3 id="genWord__korean">
                    {{ answerKorean }}
                    </h3>
                </div>
                <div class="answers">
                  <button 
                      class="button--dark" @click=checkAnswer(word.english) 
                      v-for="word in words" 
                      v-bind:disabled="answerButtonsDisabled">
                      {{ word.english }}
                      </button>
                </div>
            </div>
          </div>
          <button class="button--purple"
            v-bind:disabled="genButtonDisabled" @click="retrieveWords()">
            Generate Word
            </button>
      </div>
      <div class="option__container">
          <div class="option">
              <p>Word Category</p>
              <select 
                v-model="content" v-on:change="retrieveWords">
                  <option>Random</option>
                  <option 
                      v-for="name in contentNames">
                      {{ name }}
                      </option>
              </select>
          </div>
          <div class="option">
          <a 
            v-bind:href="categoryLink"
            v-bind:class="{ visible: linkVisible }" class="link-text accent">
            View full category page</a>
          </div>
          <p class="status">{{ status }}</p>
          <p class="correct-answer">{{ correctAnswer }}</p>
      </div>
      </section>
  </div>
</template>

<script src="./quiz.js"></script>