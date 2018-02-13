<template>
  <el-dialog class="popup" :visible="dialogVisible">
    <el-form class="form">
      <h1>{{post.userName}}</h1>
      <el-form-item label="Your Content:">
        <el-input v-model="post.content" type="textarea" autosize></el-input>
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
      <el-button @click="confirm">Confirm</el-button>
      <el-button @click="discard">Cancel</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { postsRef, postStorageRef } from "../middleware/firebase";

export default {
  name: "component-dialog",
  props: {
    post: {
      default: {
        userName: "",
        content: "",
        dislike: "",
        likes: "",
        imageUrl: "",
        userID: "100",
        date: "10/05/1996"
      },
      type: Object
    },
    actionToPerform: { default: "", type: String },
    dialogVisible: { type: Boolean, required: true }
  },
  methods: {
    confirm() {
      switch (String(this.actionToPerform)) {
        case "Edit Post":
          const copy = { ...this.post };
          delete copy[".key"];
          postsRef.child(String(this.post[".key"])).set(copy);
          this.$notify({
            title: "Success",
            message: "You post has been edited",
            type: "success"
          });
          break;
        case "Delete Post":
          postsRef.child(String(this.post[".key"])).remove();
          this.$notify({
            title: "Success",
            message: "You post has been deleted",
            type: "success"
          });
          break;
        case "":
          console.log("I am here again. No matter what");
          this.$notify({
            title: "Success",
            message: "You post has been successfully uploaded",
            type: "success"
          });
          postsRef.push(this.post);
          break;
      }
      this.$emit("update:dialogVisible", false);
    },
    discard() {
      this.$emit("update:dialogVisible", false);
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
    }
  }
};
</script>

<style scoped>
#popup {
  font-family: "Roboto", sans-serif;
}

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