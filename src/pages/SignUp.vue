<template>
  <div class="parent">
    <el-card class="sign-up">
    <h3>Let's create a new account !</h3>
    <el-input placeholder="Email" v-model="email" clearable>
    </el-input>
    <p></p>
    <el-input placeholder="Password" v-model="password" clearable>
      </el-input>
    <p></p>
    <el-button type="success" v-on:click="signUp">Sign Up</el-button>
    <span>or go back to
      <router-link to="/login">login</router-link>.</span>
 </el-card>
  </div>
</template>

<script>
import { Firebase } from "../middleware/firebase";
export default {
  name: "signUp",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
      console.log("Inside signup function");
      Firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user);
            this.$router.replace("feeds");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>

<style scoped>
.parent {
  background-image: url(../assets/background-a2f2fdf7dcdaafe1c52909ac3b643dea.svg);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.sign-up {
  width: 500px;
  height: 300px;
  font-family: "Roboto", sans-serif;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
}

span {
  display: block;
  margin-top: 20px;
  font-size: 13px;
}
</style>