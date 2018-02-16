<template>
  <div v-if="post.userName">
    <el-card class="tile">
      <div>
        <post-tile-header :userInfo="userInfo" @action="trigger" />
      </div>
      <div class="tile__body">
        <hr>
        <img :src="post.imageUrl" style="width: 100%; height: 100%" v-if="post.imageUrl">
        <p>{{post.content}}</p>
      </div>
      <div class="like-section">
        <p></p>
        <el-row :gutter="20" type="flex">
          <el-col @click="like(post)">
            <i class="el-icon-arrow-up"></i>
            <span>{{post.likes}}</span>
          </el-col>
          <el-col @click="dislike(post)">
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

    <component-dialog :post="editPost" :actionToPerform.sync="actionToPerform" :dialog-visible.sync="dialogVisible" v-if="dialogVisible">
    </component-dialog>
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
      actionToPerform: '',
      editPost: null,
    };
  },
  methods: {
    trigger(action) {
      this.dialogVisible = true;
      this.editPost = {...this.post};
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
  },
};
</script>

<style scoped lang="scss">
  .tile {
    margin: 5px auto;
    font-family: "Roboto", sans-serif;
    width: 40%;

    &__body {
      margin-top: 50px;
    }
  }
</style>
