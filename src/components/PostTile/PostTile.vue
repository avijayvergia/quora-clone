<template>
  <div v-if="post.userName">
    <el-card class="tile">
      <div>
        <post-tile-header :userInfo="userInfo" @action="trigger" />
      </div>
      <div class="tile__body">
        <hr>
        <img :src="post.imageUrl" style="margin: auto" v-if="post.imageUrl">
        <p>{{post.content}}</p>
      </div>

      <div style="display: flex">
        <el-input placeholder="Add comment" prefix-icon="el-icon-edit" v-model="userComment">
        </el-input>
        <el-button icon="el-icon-d-arrow-right" @click="postComment()"></el-button>
      </div>
      <el-collapse>
        <el-collapse-item title="Comments">
          <div>
            <ul>
              <li v-for="el in comments" :key="el.key">
                {{el.comment}}
              </li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <component-dialog :post="editPost" :actionToPerform.sync="actionToPerform" :dialog-visible.sync="dialogVisible" v-if="dialogVisible">
    </component-dialog>
  </div>
</template>

<script>
import PostTileHeader from "./PostTileHeader";
import ComponentDialog from "../ComponentDialog";
import { commentsRef } from "../../middleware/firebase";

export default {
  components: {
    PostTileHeader,
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
  watch: {
    comments: {
      handler: function(val, oldVal) {
        console.log("Comments Array changed");
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      actionToPerform: "",
      editPost: null,
      comments: [],
      userComment: ""
    };
  },
  methods: {
    trigger(action) {
      this.dialogVisible = true;
      this.editPost = { ...this.post };
      this.actionToPerform = action;
    },
    getComments() {
      new Promise((resolve, reject) => {
        commentsRef.child(this.post.key).on("value", snapshot => {
          if (snapshot.val()) {
            resolve(Object.values(snapshot.val()));
          }
        });
      }).then(val => {
        for (let comment of val) {
          this.comments.push(comment);
        }
      });
    },
    postComment() {
      if (this.userComment != "") {
        let commentObj = {
          comment: this.userComment
        };
        if (this.comments.length != 0) this.comments.push(commentObj);
        commentsRef.child(this.post.key).push(commentObj);
        console.log(this.comments);
      }
    }
  },
  created() {
    this.getComments();
  }
};
</script>

<style scoped lang="scss">
.tile {
  margin: 10px auto;
  font-family: "Roboto", sans-serif;
  width: 30%;

  &__body {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }
}
</style>