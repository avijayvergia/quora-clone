<template>
  <div id="app">
    <ul>
      <li v-for="post in posts">{{post.title}} : {{post.description}}</li>
    </ul>
    <button @click="addObject">Click ME</button>
  </div>
</template>

<script>
import Hello from "./components/HelloWorld"
import Firebase from "firebase"

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

let postsRef = db.ref('posts');

export default {
  name: "App",
  firebase: {
    posts: postsRef
  },
  methods:{
    addObject(){
      this.posts.push({
        title: 'someRandomTitle',
        description: 'someRandomDescription'
      })
    }
  }
}
</script>

<style >

</style>
