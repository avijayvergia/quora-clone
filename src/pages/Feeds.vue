<template>
  <div class="feeds-page">
    <feeds-component :count="count"></feeds-component>
    
  </div>
</template>

<script>
import FeedsComponent from "../components/FeedsComponent";

export default {
  components: {
    FeedsComponent
  },
  name: "feeds",
  data() {
    return {
      count: 0
    };
  }
};
</script>

<style scoped lang="scss">

</style>
