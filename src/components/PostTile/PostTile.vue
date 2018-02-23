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
    <component-dialog :post="editPost" :actionToPerform.sync="actionToPerform" :dialog-visible.sync="dialogVisible" v-if="dialogVisible" :user-info="myUserInfo">
    </component-dialog>
  </div>
</template>

<script>
  import PostTileHeader from "./PostTileHeader";
  import ComponentDialog from "../ComponentDialog";
  import CommentsTile from "./CommentsTile";
  import {mapGetters} from 'vuex';

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
        userName: this.post.userName,
        userPic: this.post.userPic,
        userId: this.post.userID,
      };
    },
    ...mapGetters({
      myUserInfo: 'getUserInfo',
    })
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
      if (this.myUserInfo.userId === this.userInfo.userId){
        this.editPost = { ...this.post };
        this.actionToPerform = action;
        this.dialogVisible = true;
      } else {
        this.$notify({
          title: 'Unauthorized Action!',
          message: 'You are not allowed to perform this action.',
          type: 'error',
        });
      }
    },
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
