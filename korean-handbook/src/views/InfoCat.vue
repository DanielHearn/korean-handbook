<template>
  <div class="Info">
    <h1>Info</h1>
    <div>
      <h2>{{category.name}}</h2>
      <ul>
        <li v-for="word in category.words" :key="word.e">
          <p>{{word.e}}</p>
          <p>{{word.k}}</p>
        </li>
      </ul>
    </div>
    <ul>
      <li>
        <router-link :to="`/info/verbs`">Essential Verbs</router-link>
      </li>
      <li>
        <router-link :to="`/info/conjunctions`">Conjunctions</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Categories } from "./../static/categories.js";

export default {
  name: "InfoCat",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      category: []
    };
  },
  watch: {
    id: function() {
      this.loadCategory();
    }
  },
  methods: {
    loadCategory: function() {
      if (Categories.hasOwnProperty(this.id)) {
        this.category = Categories[this.id];
      }
    }
  },
  mounted: function() {
    this.loadCategory();
  }
};
</script>
