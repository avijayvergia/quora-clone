<template>

 <div>
    <el-card class = "new-style"></el-card>
    <div class ="adapt-new"><post-tile v-for="post in feed" :post="post" :key="post.id"></post-tile></div>
    <component-dialog :dialog-visible.sync="dialogVisible">
    </component-dialog>

    <div id="fixed-postButton">
        <add-connections/>
        <el-button type="primary" @click="dialogVisible = true" icon="el-icon-edit" >POST</el-button>
    </div>
  </div>

</template>

<script>
import { userRef, commentsRef } from "../middleware/firebase";
import PostTile from "./PostTile/PostTile";
import { mapGetters } from "vuex";
import ComponentDialog from "./ComponentDialog";
import AddConnections from "../components/AddConnections";

  export default {
    components: {
      AddConnections,
      PostTile,
      ComponentDialog
    },
    name: "feeds-component",
    data() {
      return {
        dialogVisible: false,
        feed: [],
      };
    },
    computed: {
      ...mapGetters([
        'getAllIds',
      ]),
    },
    watch: {
      getAllIds: {
        handler: function(userIds) {
          this.fetchPosts(userIds);
        },
        immediate: true,
      },
    },
    methods: {
      fetchPosts(userIds) {
        const posts = [];

        userIds.forEach((id) => {
            userRef.child(id).on('value', (snapshot) => {
              const val = snapshot.val();
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
            });
          }
        );

        this.feed = posts;
      }
    },
    firebase: {
      users: userRef
    },
  };
</script>

<style scoped>
#fixed-postButton {
  font-family: "Roboto", sans-serif;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
}

.new-style {
  height: 400px;
  font-family: "Roboto", sans-serif;
  background-image: linear-gradient(
    222deg,
    #ff272d 0,
    #c42482 33%,
    #ab217f 47%,
    #671878 84%,
    #4a1475 100%
  );
  background-color: #c42482;
}
.adapt-new {
  margin: -360px;
  display: flex;
  flex-direction: column;
}
</style>
