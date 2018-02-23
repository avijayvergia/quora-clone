<template>
  <el-row class="user-info">
    <el-col span=2>
          <img :src="userInfo.userPic" width="30px" height="30px"/>
    </el-col>
    <el-col span=22>
      <div class="user-info__name">
        <span><strong>{{userInfo.userName}}</strong></span>
        <span>{{comment}}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "user-info-row",
  props: {
    userInfo: {
      type: Object,
      required: true
    },
    comment: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  justify-content: flex-start;

  &__name {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }
}
</style>
