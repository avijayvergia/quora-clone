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
import { userRef } from "../middleware/firebase";
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
  computed: {
    ...mapGetters(["getAllIds"])
  },
  watch: {
    getAllIds: {
      handler: function(userIds) {
        this.fetchPosts(userIds);
      },
      immediate: true
    }
  },
  methods: {
    fetchPosts(userIds) {
      userIds.forEach(id => {
        new Promise(resolve => {
          userRef
            .child(id)
            .once("value")
            .then(snapshot => {
              const val = snapshot.val();
              const name = `${val.firstName} ${val.lastName}`;
              const dp = val.userPic;
              resolve({ name, dp });
            });
        }).then(userObj => {
          userRef.child(`${id}/posts`).on("child_added", snapshot => {
            const postObj = snapshot.val();
            postObj.key = snapshot.key;
            postObj.userName = userObj.name;
            postObj.userPic = userObj.dp;
            this.feed.push(postObj);
          });
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
