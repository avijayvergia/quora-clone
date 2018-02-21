<template>
  <div>
    <post-tile v-for="post in feed" :post="post" :key="post.id"></post-tile>
    <component-dialog :dialog-visible.sync="dialogVisible">
    </component-dialog>
    <el-button type="primary" @click="dialogVisible = true" icon="el-icon-edit" id="fixed-postButton">POST</el-button>
  </div>
</template>

<script>
import { userRef, commentsRef } from "../middleware/firebase";
import PostTile from "./PostTile/PostTile";
import { mapGetters } from "vuex";
import ComponentDialog from "./ComponentDialog";

export default {
  components: {
    PostTile,
    ComponentDialog
  },
  name: "feeds-component",
  data() {
    return {
      dialogVisible: false,
      feed: []
    };
  },
  props: {
    count:{
      required: true,
    }
  },
  computed: {
    ...mapGetters(["getFriendIds", "getUserId"]),
    getUserIds() {
      return [...this.getFriendIds, this.getUserId];
    }
  },
  watch: {
    getUserIds: {
      handler: function(userIds) {
        this.fetchPosts(userIds);
      },
      immediate: true
    }
  },
  methods: {
    fetchPosts(userIds) {
      console.log(Date.now());
      const posts = [];
      console.log(userIds);
      userIds.forEach(id => {
        new Promise((resolve, reject) => {
          userRef.child(id).on("value", snapshot => {
            if (snapshot.val()) {
              resolve(snapshot.val());
            }
          });
        }).then(val => {
          const name = `${val.firstName} ${val.lastName}`;
          const dp = val.userPic;

          const postObj = val.posts;
          for (let key in postObj) {
            const post = postObj[key];
            post.key = key;
            post.userName = name;
            post.userPic = dp;
            posts.push(post);
          }
          console.log(posts);
          this.feed = posts;
        });
      });
    }
  },
  firebase: {
    users: userRef
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
