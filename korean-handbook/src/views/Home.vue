<template>
  <div class="main home">
    <div class="home-content">
      <div class="block intro">
        <h1>The Korean Handbook</h1>
        <h2>
          Collection of Korean language learning tools and information.
        </h2>
        <div class="intro-links">
          <div class="intro-link">
            <router-link to="/random-words/all">
              <p class="link-main text-link">
                <span class="link-icon"><i class="material-icons">shuffle</i></span>
                Random Word Generator
              </p>
              <p class="link-description">
                Learn random words and test your knowledge.
              </p>
            </router-link>
          </div>
          <div class="intro-link">
            <router-link to="/info/">
              <p class="link-main text-link">
                <span class="link-icon"><i class="material-icons">list</i></span>
                Word Categories
              </p>
              <p class="link-description">Learn new words.</p>
            </router-link>
          </div>
          <div class="block intro-item">
            <p class="heading">About</p>
            <p class="text">
              The Korean Handbook provides tools and
              information to aid in learning Korean. Developed by
              <a href="https://danielhearn.co.uk" class="text-link"
                >Daniel Hearn</a
              >, the source code is on
              <a
                href="https://github.com/DanielHearn/Korean-Handbook"
                class="text-link"
                >GitHub</a
              >.
            </p>
          </div>
          <div class="block intro-item">
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
