<template>
 <div class="parent">
      <el-card class="card">
  <img src="img.jpg" alt="Akshay" style="width:100%">
  <h1>Akshay Vijayvergia</h1>
  <p class="title">Male</p>
  <p>10 May 1996</p>
  <p><el-button type="primary" icon="el-icon-arrow-right">some@mail.com</el-button></p>
  </el-card>
 </div>
</template>

<script>
  import { mapGetters } from 'vuex';

    export default {
        name: "profile",
      computed: {
        ...mapGetters([
          'getUserName',
        ]),
      }
    };

//TODO: Get data from store and update it in the profile page
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 500px;
  max-width: 500px;
  margin: auto;
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

/* .parent {
  background-image: url(../assets/background-a2f2fdf7dcdaafe1c52909ac3b643dea.svg);
  top: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
} */

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
