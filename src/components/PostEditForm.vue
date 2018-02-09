<template>
    <el-form :model="addPostForm">
      <el-form-item label="Content" :label-width="formLabelWidth">
        <el-input v-model="post.content" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Choose Image" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="addAttachment"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
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
</template>

<script>
  export default {
    name: "post-edit-form",
    data() {
      return {
        post: {
          content: '',
          date: '',
          dislike: 0,
          likes: 0,
          userID: '',
          imageUrl: '',
          userName: ''
        },
      };
    },
  }
</script>

<style scoped>

</style>
