<template>
  <el-badge>
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
  </el-badge>
 
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
      feed: []
    };
  },
  props: {
    count: {
      required: true
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
