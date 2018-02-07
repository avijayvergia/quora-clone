<template>
  <div>
    <tile-layout v-for="post in postList" :key="post.id">
      <div slot="tile-header">
        {{post.userID}}
        {{post.userName}}
      </div>
      <div slot="tile-body">
        {{post.content}}
      </div>
    </tile-layout>
    <el-input placeholder="Enter Content" v-model="post.content"></el-input>
    <el-input placeholder="Enter Date of publishing" v-model="post.date"></el-input>
    <button @click="addObject">Click ME</button>
  </div>
</template>

<script>
  import {postsRef, userRef} from '../middleware/firebase';
  import TileLayout from "./Tile/TileLayout";

  export default {
    components: {
      TileLayout},
    name: "feeds-component",
    computed: {
      postList() {
        return this.posts;
      }
    },
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
      users: userRef,
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
