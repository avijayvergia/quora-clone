<template>
  <el-card class="tile">
    <div class="tile__header">
      <slot name="tile-header"/>
    </div>
    <div class="tile__body">
      <hr>
      <slot name="tile-body"/>
    </div>
    <el-collapse>
      <el-collapse-item title="Comments">
        <div>The first comment!!</div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
  import ElCard from "element-ui/packages/card/src/main";

  export default {
    components: {ElCard},
    name: "tile-layout"
  };
</script>

<style lang="scss" scoped>
  .tile {
    width: 50%;
    margin: 5px auto;
    font-family: 'Roboto', sans-serif;

    &__body {
      margin-top: 52px;
    }
  }
</style>
