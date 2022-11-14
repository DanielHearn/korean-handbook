<template>
  <div class="main home-page">
    <main-panel>
      <header-panel>
        <h1>The Korean Handbook</h1>
        <h2>Collection of Korean language learning tools and information.</h2>
      </header-panel>
      <div class="page-content">
        <div class="intro-links">
          <router-link
            v-for="link in introLinks"
            :key="`${link.slug}`"
            :to="`/content/conjunctions/${link.slug}`"
            class="intro-link"
          >
            <p v-if="!mobile" class="link-main text-link">
              <span class="link-icon">
                <i class="material-icons">{{ link.icon }}</i>
              </span>
              {{ link.name }}
            </p>
            <p v-if="!mobile" class="link-description">{{ link.description }}</p>
            <span v-if="mobile" class="link-icon">
              <i class="material-icons">{{ link.icon }}</i>
            </span>
            <div v-if="mobile">
              <p class="link-main">{{ link.name }}</p>
              <p class="link-description">{{ link.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="page-content">
        <p class="text">
          The Korean Handbook provides tools and information to aid in learning Korean. Developed by
          <a href="https://danielhearn.co.uk" class="text-link">Daniel Hearn</a>, the source code is
          on <a href="https://github.com/DanielHearn/Korean-Handbook" class="text-link">GitHub</a>.
        </p>
      </div>
    </main-panel>
    <NavigationTabs v-if="mobile && tabs" :items="tabs" selected="home" />
  </div>
</template>

<script src="./HomePage.js"></script>
