<template>
  <div>
    <component-dialog :post="post" :actionToPerform.sync="actionToPerform" :dialog-visible.sync="dialogVisible">
    </component-dialog>

    <el-card class="tile">
      <div class="tile__header">
        <post-tile-header :userInfo="userInfo" @action="trigger" />
      </div>
      <div class="tile__body">
        <hr>
        <img :src="post.imageUrl">
        <p style="font-size: 14px">{{post.content}}</p>
      </div>
      <div class="like-section">
        <p></p>
        <el-row :gutter="20" type="flex">
          <el-col span="4" @click="like(post)">
            <i class="el-icon-arrow-up"></i>
            <span>{{post.likes}}</span>
          </el-col>
          <el-col span="4" @click="dislike(post)">
            <i class="el-icon-arrow-down"></i>
            <span>{{post.dislike}}</span>
          </el-col>
        </el-row>
        <p></p>
      </div>
      <el-collapse>
        <el-collapse-item title="Comments">
          <div>The first comment!!</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import PostTileHeader from "./PostTileHeader";
import ComponentDialog from "../ComponentDialog";

export default {
  components: {
    PostTileHeader,
    ComponentDialog
  },
  name: "post-tile",
  props: {
    post: { type: Object, required: true }
  },
  computed: {
    userInfo() {
      return {
        name: this.post.userName,
        userImage: this.post.userPic
      };
    }
  },
  data() {
    return {
      dialogVisible: false,
      actionToPerform: ""
    };
  },
  methods: {
    trigger(action) {
      this.dialogVisible = true;
      console.log(action);
      this.actionToPerform = action;
    },
    like(post) {
      //TODO: Add like and dislike comments
      post.likes++;
      const copy = { ...this.post };
      delete copy[".key"];
      postsRef.child(String(this.post[".key"])).set(copy);
    },
    dislike(post) {
      post.dislike++;
      const copy = { ...this.post };
      delete copy[".key"];
      postsRef.child(String(this.post[".key"])).set(copy);
    }
  }
};
</script>

<style scoped>
img {
  margin: auto;
}

.contentDiv {
  display: flex;
  flex-direction: column;
}

.tile {
  width: 50%;
  margin: 5px auto;
  font-family: "Roboto", sans-serif;
}

.tile__body {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
</style>