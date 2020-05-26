<template>
  <div id="app">
    <v-app>
      <navbar></navbar>

      <v-content class="mx-sm-12 mt-8 mx-1">
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import navbar from "./components/navbar";

export default {
  components: {
    navbar
  },
  data() {
    return {
      loading: true
    }
  }
}
</script>

<style>
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    background-color: blue
  }
</style>