<template>
    <v-card class="mt-n200">
      <v-tabs
        v-model="tab"
        color="#ffffff"
        align-tabs="start"
        class="mt-n200"
        bg-color="transparent"
      >
        <v-tab :value="1">All Resumes</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
          :key="1"
          :value="1"
        >
          <AllUsersResumes/>
        </v-window-item>
      </v-window>
    </v-card>
  </template>
  
  <script>
    //import { CohereClient } from "cohere-ai";
    import AllUsersResumes from './AllUsersResumes.vue'
    export default {
    components: { AllUsersResumes},
      data: () => ({
        tab: null,
      }),
      methods: {
        
      },
    }
  </script>

<style>
</style>
  