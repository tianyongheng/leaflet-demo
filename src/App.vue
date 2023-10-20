<template>
  <div id="app">
   <map-demo></map-demo>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import MapDemo from './components/Map.vue';

export default {
  name: 'App',
  components: {
    MapDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
