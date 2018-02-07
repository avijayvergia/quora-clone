<template>
  <div class="page-layout">
    <div class="page-layout__sidebar">
      <side-bar/>
    </div>
    <div class="page-layout__content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import SideBar from "./SideBar";

  export default {
    components: {SideBar},
    name: "layout"
  }
</script>

<style lang="scss" scoped>
.page-layout {
  height: 100vh;
  display: flex;
  justify-content: space-between;

  &__sidebar {
    min-width: 200px;
    flex: 1;
    margin-left: -10px;
    margin-top: -10px;
  }

  &__content {
    flex: 10;
  }
}
</style>
