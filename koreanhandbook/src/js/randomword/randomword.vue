<template>
   <section id="app">
      <section class="korean__container">
        <div class="word__container">
          <div id="genWord">
            <div class="pulseLoader" v-bind:class="{ hideLoader: dbLoaded }">
              <div class="pulse"></div>
              <div class="pulse"></div>
            </div>
            <h2 id="genWord__english" v-bind:class="{ visible: wordVisible }">{{ word_english }}</h2>
            <h3 id="genWord__korean" v-bind:class="{ visible: wordVisible }">{{ word_korean }}</h3>
          </div>
          <button class="button--purple" v-bind:disabled="buttonDisabled" @click="retrieveWord()" v-if="language === 'English'">Generate Word</button>
          <button class="button--purple" v-bind:disabled="buttonDisabled" @click="retrieveWord()" v-if="language === 'Korean'">다음 워드</button>
        </div>
        <div class="option__container">
          <div class="option">
              <p>Word Category</p>
              <select 
                v-model="content" v-on:change="retrieveWord">
                    <option>Random</option>
                    <option 
                        v-for="name in contentNames">
                        {{ name }}
                        </option>
              </select>
          </div>
          <div class="option">
              <p v-if="language === 'English'">Language</p>
              <p v-if="language === 'Korean'">언어</p>
              <select v-model="language" id="language-select">
                  <option>English</option>
                  <option>Korean</option>
              </select>
          </div>
          <div class="option">
            <a 
                v-bind:href="categoryLink"
                v-bind:class="{ visible: linkVisible }" class="link-text accent">View full category page</a>
        </div>
        </div>
      </section>
    </section> 
</template>

<script src="./randomword.js"></script>

