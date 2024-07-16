<template>
  <v-app>
    <v-main>
      <HomePage/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
  import HomePage from './components/HomePage.vue';
</script>
