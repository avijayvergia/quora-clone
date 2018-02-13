<template>
  <feeds-component :posts="feed"></feeds-component>
</template>

<script>
    import FeedsComponent from "../components/FeedsComponent";
    import { postsRef, userRef } from '../middleware/firebase';
    import { mapGetters } from 'vuex';
    import ElButton from "element-ui/packages/button/src/button";

    export default {
      components: {
        ElButton,
        FeedsComponent},
      name: "feeds",
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
    }
</script>

<style scoped>

</style>
