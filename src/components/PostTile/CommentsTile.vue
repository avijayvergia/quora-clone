<template>
  <div>
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
  </div>
</template>

<script>
import { commentsRef } from "../../middleware/firebase";

export default {
  data() {
    return {
      comments: [],
      userComment: ""
    };
  },
  name: "comments-tile",
  props: {
    userKey: {
      type: String,
      required: true
    }
  },
  methods: {
    getComments() {
      new Promise((resolve, reject) => {
        commentsRef.child(this.userKey).on("value", snapshot => {
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
        commentsRef.child(this.userKey).push(commentObj);
        console.log(this.comments);
      }
    }
  },
  created() {
    this.getComments();
  }
};
</script>
<style scoped>

</style>
