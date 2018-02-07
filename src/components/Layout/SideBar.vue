<template>
    <el-menu
      class="sidebar"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-menu-item index="profile">My Profile</el-menu-item>
      <el-menu-item index="feeds">Feed</el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    name: "side-bar",
    data() {
      return {
        isCollapse: true
      };
    },
  }
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
}

</style>
