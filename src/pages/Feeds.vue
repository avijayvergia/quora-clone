<template>
  <div class="feeds-page">
  <feeds-component></feeds-component>
  <add-connections></add-connections>
  </div>
</template>

<script>
    import FeedsComponent from "../components/FeedsComponent";
    import { userRef } from '../middleware/firebase';
    import AddConnections from "../components/AddConnections";

    export default {
      components: {
        AddConnections,
        FeedsComponent},
      name: "feeds",
      firebase: {
        users: userRef,
      },
    }
</script>

<style scoped lang="scss">
.feeds-page {
  display: flex;
  justify-content: space-between;
}
</style>
