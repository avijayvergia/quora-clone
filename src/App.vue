<template>
  <div id="app">
    <ul>
      <li v-for="post in posts">{{post.userID}} : {{post.content}}</li>
    </ul>
    <el-input placeholder="Enter Content" v-model="post.content"></el-input>
    <el-input placeholder="Enter Date of publishing" v-model="post.date"></el-input>
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
      post: {
        content: '',
        date: ' ',
        dislike: 0,
        likes: 0,
        userID: 100
      }
    };
  },
  firebase: {
    posts: postsRef,
    users: userRef
  },
  methods: {
    addObject() {
      postsRef.push(this.post);
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
