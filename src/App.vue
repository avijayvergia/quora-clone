<template>
<div>
  <layout></layout>
</div>

</template>

<script>
  import Layout from "./components/Layout/Layout";
  import login from './pages/LogIn';

  export default {
    components: {
      Layout,
    },
    name: "App",
  };
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
</style>
