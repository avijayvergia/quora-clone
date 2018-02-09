<template>
    <el-menu
      class="sidebar"
      background-color="#282F3E"
      text-color="#C0C2BD"
      active-text-color="#379CE7"
      :router="true">
      <el-menu-item index="profile">MY PROFILE</el-menu-item>
      <el-menu-item index="feeds">FEED</el-menu-item>
      <el-menu-item @click="logout">LOG OUT</el-menu-item>
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
}
</style>
