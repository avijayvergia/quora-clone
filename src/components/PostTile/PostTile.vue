<template>
  <div v-if="post.userName">
    <el-card class="tile">
      <div>
        <post-tile-header :userInfo="userInfo" @action="trigger" />
      </div>
      <div class="tile__body">
        <hr>
        <img :src="post.imageUrl" style="margin: auto" v-if="post.imageUrl">
        <p>{{post.content}}</p>
      </div>
      <comments-tile :userKey="post.key"/>
    </el-card>
    <component-dialog :post="editPost" :actionToPerform.sync="actionToPerform" :dialog-visible.sync="dialogVisible" v-if="dialogVisible">
    </component-dialog>
  </div>
</template>

<script>
import PostTileHeader from "./PostTileHeader";
import ComponentDialog from "../ComponentDialog";
import CommentsTile from "./CommentsTile";

export default {
  components: {
    PostTileHeader,
    ComponentDialog,
    CommentsTile
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
      actionToPerform: "",
      editPost: null
    };
  },
  methods: {
    trigger(action) {
      this.dialogVisible = true;
      this.editPost = { ...this.post };
      this.actionToPerform = action;
    }
  }
};
</script>

<style scoped lang="scss">
.tile {
  margin: 10px auto;
  font-family: "Roboto", sans-serif;
  width: 30%;

  &__body {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }
}
</style>