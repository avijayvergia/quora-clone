<template>
  <div>
    <post-tile v-for="post in postList" :post="post" :key="post.id"></post-tile>
    <component-dialog :dialog-visible.sync="dialogVisible">
    </component-dialog>
    <el-button type="primary" @click="dialogVisible = true" icon="el-icon-edit" id="fixed-postButton">POST</el-button>
  </div>
</template>

<script>
import { postsRef, userRef } from "../middleware/firebase";
import PostTile from "./PostTile/PostTile";
import ComponentDialog from "./ComponentDialog";

export default {
  components: {
    PostTile,
     ComponentDialog
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
  data() {
    return {
      dialogVisible: false
    };
  },
  firebase: {
    posts: postsRef,
    users: userRef
  },
  methods: {
    addUserInfo(object, item) {
      object.userName = `${item.val().firstName} ${item.val().lastName}`;
      object.userPic = item.val().picUrl;
    }
  }
};
</script>

<style scoped>
#fixed-postButton {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
