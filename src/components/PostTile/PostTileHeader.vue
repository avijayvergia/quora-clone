<template>
  <div class="posttile">
    <div class="posttile__info">
      <user-info-row :user-info="userInfo"></user-info-row>
    </div>
    <div class="posttile__actions">
      <el-dropdown size="mini" type="default" @command="handleCommand">
        <i class="el-icon-more-outline"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="Edit Post"><i class="el-icon-edit"/> Edit</el-dropdown-item>
          <el-dropdown-item command="Delete Post"><i class="el-icon-delete"/> Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import UserInfoRow from "../UserInfoRow";

  export default {
    components: {UserInfoRow},
    name: "post-tile-header",
    props: {
      userInfo: {type: Object, required: true},
    },
    computed: {
      userInfo() {
        return {
          name: this.post.userName,
        }
      }
    },
    methods: {
      handleCommand(command) {
        this.$emit('action', command);
      },
    }
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
    }

    &__actions {
      margin-top: 10px;
      margin-right: 5px;
      float: right;
    }
  }
</style>
