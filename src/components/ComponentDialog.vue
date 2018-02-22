<template>
  <el-dialog class="popup" :visible="dialogVisible">
    <el-form class="form">
      <h1>{{post.userName}}</h1>
      <el-form-item label="Your Content:">
        <el-input v-model="post.content" type="textarea" autosize></el-input>
      </el-form-item>
      <el-form-item label="Choose Image">
        <el-upload class="avatar-uploader" action="" :http-request="addAttachment" :show-file-list="false"
                   :on-success="handleAvatarSuccess"
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
import { postStorageRef, userRef } from "../middleware/firebase";
import { mapGetters } from "vuex";

export default {
  name: "component-dialog",
  props: {
    post: {
      default: () => {
        return {
          userName: "",
          content: "",
          dislike: "",
          likes: "",
          imageUrl: "",
          userID: "100",
          date: "10/05/1996"
        };
      },
      type: Object,
      required: false
    },
    actionToPerform: { default: "", type: String },
    dialogVisible: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters(["getUserId"])
  },
  methods: {
    confirm() {
      switch (String(this.actionToPerform)) {
        case "Edit Post":
          const copy = {
            content: this.post.content,
            imageUrl: this.post.imageUrl
          };
          userRef
            .child(`${this.getUserId}/posts/${this.post["key"]}`)
            .update(copy);
          this.$notify({
            title: "Success",
            message: "Changes saved!",
            type: "success"
          });
          break;
        case "Delete Post":
          userRef.child(`${this.getUserId}/posts/${this.post["key"]}`).remove();
          this.$notify({
            title: "Success",
            message: "Post deleted!",
            type: "success"
          });
          break;
        case "":
          this.post.userID = this.getUserId;
          userRef
            .child(this.getUserId)
            .child("posts")
            .push(this.post);
          this.$notify({
            title: "Success",
            message: "You post has been successfully uploaded",
            type: "success"
          });
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