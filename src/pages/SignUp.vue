<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <el-input placeholder="Email" v-model="email" clearable>
    </el-input>
    <br>
    <el-input placeholder="Password" v-model="password" clearable>
      </el-input>
    <br>
    <el-button type="success" v-on:click="signUp">Sign Up</el-button>
    <span>or go back to
      <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
  import { Firebase } from "../middleware/firebase";
  export default {
    name: "signUp",
    data: function () {
      return {
        email: "",
        password: ""
      };
    },
    methods: {
      signUp: function () {
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
  .signUp {
    margin-top: 40px;
  }

  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }

  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }

  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>