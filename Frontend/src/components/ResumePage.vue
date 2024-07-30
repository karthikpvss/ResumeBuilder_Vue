<template>
    <v-card class="mt-n200">
      <v-tabs
        v-model="tab"
        color="#ffffff"
        align-tabs="start"
        class="mt-n200"
        bg-color="transparent"
      >
        <v-tab :value="1">Build Resume</v-tab>
        <v-tab :value="2">All Resumes</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item
          :key="1"
          :value="1"
        >
          <ResumeBuilder/>
        </v-window-item>
        <v-window-item
          :key="2"
          :value="2"
        >
          <AllResumes/>
        </v-window-item>
      </v-window>
    </v-card>
  </template>
  
  <script>
    //import { CohereClient } from "cohere-ai";
    import ResumeBuilder from './ResumeBuilder.vue'
    import AllResumes from './AllResumes.vue'
    export default {
    components: { ResumeBuilder, AllResumes},
      data: () => ({
        tab: null,
      }),
      methods: {
        
      },
    }
  </script>

<style>
</style>
  