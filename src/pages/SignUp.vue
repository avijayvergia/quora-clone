<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <el-input placeholder="First Name" v-model="userInfo.firstName" clearable size="medium">
    </el-input>
    <br>
    <el-input placeholder="Last Name" v-model="userInfo.lastName" clearable size="medium">
    </el-input>
    <br>
    <p>Date of birth</p>
    <!--TODO: Try to Get rid of unnecessary date model-->
    <el-date-picker
      type="date"
      v-model="date"
      @change="serializeDateTime"
      placeholder="Pick a day">
    </el-date-picker>
    <br>
    <el-radio v-model="userInfo.sex" label="M">Male</el-radio>
    <el-radio v-model="userInfo.sex" label="F">Female</el-radio>
    <br>
    <el-input placeholder="Email" v-model="userInfo.email" clearable size="medium">
    </el-input>
    <br>
    <el-input placeholder="Password" v-model="userInfo.password" type="password" size="medium">
      </el-input>
    <br>
    <el-button type="success" v-on:click="signUp">Sign Up</el-button>
    <span>or go back to
      <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
  import { Firebase, userRef } from "../middleware/firebase";
  export default {
    name: "signUp",
    data() {
      return {
        date: null,
        userInfo: {
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          email: '',
          password: '',
          sex: '',
        }
      };
    },
    methods: {
      signUp: function () {
        Firebase.auth()
          .createUserWithEmailAndPassword(this.userInfo.email, this.userInfo.password)
          .then(
            user => {
              userRef.child(user.uid).set(this.userInfo);
              this.$store.commit('setUser', this.userInfo, user.uid);
              this.$router.replace('feeds');
            },
            err => {
              alert("Oops. " + err.message);
            }
          );
      },
      // TODO: Consider moving this to a reusable helper method
      serializeDateTime(dateObj) {
        this.userInfo.dateOfBirth = this.$moment(dateObj).format('MM-DD-YYYY');
      },
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
