<template>
  <div class="main home">
    <div class="home-content">
      <div class="intro">
        <h1>The Korean Handbook</h1>
        <h2>
          Collection of Korean language learning tools and information.
        </h2>
      </div>
      <div>
        <p class="heading">Content</p>
        <div class="intro-links">
          <div class="intro-link">
            <router-link to="/random-words/all">
              <p class="link-main text-link">
                Random Word Generator
              </p>
              <p class="link-description">
                Learn random words and test your knowledge.
              </p>
            </router-link>
          </div>
          <div class="intro-link">
            <router-link to="/info/">
              <p class="link-main text-link">Word Categories</p>
              <p class="link-description">Learn new words.</p>
            </router-link>
          </div>
        </div>
      </div>
      <div>
        <p class="heading">About</p>
        <p class="text">
          The Korean Handbook is an open-source site providing tools and
          information to aid in learning Korean. The site is developed by
          <a href="https://www.danielhearn.co.uk" class="text-link"
            >Daniel Hearn</a
          >, the site's source code can be found on
          <a
            href="https://github.com/DanielHearn/Korean-Handbook"
            class="text-link"
            >GitHub</a
          >.
        </p>
      </div>
      <div>
        <p class="heading">Site Updates</p>
        <ul class="update-list">
          <li v-for="update in $options.updates" :key="update.date">
            <p class="sub-heading">{{ update.date }}</p>
            <ul class="update-list--content">
              <li v-for="change in update.changes" :key="change">
                <p class="text">{{ change }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Updates } from './../static/updates.js'

export default {
  name: 'home',
  updates: Updates,
}
</script>
