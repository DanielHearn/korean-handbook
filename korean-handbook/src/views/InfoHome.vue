
<template>
  <div class="Info">
    <h1>Info</h1>
    <div>
      <h2>Categories</h2>
      <ul>
        <li v-for="category in $options.categories" :key="category.id">
          <router-link :to="`/info/${category.id}`">{{category.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Categories } from "./../static/categories.js";

export default {
  name: "InfoHome",
  props: {},
  categories: Categories
};
</script>
