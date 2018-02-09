<template>
  <el-menu class="sidebar" :router="true">
    <el-menu-item index="profile">
      <i class="el-icon-view"></i>
      <span>Profile</span> </el-menu-item>
    <el-menu-item index="feeds">
       <i class="el-icon-document"></i>
      <span>Feed</span> 
    </el-menu-item>
    <el-menu-item @click="logout">
        <i class="el-icon-close"></i>
      <span>Log Out</span> 
    </el-menu-item>
  </el-menu>

</template>

<script>
  import { Firebase } from "../../middleware/firebase";

  export default {
    name: "side-bar",
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      logout() {
        Firebase.auth()
          .signOut()
          .then(() => {
            this.$router.replace("login");
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .sidebar {
    height: 100%;
      font-family: 'Roboto', sans-serif;
  }
</style>