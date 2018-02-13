<template>
  <div>
    <el-button @click="log"></el-button>
  </div>
  <!--<feeds-component></feeds-component>-->
</template>

<script>
    import FeedsComponent from "../components/FeedsComponent";
    import { postsRef } from '../middleware/firebase';
    import { mapGetters } from 'vuex';
    import ElButton from "element-ui/packages/button/src/button";

    export default {
      components: {
        ElButton,
        FeedsComponent},
      name: "feeds",
      data() {
        return {
          feeds : null,
        }
      },
      methods: {
        log() {
          console.log(this.getUserIds);
          console.log(this.posts.filter((post) => this.getUserIds.indexOf(post.userID) > -1));
        }
      },
      computed: {
        ...mapGetters([
          'getUserIds',
        ]),
        postList() {
          return this.posts.filter((post) => this.getUserIds.indexOf(post.userID) > -1);
        }
      },
      firebase: {
        posts: postsRef
      },
    }
</script>

<style scoped>

</style>
