<template>
    <el-form :model="post" ref="postEditForm">
      <h3>{{post.userName}}</h3>
      <el-form-item label="Your Content:">
        <el-input v-model="post.content" type="textarea" autosize></el-input>
      </el-form-item>
    </el-form>
</template>

<script>
  export default {
    name: "post-edit-form",
    props: {
      post: { type: Object, required: true },
    },
  }
</script>

<style scoped>
</style>
