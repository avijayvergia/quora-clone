<template>
  <div>Profile {{getUserName}}</div>
</template>

<script>
  import { mapGetters } from 'vuex';

    export default {
        name: "profile",
      computed: {
        ...mapGetters([
          'getUserName',
        ]),
      }
    }
</script>

<style scoped>

</style>
