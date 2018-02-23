<template>
  <div>
       <div style="display: flex">
        <el-input placeholder="Add comment" prefix-icon="el-icon-edit" v-model="userComment">
        </el-input>
        <el-button icon="el-icon-d-arrow-right" @click="postComment()"></el-button>
      </div>
      <el-collapse>
        <el-collapse-item title="Comments">          
          <div v-for="el in comments" :key="el.key">
             <user-info-row :userInfo="users[el.userId]" :comment="el.comment"></user-info-row>
          </div>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
import { userRef, commentsRef } from "../../middleware/firebase";
import { mapGetters } from "vuex";
import UserInfoRow from "../UserInfoRow";

export default {
  components: {
    UserInfoRow
  },
  data() {
    return {
      comments: [],
      userComment: "",
      users: {}
    };
  },
  name: "comments-tile",
  props: {
    postKey: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(["getUserId"])
  },
  methods: {
    getComments() {
      new Promise((resolve, reject) => {
        commentsRef.child(this.postKey).on("value", snapshot => {
          if (snapshot.val()) {
            resolve(Object.values(snapshot.val()));
          }
        });
      }).then(val => {
        for (let comment of val) {
          if (!(comment.userId in this.users)) {
            userRef
              .child(comment.userId)
              .once("value")
              .then(snapshot => {
                const val = snapshot.val();
                const tempObj = {
                  name: `${val.firstName} ${val.lastName}`,
                  userImage: val.userPic
                };
                this.users[comment.userId] = tempObj;
              });
          }
          this.comments.push(comment);
        }
      });
    },
    postComment() {
      if (this.userComment != "") {
        let commentObj = {
          comment: this.userComment,
          userId: this.getUserId
        };
        if (this.comments.length != 0) this.comments.push(commentObj);
        commentsRef.child(this.postKey).push(commentObj);
        this.userComment = "";
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
