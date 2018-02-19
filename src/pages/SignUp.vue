<template>

  <div class="parent">
    <el-card class="sign-up">
      <h3>Let's create a new account !</h3>
      <el-input placeholder="First Name" v-model="userInfo.firstName" clearable size="medium">
      </el-input>
      <p></p>
      <el-input placeholder="Last Name" v-model="userInfo.lastName" clearable size="medium">
      </el-input>
      <p></p>
      <p>Date of birth</p>
      <!--TODO: Try to Get rid of unnecessary date model-->
      <el-date-picker type="date" v-model="date" @change="serializeDateTime" placeholder="Pick a day">
      </el-date-picker>
      <p></p>
      <el-radio v-model="userInfo.sex" label="M">Male</el-radio>
      <el-radio v-model="userInfo.sex" label="F">Female</el-radio>
      <p></p>
      <el-input placeholder="Email" v-model="userInfo.email" clearable size="medium">
      </el-input>
      <p></p>
      <el-input placeholder="Password" v-model="userInfo.password" type="password" size="medium">

      </el-input>
      <p></p>
      <el-button type="success" v-on:click="signUp">Sign Up</el-button>
      <span>or go back to
        <router-link to="/login">login</router-link>.</span>
    </el-card>
  </div>
</template>

<script>
  import {Firebase, userRef} from "../middleware/firebase";

  export default {
    name: "signUp",
    data() {
      return {
        date: null,
        userInfo: {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          email: "",
          sex: "",
        }
      };
    },
    methods: {
      signUp: function () {
        Firebase.auth()
          .createUserWithEmailAndPassword(
            this.userInfo.email,
            this.userInfo.password
          )
          .then(
            user => {
              delete this.userInfo.password;
              userRef.child(user.uid).set(this.userInfo);
              this.$router.replace('feeds');
            },
            err => {
              alert("Oops. " + err.message);
            }
          );
      },
      // TODO: Consider moving this to a reusable helper method
      serializeDateTime(dateObj) {
        this.userInfo.dateOfBirth = this.$moment(dateObj).format("MM-DD-YYYY");
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
    height: 550px;
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
