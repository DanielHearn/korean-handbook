<template>
  <div class="main home">
    <div class="home-content">
      <div class="intro">
        <h1>The Korean Handbook</h1>
        <h2>Collection of Korean language learning tools and information.</h2>
      </div>
      <div class="intro-links">
        <ul>
          <li>
            <router-link to="/random-words/all">Random Word Generator</router-link>
          </li>
          <li>
            <router-link to="/info/">Word Categories</router-link>
          </li>
        </ul>
      </div>
      <div>
        <p class="heading">About</p>
        <p>
          The Korean Handbook is an open-source site providing tools and information to aid in learning Korean.
          The site is developed by
          <a
            href="https://www.danielhearn.co.uk"
            class="text-link"
          >Daniel Hearn</a>, the site's source code can be found on
          <a
            href="https://github.com/DanielHearn/Korean-Handbook"
            class="text-link"
          >GitHub</a>.
        </p>
      </div>
      <div>
        <p class="heading">Site Updates</p>
        <ul class="update-list">
          <li v-for="update in $options.updates" :key="update.date">
            <p class="sub-heading">{{ update.date }}</p>
            <p class="update-list--content">{{ update.description }}</p>
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
