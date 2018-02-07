<template>
  <layout/>
</template>

<script>
  import Layout from "./components/Layout/Layout";

  export default {
    components: {
      Layout,
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
