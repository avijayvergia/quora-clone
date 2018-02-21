<template>
  <div class="feeds-page">
    <feeds-component :count="count"></feeds-component>
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
    data() {
      return {
        count: 0,
      }
    }
  }
</script>

<style scoped lang="scss">
  .feeds-page {
    display: flex;
    justify-content: space-between;
  }
</style>
