<template>
  <el-card class="tile">

    <el-row>
      <el-col :span="2">
        <i class="el-icon-info"></i>
      </el-col>
      <el-col :span="22">
        <div class="tile__header">
          <slot name="tile-header" />
          <i class="el-icon-more-outline"></i>
        </div>
      </el-col>
    </el-row>
    <hr>
    <div class="tile__body">
      <slot name="tile-image" />
      <br>
      <slot name="tile-body" />
    </div>
    <br>
    <br>
    <slot name="post-like-section"/>
       <br>
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
    components: { ElCard },
    name: "tile-layout"
  };
</script>

<style lang="scss" scoped>
  .tile {
    width: 40%;
    margin: 5px auto;
    font-family: 'Roboto', sans-serif;

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: black;
    }
  }
</style>
