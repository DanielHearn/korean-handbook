<template>
  <section id="app">
    <section class="app-content">
      <div class="col">
        <div class="col-content">
          <div id="genWord">
            <!--<div class="pulseLoader" v-bind:class="{ hidden: dbLoaded }">
              <div class="pulse"></div>
              <div class="pulse"></div>
            </div>-->
            <h2 id="genWord__english">{{ word_english }}</h2>
            <h3 id="genWord__korean">{{ word_korean }}</h3>
          </div>
          <button class="button--purple" v-bind:disabled="buttonDisabled" @click="retrieveWord()" v-if="language === 'English'">Generate Word</button>
          <button class="button--purple" v-bind:disabled="buttonDisabled" @click="retrieveWord()" v-if="language === 'Korean'">다음 워드</button>
        </div>
      </div>
      <div class="col grey">
        <div class="col-content content-left">
          <div class="option">
            <div class="option-content">
              <p v-if="language === 'English'">Word Category</p>
              <p v-if="language === 'Korean'">범주</p>
            </div>
            <div class="option-content">
              <select 
                v-model="content" v-on:change="retrieveWord">
                  <option>Random</option>
                  <option 
                    v-for="name in contentNames"
                    v-bind:key="name.key">{{ name.full_name }}</option>
              </select>
            </div>
          </div>
          <div class="option">
            <a 
              v-bind:href="categoryLink"
              v-bind:class="{ visible: linkVisible }" class="link-text accent">View full category page</a>
          </div>
        </div>
        <div class="col-footer content-left">
          <div class="option">
            <div class="option-content">
              <p v-if="language === 'English'">Language</p>
              <p v-if="language === 'Korean'">언어</p>
            </div>
            <div class="option-content">
              <select v-model="language" id="language-select">
                <option>English</option>
                <option>Korean</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section> 
</template>

<script src="./randomword.js"></script>

