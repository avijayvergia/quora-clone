<template>
  <div>
    <post-tile v-for="post in postList" :post="post" v-if="!!post.userName" :key="post.id"></post-tile>
  </div>
</template>

<script>
import { postsRef, userRef } from "../middleware/firebase";
import PostTile from "./PostTile/PostTile";

export default {
  components: {
    PostTile,
  },
  name: "feeds-component",
  computed: {
    postList() {
      this.posts.map(element => {
        userRef
          .orderByKey()
          .equalTo(String(element.userID))
          .on("child_added", snapshot => this.addUserInfo(element, snapshot));
      });
      return this.posts;
    }
  },
  firebase: {
    posts: postsRef,
    users: userRef
  },
  methods: {
    addUserInfo(object, item) {
      object.userName = `${item.val().firstName} ${item.val().lastName}`;
      object.userPic = item.val().imageUrl;
    }
  }
};
</script>

<style scoped>
</style>
