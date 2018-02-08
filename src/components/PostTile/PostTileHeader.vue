<template>
  <div class="posttile">
        <img :src="userPic" width="50px" height="50px"/>
      <div class="posttile__name">
        {{userName}}
      </div>
  </div>
</template>

<script>
  export default {
    name: "post-tile-header",
    props: {
      userPic: {type: String, default: require('@/assets/nopreviewavailable.png')},
      userName: {type: String, required: true},
    },
  }
</script>

<style lang="scss" scoped>
  .posttile {
    display: flex;
    justify-content: flex-start;

    &__name {
      margin-left: 10px;
      margin-top: 15px;
      font-size: large;
    }
  }
</style>
