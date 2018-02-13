<template>
  <div>
    <component-dialog :title="title" :dialog-visible.sync="dialogVisible">
      <post-edit-form :post="post" slot="content"></post-edit-form>
    </component-dialog>
    <tile-layout>
      <div slot="tile-header">
        <post-tile-header :userInfo="userInfo" @action="trigger" />
      </div>
      <div slot="tile-body">
        <p>{{post.content}}</p>
      </div>
    </tile-layout>
  </div>
</template>

<script>
  import TileLayout from "../Tile/TileLayout";
  import PostTileHeader from "./PostTileHeader";
  import ComponentDialog from "../ComponentDialog";
  import PostEditForm from "../PostEditForm";

  export default {
    components: {
      PostEditForm,
      PostTileHeader,
      TileLayout,
      ComponentDialog
    },
    name: "post-tile",
    props: {
      post: { type: Object, required: true }
    },
    computed: {
      userInfo() {
        return {
          name: this.post.userName,
          userImage: this.post.userPic
        };
      }
    },
    data() {
      return {
        dialogVisible: false,
        title: ""
      };
    },
    methods: {
      trigger(action) {
        this.dialogVisible = true;
        this.title = action;
      }
    }
  };
</script>

<style scoped>
</style>