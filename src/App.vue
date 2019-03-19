<template>
  <v-app id="app">
    <app-header></app-header>
    <v-content>
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
  export default {
    name: 'App',
    components: {
      AppHeader
    }
  }
</script>

<style>
  #app{
    text-align: center;
  }
</style>
