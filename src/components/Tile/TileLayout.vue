<template>
    <el-card class="tile">
      <div class="tile__header">
        <slot name="tile-header"/>
      </div>
      <div class="tile__body">
        <slot name="tile-body"/>
      </div>
    </el-card>
</template>

<script>
    import ElCard from "element-ui/packages/card/src/main";

    export default {
      components: {ElCard},
      name: "tile-layout"
    }
</script>

<style lang="scss" scoped>
.tile {
  height: 200px;
  margin-top: 10px;
  margin-bottom: 10px;

  &__header {
    margin-top: -20px;
    margin-left: -20px;
    margin-right: -20px;
    height: 50px;
    background-color: red;
    color: ghostwhite;
  }
}
</style>
