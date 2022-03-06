<template>
  <div class="main home">
    <side-panel :mobile="mobile" :open-initially="true">
      <template v-slot:header>
        <p class="text">
          The Korean Handbook provides tools and information to aid in learning
          Korean. Developed by
          <a href="https://danielhearn.co.uk" class="text-link">Daniel Hearn</a
          >, the source code is on
          <a
            href="https://github.com/DanielHearn/Korean-Handbook"
            class="text-link"
            >GitHub</a
          >.
        </p>
      </template>
    </side-panel>
    <main-panel>
      <header-panel>
        <h1>The Korean Handbook</h1>
        <h2>
          Collection of Korean language learning tools and information.
        </h2>
      </header-panel>
      <div class="page-content">
        <div class="intro-links">
          <div class="intro-link">
            <router-link to="/content/conjunctions/random">
              <p class="link-main text-link">
                <span class="link-icon"
                  ><i class="material-icons">shuffle</i></span
                >
                Random Word Generator
              </p>
              <p class="link-description">
                Learn random words and test your knowledge.
              </p>
            </router-link>
          </div>
          <div class="intro-link">
            <router-link to="/content/conjunctions/info">
              <p class="link-main text-link">
                <span class="link-icon"
                  ><i class="material-icons">list</i></span
                >
                Word Categories
              </p>
              <p class="link-description">Learn new words.</p>
            </router-link>
          </div>
        </div>
      </div>
    </main-panel>
  </div>
</template>

<script>
import MainPanel from './../components/MainPanel/MainPanel.vue'
import SidePanel from './../components/SidePanel/SidePanel.vue'
import HeaderPanel from './../components/HeaderPanel/HeaderPanel.vue'

export default {
  name: 'home',
  components: {
    MainPanel,
    SidePanel,
    HeaderPanel,
  },
  computed: {
    mobile() {
      return this.$store.state.mobile
    },
  },
}
</script>
