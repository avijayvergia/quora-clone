<template>
  <div class="page-layout">
    <div class="page-layout__sidebar">
      <side-bar/>
    </div>
    <div class="page-layout__content">
      <div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import SideBar from "./SideBar";

  export default {
    components: { SideBar },
    name: "layout"
  }
</script>

<style lang="scss" scoped>
  .page-layout {
    display: flex;
    flex-direction: column;

    &__sidebar {
      margin-left: -10px;
      margin-top: -10px;
    }

    &__content{
      margin-top: 50px
    }

  }
</style>