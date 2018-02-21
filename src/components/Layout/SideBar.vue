<template>
  <el-menu class="sidebar" mode="horizontal" router="true">
    <el-menu-item index="profile">
      <i class="el-icon-view"></i>
      <span>Profile</span> </el-menu-item>
    <el-menu-item index="feeds">
       <i class="el-icon-document"></i>
      <span>Feed</span>
    </el-menu-item>
    <el-menu-item @click="logout" index="logout">
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
  font-family: "Roboto", sans-serif;
  font-family: "Roboto", sans-serif;
  top: 0;
  position: fixed;
  width: 100%   
}
</style>
