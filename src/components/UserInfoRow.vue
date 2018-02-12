<template>
  <div class="user-info">
    <img :src="userPic" width="50px" height="50px"/>
    <div class="user-info__name">
      {{userInfo.name}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "user-info-row",
    props: {
      userInfo: {
        type: Object,
        required: true,
      }
    },
    computed: {
      userPic() {
        return userInfo.imageUrl ? userInfo.imageUrl : require('@/assets/nopreviewavailable.png');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .user-info {
    display: flex;
    justify-content: flex-start;

    &__name {
      margin-left: 10px;
      margin-top: 15px;
      font-size: large;
    }
  }
</style>
