<template>
  <div class="posttile">
    <div class="posttile__info">
      <img :src="userPic" width="50px" height="50px"/>
      <div class="posttile__name">
        {{userName}}
      </div>
    </div>
    <div class="posttile__actions">
      <el-button type="default" icon="el-icon-edit" size="mini"></el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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
    &__name {
      margin-left: 10px;
      margin-top: 15px;
      font-size: large;
    }

    &__info {
      float: left;
      display: flex;
      justify-content: flex-start;
    }

    &__actions {
      margin-top: 10px;
      margin-right: 5px;
      float: right;
    }
  }
</style>
