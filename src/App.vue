<template>
  <layout></layout>
</template>

<script>
  import Layout from "./components/Layout/Layout";
  import login from './pages/LogIn';

  export default {
    components: {
      Layout,
    },
    method: {
      isAuthenticated(){
          return true;
      }
    },
    name: "App",
  };
</script>

<style lang="scss" scoped>
  #app {
    font-family: Helvetica, sans-serif;
    text-align: center;
    height: 100vh;
  }
</style>
