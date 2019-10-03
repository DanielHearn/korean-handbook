<template>
  <div class="main home">
    <div class="home-content">
      <div class="intro">
        <h1>The Korean Handbook</h1>
        <h2>Collection of Korean language learning tools and information.</h2>
      </div>
      <div class="intro-links">
        <ul>
          <li class="sub-heading">
            <router-link to="/random-words/all">Random Words</router-link>
          </li>
          <li class="sub-heading">
            <router-link to="/info/">Info</router-link>
          </li>
        </ul>
      </div>
      <div>
        <p class="heading">Updates</p>
        <ul class="update-list">
          <li v-for="update in $options.updates" :key="update.date">
            <p class="sub-heading">{{ update.date }}</p>
            <p>{{ update.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { Updates } from "./../static/updates.js";

export default {
  name: "home",
  updates: Updates
};
</script>
