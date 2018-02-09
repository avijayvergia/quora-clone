<template>
  <tile-layout>
    <div slot="tile-header">
      <post-tile-header :userName="post.userName" :userPic="post.imageUrl"/>
    </div>
    <div slot="tile-body">
      <h2>{{post.content}}</h2>
    </div>
  </tile-layout>
</template>

<script>
    import TileLayout from "../Tile/TileLayout";
    import PostTileHeader from "./PostTileHeader";

    export default {
      components: {
        PostTileHeader,
        TileLayout},
      name: "post-tile",
      props: {
        post: { type: Object, required: true },
      }
    }
</script>

<style scoped>

</style>
