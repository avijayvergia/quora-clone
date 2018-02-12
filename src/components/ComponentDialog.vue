<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="30%">
    <slot name="content"/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="confirm">Confirm</el-button>
      <el-button @click="discard">Cancel</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    name: "component-dialog",
    props: {
      title: {type: String, required: true},
      dialogVisible: {type: Boolean, required: true},
    },
    methods: {
      confirm() {
        this.$emit('update:dialogVisible', false);
      },
      discard() {
        this.$emit('update:dialogVisible', false);
      }
    }
  }
</script>

<style scoped>

</style>
