<template>
  <div id="app">
    <ul>
      <li v-for="post in posts">{{post.userID}} : {{post.content}}</li>
    </ul>
    <el-input placeholder="Content" v-model="input"></el-input>
    <button @click="addObject">Click ME</button>
  </div>
</template>

<script>
import Hello from "./components/HelloWorld";
import Firebase from "firebase";

let config = {
  apiKey: "AIzaSyAEsBBiwa5urABeTTjCGBez1GI2PSK1pRY",
  authDomain: "test-firing-vue.firebaseapp.com",
  databaseURL: "https://test-firing-vue.firebaseio.com",
  projectId: "test-firing-vue",
  storageBucket: "test-firing-vue.appspot.com",
  messagingSenderId: "801468807455"
};

let app = Firebase.initializeApp(config);
let db = app.database();

let postsRef = db.ref("posts");
let userRef = db.ref("users");

export default {
  name: "App",
  data() {
    return {
      input: ''
    };
  },
  firebase: {
    posts: postsRef,
    users: userRef
  },
  methods: {
    addObject() {
      postsRef.push({
        userID: 103,
        content: "This is it"
      });
    }
  }
};
</script>

<style >
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
