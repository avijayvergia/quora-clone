<template>
  <div>
    <post-tile v-for="post in posts" :post="post" :key="post.id"></post-tile>
  </div>
</template>

<script>
import PostTile from "./PostTile/PostTile";

export default {
  components: {
    PostTile
  },
  name: "feeds-component",
  props: {
    posts: { type: Array, required: true },
  },
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

#fixed-postButton {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
