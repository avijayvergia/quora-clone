<template>
  <div>
    <post-tile v-for="post in feed" :post="post" :key="post.id"></post-tile>
  </div>
</template>

<script>
import PostTile from "./PostTile/PostTile";
import { postsRef, userRef } from '../middleware/firebase';
import { mapGetters } from 'vuex';

export default {
  components: {
    PostTile
  },
  name: "feeds-component",
  computed: {
    ...mapGetters([
      'getUserIds',
    ]),
    filteredFeed() {
      return this.posts.filter((post) => this.getUserIds.indexOf(post.userID) > -1);
    },
    feed() {
      this.filteredFeed.map(element => {
        userRef
          .orderByKey()
          .equalTo(String(element.userID))
          .on("child_added", snapshot => this.addUserInfo(element, snapshot));
      });
      return this.filteredFeed;
    }
  },
  methods: {
    addUserInfo(object, item) {
      object.userName = `${item.val().firstName} ${item.val().lastName}`;
      object.userPic = item.val().picUrl;
    }
  },
  firebase: {
    posts: postsRef,
    users: userRef,
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 5px #409eff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

#fixed-postButton {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
