<template>
  <div class="feeds-page">
    <feeds-component></feeds-component>
    <add-connections/>
  </div>
</template>

<script>
  import FeedsComponent from "../components/FeedsComponent";
  import AddConnections from "../components/AddConnections";


  export default {
    components: {
      AddConnections,
      FeedsComponent
    },
    name: "feeds",
  }
</script>

<style scoped lang="scss">
  .feeds-page {
    display: flex;
    justify-content: space-between;
  }
</style>
