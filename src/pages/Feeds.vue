<template>
  <feeds-component></feeds-component>
</template>

<script>
    import FeedsComponent from "../components/FeedsComponent";
    import { userRef } from '../middleware/firebase';

    export default {
      components: {
        FeedsComponent},
      name: "feeds",
      firebase: {
        users: userRef,
      },
    }
</script>

<style scoped>

</style>
