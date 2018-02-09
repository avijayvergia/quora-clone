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
          .on("child_added", snapshot => this.addName(element, snapshot));
      });
      return this.posts;
    }
  },
  firebase: {
    posts: postsRef,
    users: userRef
  },
  methods: {
    // addObject() {
    //   this.dialogFormVisible = false;
    //   postsRef.push(this.post);
    // },
    // addAttachment(file, fileList) {
    //   const imageUID = String(file.file.uid);
    //   postStorageRef
    //     .child(imageUID)
    //     .put(file.file)
    //     .then(snapShot => {
    //       this.post.imageUrl = snapShot.downloadURL;
    //     });
    // },
    // handleAvatarSuccess(res, file) {},
    // beforeAvatarUpload(file) {
    //   return true;
    // },
    addName(object, item) {
      object.userName = `${item.val().firstName} ${item.val().lastName}`;
    }
  }
};
</script>

<style scoped>
</style>
