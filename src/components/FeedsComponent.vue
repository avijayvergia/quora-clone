<template>
  <div>
    <post-tile v-for="post in feed" :post="post" :key="post.id"></post-tile>
    <component-dialog :dialog-visible.sync="dialogVisible">
    </component-dialog>
    <el-button type="primary" @click="dialogVisible = true" icon="el-icon-edit" id="fixed-postButton">POST</el-button>
  </div>
</template>

<script>
  import {userRef} from "../middleware/firebase";
  import PostTile from "./PostTile/PostTile";
  import {mapGetters} from 'vuex';
  import ComponentDialog from "./ComponentDialog";

  export default {
  components: {
    PostTile,
     ComponentDialog
  },
  name: "feeds-component",
  computed: {
    ...mapGetters([
      'getFriendIds',
      'getUserId',
    ]),
    getUserIds() {
      return [...this.getFriendIds, this.getUserId];
    },
    feed() {
      const posts = [];

      this.getUserIds.forEach((id) =>
        userRef.child(id).on('value', (snapshot) => {
          const val = snapshot.val();
          const name = `${val.firstName} ${val.lastName}`;
          const dp = val.userPic;

          const postObj = val.posts;
          for (let key in postObj){
            const post = postObj[key];
            post.key = key;
            post.userName = name;
            post.userPic = dp;
            posts.push(post);
          }
          // if (val.posts){
          //   Object.values(val.posts).forEach((post) => {
          //     post.userName = name;
          //     post.userPic = dp;
          //     posts.push(post);
          //   });
          // }
        })
      );
      return posts;
    },
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  firebase: {
    users: userRef
  },
};
</script>

<style scoped>
#fixed-postButton {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
