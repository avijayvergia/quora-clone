<template>
  <div>
    <tile-layout v-for="post in postList" :key="post.id">
      <div slot="tile-header">
        {{post.userName}}
        <br>
        <span style="font-size: 12px">{{post.date}}</span>
      </div>
      <div slot="tile-body" style="font-size: 14px">
        {{post.content}}
      </div>
      <div slot="tile-image">
        <img :src="post.imageUrl">
      </div>
      <div slot="post-like-section">
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
      </div>
    </tile-layout>
    <!-- Form -->
    <br>
    <el-button type="primary" plain @click="dialogFormVisible = true" icon="el-icon-edit" id="fixed-postButton">POST</el-button>
    <el-dialog title="NEW POST" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Content">
          <el-input v-model="post.content" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Choose Image">
          <el-upload class="avatar-uploader" action="" :http-request="addAttachment" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="post.imageUrl" :src="post.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addObject">Post</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { postsRef, userRef, postStorageRef } from "../middleware/firebase";
  import TileLayout from "./Tile/TileLayout";

  export default {
    components: {
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
    data() {
      return {
        post: {
          content: "",
          date: "",
          dislike: 0,
          likes: 0,
          userID: 100,
          imageUrl: "",
          userName: ""
        },
        dialogTableVisible: false,
        dialogFormVisible: false
      };
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
      handleAvatarSuccess(res, file) { },
      beforeAvatarUpload(file) {
        return true;
      },
      addName(object, item) {
        object.userName = `${item.val().firstName} ${item.val().lastName}`;
      },
      like(post) {
        

      },
      dislike(post) {
        
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

  #fixed-postButton{
    position: fixed;
    bottom: 30px;
    right: 30px; 
  }
</style>