<template>
  <div>
    <ul>
      <li v-for="post in posts">{{post.userID}} : {{post.content}}</li>
    </ul>
    <el-input placeholder="Enter Content" v-model="post.content"></el-input>
    <el-input placeholder="Enter Date of publishing" v-model="post.date"></el-input>
    <button @click="addObject">Click ME</button>
  </div>
</template>

<script>
  import {postsRef, userRef} from '../middleware/firebase';

  export default {
    name: "feeds",
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
  }
</script>

<style scoped>

</style>
