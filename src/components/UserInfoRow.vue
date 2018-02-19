<template>
  <div class="user-info">
    <img :src="userInfo.userImage" width="40px" height="40px"/>
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
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  justify-content: flex-start;

  &__name {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;

  }
}
</style>
