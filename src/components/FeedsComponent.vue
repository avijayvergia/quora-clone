<template>
  <div>
    <tile-layout v-for="post in postList" :key="post.id">
      <div slot="tile-header">
        <post-tile-header :userName="post.userName" :userPic="post.imageUrl" v-if="!!post.userName"></post-tile-header>
      </div>
      <div slot="tile-body">
        <h2>{{post.content}}</h2>
      </div>
    </tile-layout>



    <!-- Form -->
    <br>
<el-button type="primary" plain @click="dialogFormVisible = true">POST</el-button>


  </div>
</template>

<script>
import { postsRef, userRef, postStorageRef } from "../middleware/firebase";
import TileLayout from "./Tile/TileLayout";
import PostTileHeader from "./PostTile/PostTileHeader";

export default {
  components: {
    PostTileHeader,
    TileLayout
  },
  name: "feeds-component",
  computed: {
    postList() {
      this.posts.map(element => {
        userRef
          .orderByKey()
          .equalTo(String(element.userID))
          .on("child_added", snapshot => this.addName(element, snapshot));
      });
      return this.posts;
    }
  },
  firebase: {
    posts: postsRef,
    users: userRef
  },
  methods: {
    addObject() {
      this.dialogFormVisible = false;
      postsRef.push(this.post);
    },
    addAttachment(file, fileList) {
      const imageUID = String(file.file.uid);
      postStorageRef
        .child(imageUID)
        .put(file.file)
        .then(snapShot => {
          this.post.imageUrl = snapShot.downloadURL;
        });
    },
    handleAvatarSuccess(res, file) {},
    beforeAvatarUpload(file) {
      return true;
    },
    addName(object, item) {
      object.userName = `${item.val().firstName} ${item.val().lastName}`;
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 5px #409eff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
