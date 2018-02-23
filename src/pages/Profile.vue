<template>
  <div class="parent">
    <div class="background">

    </div>

    <el-card class="card">
      <img :src="user.userPic">
      <h1>{{user.firstName}} {{user.lastName}}</h1>
      <p class="title">{{user.sex}}</p>
      <p>{{user.dateOfBirth}}</p>
      <p>
        <el-button type="primary" icon="el-icon-arrow-right">{{user.email}}</el-button>
      </p>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "profile",
  data() {
    return {
      user: ""
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  created() {
    this.user = this.getUser;
    console.log(this.user);
  }
};

//TODO: Get data from store and update it in the profile page
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 600px;
  max-height: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -200px;
  text-align: center;
  position: absolute;
  font-family: "Roboto", sans-serif;
  left: 0;
  right: 0;
}

.title {
  color: grey;
  font-size: 18px;
}

.background {
  background-image: linear-gradient(
    222deg,
    #ff272d 0,
    #c42482 33%,
    #ab217f 47%,
    #671878 84%,
    #4a1475 100%
  );
  background-color: #c42482;
  height: 400px;
}
a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}
button:hover,
a:hover {
  opacity: 0.7;
}
</style>